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
<<<<<<< Updated upstream
    terrain: [{
=======
    name: {
        type: String
    },
    terrains: [{
>>>>>>> Stashed changes
        type: mongoose.Schema.Types.ObjectId,
        ref: 'terrain'
    }],
    address: {
        type: String,
    },
<<<<<<< Updated upstream
=======
    picture: {
        type: String,
        default: "avatar.png"
    }
>>>>>>> Stashed changes
})

module.exports = mongoose.model('complexe', complexeSchema)