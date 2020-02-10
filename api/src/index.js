// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining the Express app
const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));


app.use(require('./modules/citizen'))
app.use(require('./modules/location'))
app.use(require('./modules/news'))
app.use(require('./modules/orgs'))
app.use(require('./modules/search'))
app.use(require('./modules/ships'))
app.use(require('./modules/stats'))
app.use(require('./modules/user'))

// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
})