const mongoose = require('mongoose')


const complexeSchema = new mongoose.Schema({
    complexe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'complexe'
    },
    typeSport: {
        type: String,
    },

    picture: {
        type: Number
    },

})

module.exports = mongoose.model('complexe', complexeSchema)