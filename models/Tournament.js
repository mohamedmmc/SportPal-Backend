const mongoose = require('mongoose')


const tournamentSchema = new mongoose.Schema({
    match: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'match'
    }],
    winner: {
        type: String
    },
    prize: {
        type: Number
    },
    from: {
        type: Date
    },
    to: {
        type: Date
    }
})

module.exports = mongoose.model('tournament', tournamentSchema)