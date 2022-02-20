const mongoose = require('mongoose')
const User = require('./User')


const complexeOwnerSchema = new mongoose.Schema({
   
    complexe: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'complexe'
    }],
    files:{
        type:String
    }
})
module.exports = User.discriminator('complexeOwner', complexeOwnerSchema)