const express = require("express");
const feedController = require("../controllers/feed");
const { body } = require('express-validator/check');

const router = express.Router();

//GET /feed/posts
router.get('/posts', feedController.getPosts);

//POST /feed/post
router.post(
    '/post',
    [
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('content')  
        .trim()
        .isLength({min: 5 })
    
    ], 
    feedController.createPost);
//Get a single post
router.get('/post/:postId', feedController.getPost);

//Edit a single post
router.put(
    '/post/:postId',
    [
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('content')  
        .trim()
        .isLength({min: 5 })
    
    ], 
    feedController.updatePost);
    













module.exports = router;