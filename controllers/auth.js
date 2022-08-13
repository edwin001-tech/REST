const { validationResult } = require('express-validator');
const User = require('../models/user');


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
}