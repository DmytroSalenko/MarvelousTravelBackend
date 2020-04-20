const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    userId : String,
    messageBody: String,
    userName : String,
    date: String,
    chatId : String
});

module.exports = mongoose.model('ChatMessages', ChatMessageSchema);