const mongoose = require('mongoose')


const tournamentSchema = new mongoose.Schema({
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
    participants: [{
        _id: false, team: { type: mongoose.Schema.Types.ObjectId, ref: 'team' }, points: Number, isEliminated: Boolean,
    }],
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