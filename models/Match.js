const mongoose = require('mongoose')


const matchSchema = new mongoose.Schema({
    teamA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    },
    teamB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    },
    winner: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    terrain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'terrain'
    },
    arbitre: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'arbitre'
    }],
    scoreA: [{
        type: String
    }],
    scoreB: [{
        type: String
    }],
})

module.exports = mongoose.model('match', matchSchema)