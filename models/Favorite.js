const mongoose = require('mongoose')


const favoriteSchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player'
    },
    match: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'match'
    }],
    tournament: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tournament'
    }]
})

module.exports = mongoose.model('favorite', favoriteSchema)