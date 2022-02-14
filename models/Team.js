const mongoose = require('mongoose')


const teamSchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player'
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player'
    },
    typeSport: {
        type: String
    }
})

module.exports = mongoose.model('team', teamSchema)