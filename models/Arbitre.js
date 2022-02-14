const mongoose = require('mongoose')
const User = require('./User')

const arbitreSchema = new mongoose.Schema({
    typeSport: {
        type: String,
    },
    rating: {
        type: String,
    },
    federation: {
        type: String,
    }
})
module.exports = User.discriminator('arbitre', arbitreSchema)
