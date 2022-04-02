const mongoose = require('mongoose')


const teamSchema = new mongoose.Schema({
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player'
    }],
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player'
    },
    typeSport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sport'
    },
})

module.exports = mongoose.model('team', teamSchema)