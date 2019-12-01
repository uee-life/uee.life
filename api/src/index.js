// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const {getCitizen, getCitizenInfo, getCitizenShips, getCitizenLocation, verifyCitizen} = require('./db/citizen');
const {getOrganization, getOrgFounders} = require('./db/organization');
const {getNews} = require('./db/news');
const {searchOrgs} = require('./db/search');
const {getHandle} = require('./db/user');


// defining the Express app
const app = express();

app.use(helmet());
app.use(bodyParser.json());

var whitelist = ['https://uee.life', 'https://www.uee.life', 'http://localhost:8080']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.use(morgan('combined'));

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://ueelife-test.auth0.com/.well-known/jwks.json`
    }),

    audience: 'https://ueelife-test',
    issuer: `https://ueelife-test.auth0.com/`,
    algorithms: ['RS256']
});

// Public API calls
app.get('/citizen/:handle', async (req, res) => {
    res.send(await getCitizen(req.params.handle));
});

app.get('/citizen/:handle/info', async (req, res) => {
    res.send(await getCitizenInfo(req.params.handle));
})

app.get('/citizen/:handle/ships', async (req, res) => {
    res.send(await getCitizenShips(req.params.handle));
});

app.get('/citizen/:handle/location', async(req, res) => {
    res.send(await getCitizenLocation(req.params.handle))
})

app.get('/organization/:id', async (req, res) => {
    res.send(await getOrganization(req.params.id));
});

app.get('/organization/:id/founders', async (req, res) => {
    res.send(await getOrgFounders(req.params.id));
});

app.get('/news', async (req, res) => {
    let data = {"channel": "","series":"","type":"","text":"","sort":"publish_new","page":1};
    for (const prop in req.query) {
        if(prop in data) {
            data[prop] = req.query[prop]
        }
    }
    res.send(await getNews(data));
});

app.post('/search/org', async (req, res) => {
    res.send(await searchOrgs(req.body));
});

// Secure API calls

app.get("/user", checkJwt, async (req, res) => {
    res.send(await getUser(req.headers.authorization));
});

app.get("/citizen/:handle/verify", checkJwt, async (req, res) => {
    res.send(await verifyCitizen(req.headers.authorization, req.params.handle));
});

// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
})