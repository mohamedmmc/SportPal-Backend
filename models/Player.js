const mongoose = require('mongoose')
const User = require('./User')

const playerSchema = new mongoose.Schema({
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    }],

    sports: [{
        _id: false,
        sport: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sport'
        },
        strongLeg: String,
        strongHand: String,
        favCourt: String,
        knowledge: String,
        idol: String,
        role: String,
        position: String,
    }],
    rating: {
        type: String
    },
    description: {
        type: String
    },

})
module.exports = User.discriminator('player', playerSchema)
