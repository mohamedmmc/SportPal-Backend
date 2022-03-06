const mongoose = require('mongoose')

//changed on 12:53 4 mars

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
        type: String
    },
})

module.exports = mongoose.model('team', teamSchema)