const express = require("express");
const feedController = require("./feed");

const router = express.Router();

//GET /feeds/posts
router.get('/posts', feedController.getPosts);











modules.exports = router;