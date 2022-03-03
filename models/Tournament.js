const mongoose = require('mongoose')


const tournamentSchema = new mongoose.Schema({
    match: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'match'
    }],
    winner: {
        type: String,
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
    }
})

module.exports = mongoose.model('tournament', tournamentSchema)