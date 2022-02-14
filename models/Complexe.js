const mongoose = require('mongoose')


const complexeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'complexeOwner'
    },
    terrain: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'terrain'
    }],

    address: {
        type: String
    },
})

module.exports = mongoose.model('complexe', complexeSchema)