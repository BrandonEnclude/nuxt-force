const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
      max: 255,
   },
   lastName: {
      type: String,
      required: true,
      max: 255,
   },
   email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
   },
   password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
   },
   created: {
      type: Date,
      default: Date.now
   }
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)