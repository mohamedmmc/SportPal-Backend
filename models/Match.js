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
        type: Date
    },
    terrain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'terrain'
    },
    arbitre: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'arbitre'
    }],
})

module.exports = mongoose.model('match', matchSchema)