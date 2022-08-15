const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


exports.signup = (req, res, next) => {
    //collect the errors
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array(); //keep errors retrieved by validationpackage
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt
        .hash(password, 12)// hash password with a salt(strength) of 12
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                name: name
            });
           return user.save();
        })
        //result of data operation
        .then(result => {
            res.status(201).json({ message: 'User Created!', userId: result._id });
        })

        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            //compare password user entered with the hashed password
            return bcrypt.compare(password, user.password);
        
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong Password');
                error.statusCode = 401;
                throw error;
            }

            //generate json web token
        })
        .catch(err => {
         if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
    })
}