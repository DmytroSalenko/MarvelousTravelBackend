const mongoose = require('mongoose');

const ChatMessage = require('../models/ChatMessage');

const ChatSchema = new mongoose.Schema({
    tripId: String,
    chatMessages: {type: mongoose.Schema.Types.ObjectId, ref:'ChatMessage'}
});

module.exports = mongoose.model('Chats', ChatSchema);