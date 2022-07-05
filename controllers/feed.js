const { validationResult } = require('express-validator/check');
exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
            _id: '1',
            title: 'First Post',
            content: 'This is the first post!',
            imageURL: 'images/watch.jpg',
            creator: {
                name: 'Edwin'
                },
            createdAt: new Date()
                
            }
        ]
    });
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status
            .json({
                message: 'Validation failed, entered data is incorrect.',
                errors: errors.array()
            });
    }
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: 'post created successfully!',
        post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: { name: 'Edwin' },
            createdAt: new Date()

        }
    });
}