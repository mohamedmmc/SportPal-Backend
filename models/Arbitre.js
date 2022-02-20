const mongoose = require('mongoose')
const User = require('./User')

const arbitreSchema = new mongoose.Schema({
    rating: {
        type: String,
    },
    price: {
        type: Number,
    },
    available: {
        type: Boolean,
    },
    file: {
        type: String,
    },
    sport: {
        type: String,
        enum : ['Football','Tennis','Basketball']
    }
})
module.exports = User.discriminator('arbitre', arbitreSchema)
