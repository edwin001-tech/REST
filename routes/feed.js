const express = require("express");
const feedController = require("../controllers/feed");
const { body } = require('express-validator/check');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//GET /feed/posts
router.get('/posts',isAuth, feedController.getPosts);

//POST /feed/post
router.post(
    '/post',
    isAuth,
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
router.get('/post/:postId', isAuth, feedController.getPost);

//Edit a single post
router.put(
    '/post/:postId',
    isAuth,
    [
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('content')  
        .trim()
        .isLength({min: 5 })
    
    ], 
    feedController.updatePost);

router.delete('/post/:postId', isAuth, feedController.deletePost);    
module.exports = router;