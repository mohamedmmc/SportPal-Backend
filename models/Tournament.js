const mongoose = require('mongoose')


const tournamentSchema = new mongoose.Schema({
<<<<<<< Updated upstream
    match: [{
=======
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
>>>>>>> Stashed changes
        type: mongoose.Schema.Types.ObjectId,
        ref: 'match'
    }],
    winner: {
<<<<<<< Updated upstream
        type: String
=======
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player',
        default: null
>>>>>>> Stashed changes
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