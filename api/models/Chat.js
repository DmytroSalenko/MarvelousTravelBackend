const mongoose = require('mongoose');

const ChatMessage = require('../models/ChatMessage');

const ChatSchema = new mongoose.Schema({
    tripId: String,
    name: String,
    picture_url: String,
    chatMessages: [{type: mongoose.Schema.Types.ObjectId, ref:'ChatMessages'}]
});

module.exports = mongoose.model('Chats', ChatSchema);