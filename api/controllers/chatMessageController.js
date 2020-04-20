// External Dependencies
const boom = require('boom');

// Get Data Models
const Chat = require('../models/Chat');
const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');

// Add a new message
exports.addMessage = async (req, reply, io) => {
    try {
        const user_id = req.body.userId;
        const chat_id = req.body.chatId;
        const user = await User.findById(user_id);
        const chat = await Chat.findById(chat_id);
        const messageData = req.body;
        let message = new ChatMessage();
        message.userId = user_id;
        message.messageBody = messageData.messageBody;
        message.date = messageData.date;
        message.userName = user.first_name + " " + user.last_name;
        console.log(message.userName);
        message.chatId = chat_id;
        const savedMessage = await message.save();
        console.log(message, "this is my message");
        // save chat message into an array
        chat.chatMessages.push(message);
        await chat.save();
        reply.send(JSON.stringify(savedMessage));

        io.emit('newChatMessage', savedMessage);


    } catch (err) {
        throw boom.boomify(err);
    }
};