const mongoose = require('mongoose')


const sportSchema = new mongoose.Schema({
    typeSport: {
        type: String,
    },
    collectif: {
        type: Boolean
    }
})

module.exports = mongoose.model('sport', sportSchema)