const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
  userSessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSession', required: true },
  startedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Conversation', conversationSchema)
