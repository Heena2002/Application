const mongoose = require('mongoose')

const userSessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('UserSession', userSessionSchema)
