const mongoose = require('mongoose')

//Changed on 12:20 4  mars Tournament

const tournamentSchema = new mongoose.Schema({
<<<<<<< Updated upstream
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'complexeOwner'
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    },{
        points: Number,
        isEliminated: Boolean
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
>>>>>>> Stashed changes
    }],
    matchs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'match'
    }],
    winner: {
<<<<<<< Updated upstream
        type: String,
=======
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player',
>>>>>>> Stashed changes
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

>>>>>>> Stashed changes
})

module.exports = mongoose.model('tournament', tournamentSchema)