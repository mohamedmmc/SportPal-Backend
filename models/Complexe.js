// const mongoose = require('mongoose')


// const complexeSchema = new mongoose.Schema({
//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'complexeOwner'
//     },
//     terrains: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'terrain'
//     }],
//     address: {
//         type: String,
//     },
//     name: {
//         type: String
//     },

//     picture: {
//         type: String
//     }
// })

// module.exports = mongoose.model('complexe', complexeSchema)


const mongoose = require('mongoose')


const complexeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'complexeOwner'
    },
    name: {
        type: String
    },
    terrains: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'terrain'
    }],
    address: {
        type: String,
    },
    picture: {
        type: String,
        default: "avatar.png"
    }
})

module.exports = mongoose.model('complexe', complexeSchema)