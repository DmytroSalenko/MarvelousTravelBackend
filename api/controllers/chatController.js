// External Dependencies
const boom = require('boom');
const ChatMessageModel = require('../models/ChatMessage');
const User = require('../models/User');

// Get Data Models
const Chat = require('../models/Chat');

// Get chat based on chat id
exports.getSingleChat = async (req, reply) => {
    try{
        const id = req.params.id;
        const chat = await Chat.findById(id);
        // return messages related to chat
        const messages = await Chat.findById(id).populate('chatMessages');
        reply.send(messages);

    }catch (err) {
        throw boom.boomify(err);
    }
};

// Get all user chats
exports.getUserChats = async (req, reply) => {
    try {
        const id = req.params.id;
        console.log(id, 'This is id');
        // const user = await User.findById(id);
        const chats = await User.findById(id).populate('chats');
        reply.send(chats);
    }catch(err) {
        throw boom.boomify(err);
    }
};

exports.getChatByTripId = async (req, reply) => {
    try {
        const tripId = req.params.id;
        console.log(tripId);
        const chat = await Chat.findOne({tripId: tripId});
        reply.send(chat);
    }catch (error) {
        throw boom.boomify(err);
    }

};