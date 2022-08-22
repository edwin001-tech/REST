const fs = require('fs');
const path = require('path'); 
const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;
    Post.find()
        .countDocuments()
        .then(count => {
            totalItems = count;  
            return Post.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
         })

        .then(posts => {
            res.json({
                message: 'Posts fetched successfully',
                posts: posts,
                totalItems:totalItems
            });
          })
        
    
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
     }
 

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);  
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    if (!req.file) {
        const error = new Error('No image provided!');
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.path;
    const title = req.body.title;
    const content = req.body.content;
    let creator;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: req.userId

    });
    post
        .save()
        .then(result => {
            //add post to the list of posts for a given user
            return User.findById(req.userId); //get currently logged in user
        })
        //get user that was created
        .then(user => {
            creator = user;
            //access user posts and push the currently created post to that user
            user.posts.push(post);
            //because we are updating
            return user.save();
       
        })
        .then(result => {
             res.status(201).json({
              message: 'post created successfully!',
                 post: post,
              creator: { _id: creator._id, name: creator.name}
             });
        
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
    
        });
    
}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post');
                error.statusCode = 404;
                throw error
            }

            res.status(200).json({ message: 'Post fetched successfully', post: post })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image;

    if (req.file) {
        imageUrl = req.file.path;
    }
    // if image not set we throw an error
    if (!imageUrl) {
        const error = new Error('No file picked');
        error.statusCode = 404;
        throw error
        
    }

    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post');
                error.statusCode = 404;
                throw error
            }
            //check if creator id is equal to the id of the currently logged in user
            //id of token received
            if (post.creator.toString() !== req.userId) {
                const error = new Error('Not authorized!');
                error.statusCode = 403;
                throw error;
            }

            if (imageUrl !== post.imageUrl) {
                clearImage(post.imageUrl);
            }

            post.title = title;
            post.imageUrl = imageUrl;
            post.content = content;
            return post.save();

        })
        .then(result => {
            res.status(200).json({ message: 'post updated', post: result });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
        const clearImage = filePath => {
        filePath = path.join(__dirname, "..", filePath);
        fs.unlink(filePath, err => console.log(err));
    
        };
exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
        if (!post) {
                const error = new Error('Could not find post');
                error.statusCode = 404;
                throw error
        }
            //check if creator id is equal to the id of the currently logged in user
            //id of token received
            if (post.creator.toString() !== req.userId) {
                const error = new Error('Not authorized!');
                error.statusCode = 403;
                throw error;
            }
            //check logged in user
            clearImage(post.imageUrl);
            return Post.findByIdAndRemove(postId)
                
        })
        .then(result => {
            return User.findById(req.userId);
            
        })
        .then(user => {
            //remove post id from user collection/ clear post relation 
            user.posts.pull(postId);
            return user.save();
           
        })
        .then(result => {
             res.status(200).json({ message: 'Deleted Post!' })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}
