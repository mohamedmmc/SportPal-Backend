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
<<<<<<< Updated upstream
    sent: {
        type: Boolean
=======
    accept: {
        type: Boolean,
        default: false
    },
    terrain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'terrain'
>>>>>>> Stashed changes
    }
})

module.exports = mongoose.model('notification', notificationSchema)