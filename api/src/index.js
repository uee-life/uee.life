// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mcache = require('memory-cache');

const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const {getCitizen, getCitizenInfo, getCitizenShips, getCitizenLocation, startSync} = require('./db/citizen');
const {getOrganization, getOrgFounders, getOrgMembers} = require('./db/organization');
const {getNews} = require('./db/news');
const {searchOrgs} = require('./db/search');
const {getUser, verifyCitizen} = require('./db/user');
const {
    getSystems,
    getSystem, 
    getPlanets, 
    getPlanet, 
    getSatellites, 
    getSatellite, 
    getPOIs, 
    getPOI
} = require('./db/location.js');
const {
    getStats
} = require('./db/stats');


// defining the Express app
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

const cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cachedBody = mcache.get(key)
        if(cachedBody && !req.headers.skipcache) {
            res.send(cachedBody)
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://ueelife.auth0.com/.well-known/jwks.json`
    }),

    audience: 'https://ueelife-api',
    issuer: `https://ueelife.auth0.com/`,
    algorithms: ['RS256']
});

// Public API calls
app.get('/citizen/:handle', cache(60), async (req, res) => {
    res.send(await getCitizen(req.params.handle));
});

app.get('/citizen/:handle/info', cache(60), async (req, res) => {
    res.send(await getCitizenInfo(req.params.handle));
})

app.get('/citizen/:handle/ships', cache(60), async (req, res) => {
    res.send(await getCitizenShips(req.params.handle));
});

app.get('/citizen/:handle/location', cache(60), async(req, res) => {
    res.send(await getCitizenLocation(req.params.handle))
})

app.get('/organization/:id', cache(60), async (req, res) => {
    res.send(await getOrganization(req.params.id));
});

app.get('/organization/:id/founders', cache(60), async (req, res) => {
    res.send(await getOrgFounders(req.params.id));
});

app.get('/organization/:id/members/:page', async (req, res) => {
    res.send(await getOrgMembers(req.params.id, req.params.page));
})

app.get('/news', cache(60), async (req, res) => {
    let data = {"channel": "","series":"","type":"","text":"","sort":"publish_new","page":1};
    for (const prop in req.query) {
        if(prop in data) {
            data[prop] = req.query[prop]
        }
    }
    res.send(await getNews(data));
});

app.get('/systems', cache(600), async (req, res) => {
    res.send(await getSystems())
})

app.get('/systems/:code', cache(60), async (req, res) => {
    res.send(await getSystem(req.params.code));
});

app.get('/systems/:code/planets', cache(60), async (req, res) => {
    res.send(await getPlanets(req.params.code));
})

app.get('/systems/:code/pois', cache(60), async (req, res) => {
    res.send(await getPOIs(req.params.code));
})

app.get('/planets/:planet', cache(60), async (req, res) => {
    res.send(await getPlanet(req.params.planet));
})

app.get('/planets/:planet/satellites', cache(60), async (req, res) => {
    res.send(await getSatellites(req.params.planet));
})

app.get('/satellites/:name', cache(60), async (req, res) => {
    res.send(await getSatellite(req.params.name));
})

app.get('/planets/:planet/pois', cache(60), async (req, res) => {
    res.send(await getPOIs("", req.params.planet));
})

app.get('/pois/:name', cache(60), async (req, res) => {
    res.send(await getPOI(req.params.name));
})

app.get('/stats', cache(600), async (req, res) => {
    res.send(await getStats());
})

app.post('/search/org', async (req, res) => {
    res.send(await searchOrgs(req.body));
});

// Secure API calls

app.get("/user", checkJwt, async (req, res) => {
    res.send(await getUser(req.headers.authorization).catch(err => {
        console.error(err)
        return err
    }));
});

app.get("/citizen/:handle/verify", checkJwt, async (req, res) => {
    res.send(await verifyCitizen(req.headers.authorization, req.params.handle));
});

app.post("/citizen/:handle/verify", checkJwt, async (req, res) => {
    res.send(await verifyCitizen(req.headers.authorization, req.params.handle));
});

app.post("/sync", checkJwt, async (req, res) => {
    res.send(await startSync(req.headers.authorization))
});

// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
})