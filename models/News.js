const mongoose = require('mongoose')


const newsSchema = new mongoose.Schema({
    imageURL: {
        type: String
    },
    title: {
        type: String
    },
    desc: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String
    }
})

module.exports = mongoose.model('news', newsSchema)