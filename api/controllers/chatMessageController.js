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
        /*if (user.length === null || chat.length === null){
            reply.status(404).send({message: 'User or chat was not found'})
        }else {*/
            const messageData = req.body;
            let message = new ChatMessage();
            message.userId = user_id;
            message.messageBody = messageData.messageBody;
            message.date = messageData.date;
            message.chatId = chat_id;
            const savedMessage = await message.save();

            return JSON.stringify(savedMessage);
       // }

    } catch (err) {
        throw boom.boomify(err);
    }
};

// TODO: fix this method to get all messages related to chat
// Get all messages for specific chat
exports.getChatMessages = async (req, reply) => {
    try {
        const chat_id = req.body.chatId;
        console.log(req.body, "This is chat id");
        const messages = await ChatMessage.find({}).where('tripId').equals(chat_id);
        return messages;
    } catch (err) {
        throw boom.boomify(err);
    }
};