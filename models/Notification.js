const mongoose = require('mongoose')


const notificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String
    },
    accept: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('notification', notificationSchema)