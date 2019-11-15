// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {getCitizen} = require('./db/citizen');
const {getOrganization} = require('./db/organization');

// defining the Express app
const app = express();

const data = [
    {title: "Hello World!"}
];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/citizen/:handle', async (req, res) => {
    res.send(await getCitizen(req.params.handle));
});

app.get('/organization/:id', async (req, res) => {
    res.send(await getOrganization(req.params.id));
});

// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
})