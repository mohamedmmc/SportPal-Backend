const mongoose = require('mongoose')


const notificationSchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    description: {
        type: String
    },
    date: {
        type: Date
    },
    sent: {
        type: Boolean
    },
    accept: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('notification', notificationSchema)