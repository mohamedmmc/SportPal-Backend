const mongoose = require('mongoose')
const User = require('./User')

const playerSchema = new mongoose.Schema({

    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    }],
    sport: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sport'
    }],
    rating: {
        type: String
    },
    testplayer: {
        type: String
    }
})
module.exports = User.discriminator('player', playerSchema)
