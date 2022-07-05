const express = require("express");
const feedRoutes = require("./routes/feed");
const bodyParser = require("body-parser");
const { body } = require('express-validator/check');

const app = express();

app.use(bodyParser.json()); //parse json data

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // tell clients methods allowed
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //allow clients to set headers
    next();
});

app.use('/feed', feedRoutes);


app.listen(8080);