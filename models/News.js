const mongoose = require('mongoose')


const newsSchema = new mongoose.Schema({
    img: {
        type: String
    },
    title: {
        type: String
    },
    desc: {
        type: String
    },
    date: {
        type: Date

    },
})

module.exports = mongoose.model('match', newsSchema)