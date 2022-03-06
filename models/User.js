const mongoose = require('mongoose')
var util = require('util')
const baseOptions = {
    discriminatorKey: 'type',
    collection: 'user'
}
const userSchema = new mongoose.Schema({
    fullname: {
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
    age: {
        type: String
    }
    

}, baseOptions)

module.exports = mongoose.model('user', userSchema)