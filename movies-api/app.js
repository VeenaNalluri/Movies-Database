'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// const config = require('./config');
const pkg = require('./package.json');

const major = pkg.version.split('.')[0];
const app = express();
const port = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/health', require('./controllers/health'));
app.use(`/v${major}`, require('./controllers'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// module.exports = app;
