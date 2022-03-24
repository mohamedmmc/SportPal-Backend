const { Double } = require('mongodb')
const mongoose = require('mongoose')
var util = require('util')
const baseOptions = {
    discriminatorKey: 'type',
    collection: 'user'
}
const userSchema = new mongoose.Schema({
<<<<<<< Updated upstream
    fullname: {
=======
    fullName: {
>>>>>>> Stashed changes
        type: String
    },
    email: {
        unique: true,
        required: true,
        type: String,
        match: /.+\@.+\..+/
    },
    password: {
        type: String
    },
    telNum: {
        required: false,
        maxlength: 12,
        type: String
    },
    profilePic: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean, default: false
    },
    address: {
        type: String
    },
<<<<<<< Updated upstream
    age: {
        type: String
    }
    
=======
    birthDate: {
        type: Date
    },
    gender: {
        type: String
    },
    height: {
        type: Number

    },
    weight: {
        type: Number
    },
>>>>>>> Stashed changes

}, baseOptions)

module.exports = mongoose.model('user', userSchema)