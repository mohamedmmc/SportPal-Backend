const mongoose = require('mongoose')

//Changed on 12:20 4  mars Tournament

const tournamentSchema = new mongoose.Schema({
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
    }],
    matchs: [{
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
    },

})

module.exports = mongoose.model('tournament', tournamentSchema)