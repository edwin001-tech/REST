const express = require("express");
const path = require('path');
const feedRoutes = require("./routes/feed");
const authRoutes = require('./routes/auth');
const bodyParser = require("body-parser");
//module for file upload and download
const multer = require('multer');


const mongoose = require('mongoose');

const app = express();

//control where the files gets stored
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }        
}
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use(bodyParser.json()); //parse json data
//serve images folder statically, path.join- constructs an absolute path to the folder
app.use('/images', express.static(path.join(__dirname, 'images'))); 
 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // tell clients methods allowed
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //allow clients to set headers
    next();
});

app.use('/feed', feedRoutes);
app.use('/signup', authRoutes);

//error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
})


mongoose.connect(
    'mongodb+srv://edwin:Stiles!1@cluster0.6qjyfj5.mongodb.net/blogs?retryWrites=true&w=majority'
)
    .then(result => {
        app.listen(8080);
    })
    .catch(err => console.log(err));
