const mongoose = require('mongoose')
const User = require('./User')


const adminSchema = new mongoose.Schema({ 
})
module.exports = User.discriminator('admin', adminSchema)
