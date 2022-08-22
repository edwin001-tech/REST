const express = require('express');
const { validationResult } = require('express-validator/check');
const router = express.Router();

const authController = require('../controllers/auth');

//signup validation logic 
router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Email address already exists!');
                }
            });
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 8 }),
    body('name')
        .trim()
        .not()
        .isEmpty()
],
    authController.signup
);

router.post('/login', authController.login);

module.exports = router;