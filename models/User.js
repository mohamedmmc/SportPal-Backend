const { Double } = require('mongodb')
const mongoose = require('mongoose')
var util = require('util')
const baseOptions = {
    discriminatorKey: 'type',
    collection: 'user'
}
const userSchema = new mongoose.Schema({
    fullName: {
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

}, baseOptions)

module.exports = mongoose.model('user', userSchema)