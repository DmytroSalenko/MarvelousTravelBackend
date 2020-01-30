// External Dependencies
const boom = require('boom');
const ChatMessageModel = require('../models/ChatMessage');

// Get Data Models
const Chat = require('../models/Chat');

// TODO: fix this method
// Get chat based on trip id
exports.getSingleChat = async (req, reply) => {
    try{
        const id = req.body.chatId;
        console.log(id, "This is id");
        console.log(req.body, "This is my body");
        // const chat = Chat.find({trip_id:id});
        // return chat;
    }catch (err) {
        throw boom.boomify(err);
    }
};