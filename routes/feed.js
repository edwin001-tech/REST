const express = require("express");
const feedController = require("../controllers/feed");

const router = express.Router();

//GET /feed/posts
router.post('/post', feedController.getPosts);

//POST /feed/post
router.get(
    '/posts',
    [
    body('ttitle')
        .trim()
        .isLength({ min: 5 }),
    body('content')
        .trim()
        .isLength({min: 5 })
    
    ], 
    feedController.createPost)
    ;
    













module.exports = router;