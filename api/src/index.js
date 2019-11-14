// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {getCitizen} = require('./db/citizen');

// defining the Express app
const app = express();

const data = [
    {title: "Hello World!"}
];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send(await getCitizen());
});

// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
});