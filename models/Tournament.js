const mongoose = require('mongoose')

//Changed on 12:20 4  mars Tournament

const tournamentSchema = new mongoose.Schema({
    title: {
        type: String
    },
    typeSport: {
        type: String
    },
    type: {
        type: String
    },
    numberOfParticipants: {
        type: Number
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    participants: [],
    matchs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'match'
    }],
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player',
        default: null
    },
    prize: {
        type: Number,
        default: null
    },
    from: {
        type: Date,
        default: Date.now,
    },
    to: {
        type: Date
    },
    place: {
        type: String,
        default: null
    },
    entriePrice: {
        type: Number
    },
    creditCard: {
        type: String
    }

})

module.exports = mongoose.model('tournament', tournamentSchema)