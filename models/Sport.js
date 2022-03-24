const mongoose = require('mongoose')

// const baseOptions = {
//     discriminatorKey: 'type',
//     collection: 'sport'
// }
const sportSchema = new mongoose.Schema({
    typeSport: {
        type: String
    },
})

module.exports = mongoose.model('sport', sportSchema)