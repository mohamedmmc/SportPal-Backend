// const mongoose = require('mongoose')


// const terrainSchema = new mongoose.Schema({
//     complexe: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'complexe'
//     },
//     typeSport: {
//         type: String,
//     },
//     picture: {
//         type: String
//     },
//     name: {
//         type: String
//     },
//     location: {
//         type: String
//     },
//     rating: {
//         type: Number
//     }
// })

// module.exports = mongoose.model('terrain', terrainSchema)

const mongoose = require('mongoose')


const terrainSchema = new mongoose.Schema({
    typeSport: {
        type: String,
    },
    picture: {
        type: String
    },
})

module.exports = mongoose.model('terrain', terrainSchema)