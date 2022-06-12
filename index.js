const express = require("express");
const feedRoutes = require("./routes/feed");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); //parse json data
app.use('/feed', feedRoutes);


app.listen(8080);