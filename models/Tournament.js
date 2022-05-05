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
<<<<<<< Updated upstream
    participants: [{
        _id: false, team: { type: mongoose.Schema.Types.ObjectId, ref: 'team' }, points: Number, isEliminated: Boolean,
    }],
=======
    participants: [],
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

=======
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
>>>>>>> Stashed changes

})

module.exports = mongoose.model('tournament', tournamentSchema)