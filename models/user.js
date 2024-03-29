const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'I am new!'
    },
    posts: [
        {
            type: Schema.Types.ObjectId, //reference to a post
            ref: 'Post'
        }
    ]
},
    { timestamps: true });


module.exports = mongoose.model('User', userSchema);