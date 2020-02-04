// External Dependencies
const boom = require('boom');

// Get Data Models
const Chat = require('../models/Chat');
const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');

// Add a new message
exports.addMessage = async (req, reply) => {
    try {
        const user_id = req.body.userId;
        const chat_id = req.body.chatId;
        console.log(req.body, "This is my body");
        const user = await User.findById(user_id);
        const chat = await Chat.findById(chat_id);
        const messageData = req.body;
        let message = new ChatMessage();
        message.userId = user_id;
        message.messageBody = messageData.messageBody;
        message.date = messageData.date;
        message.chatId = chat_id;
        const savedMessage = await message.save();
        console.log(message, "this is my message");
        // save chat message into an array
        chat.chatMessages.push(message);
        await chat.save();

        return JSON.stringify(savedMessage);
       // }

    } catch (err) {
        throw boom.boomify(err);
    }
};