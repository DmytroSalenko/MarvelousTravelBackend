// External Dependencies
const boom = require('boom');

// Get Data Models
const User =  require('../models/User');
const Trip =  require('../models/Trip');
const Chat = require('../models/Chat');

// Create a trip
exports.createTrip = async (req, reply) => {
    try {
        const user_id = req.body.creator;
        const user = await User.findById(user_id);
        if (user.length === null){
            reply.status(404).send({message: 'User was not found'})
        }else {
            const tripData = req.body;
            let trip = new Trip(tripData);
            // trip.name = tripData.name;
            console.log(tripData);
            // trip.description = tripData.description;
            // trip.start_date = tripData.trip_start_date;
            // trip.end_date = tripData.trip_end_date;
            // trip.picture_url = tripData.picture_url;
            // for (var i in tripData.destinations) {
            //     var item = tripData.destinations[i];
            //     trip.destinations.push(item);
            // }
            //trip.destinations.push(tripData.destinations);
            const savedTrip = await trip.save();

            user.trips.push(savedTrip);
            await user.save();

            // create a chat for a trip
            let chat = new Chat();
            chat.tripId = trip.id;
            chat.name = tripData.name;
            chat.picture_url = tripData.picture_url;
            const savedChat = await chat.save();

            // add chat to user
            user.chats.push(chat);
            await user.save();

            const tripForReturn = await Trip.findById(trip.id).populate('creator');
            // return JSON.stringify(savedTrip) + JSON.stringify(savedChat);
            reply.send(tripForReturn);
        }

    } catch (err) {
        throw boom.boomify(err);
    }
};

// Delete a trip
exports.deleteTrip = async (req, reply) => {
    try {
        const tripId = req.body.tripId;
        const chatId = req.body.chatId;
        const userId = req.body.userId;
        console.log(req.body, "this is body");
        const trip = await Trip.findByIdAndDelete(tripId);
        const chat = await Chat.findByIdAndDelete(chatId);
        const user = await User.findById(userId);
        user.trips.pull(tripId);
        user.chats.pull(chatId);
        await user.save();

        reply.send(trip + chat);
    }catch (err) {
        throw boom.boomify(err);
    }
};

// Update trip
exports.updateTrip = async (req, reply) => {
    try {
        const tripId = req.params.tripId;
        console.log(tripId);
        const updatedData = req.body;
        console.log(updatedData);
        const { ...updateData } = updatedData;
        const update = await Trip.findByIdAndUpdate(tripId, updateData, { new: true });
        reply.send(update);

    }catch (err) {
        throw boom.boomify(err);
    }
};

// Get trip by id
exports.getSingleTrip = async (req, reply) => {
    try {
        const id = req.params.tripId;
        const trip = await Trip.findById(id).populate('creator');
        console.log(trip, "this is my trip");
        reply.send(trip);
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get all trips
exports.getTrips = async (req, reply) => {
    try {
        const trips = await Trip.find().populate('creator').populate('participants');
        reply.send(trips);
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get all user trips
exports.getUserTrips = async (req, reply) => {
    try {
        const id = req.params.id;
        const trips = await User.findById(id).populate('trips').populate('participants');
        reply.send(trips);
    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.followTrip = async (req, reply) => {
  try{
        const tripId = req.params.tripId;
        const userId = req.body.userId;
        const trip = await Trip.findById(tripId);
        const user = await User.findById(userId);
        const chat = await Chat.findOne({tripId: tripId});
        console.log(chat, 'this is a chat');
        user.trips.push(trip);
        user.chats.push(chat);
        await user.save();
        reply.send(user);
  } catch(err) {
      throw boom.boomify(err);
  }
};

exports.unfollowTrip = async (req, reply) => {
    try {
        const userId = req.params.userId;
        const tripId = req.body.tripId;
        const chatId = req.body.chatId;
        const user = await User.findById(userId);
        console.log(user.trips);
        user.trips.pull(tripId);
        user.chats.pull(chatId);
        await user.save();
        reply.send(user);
    }catch(err) {
        throw boom.boomify(err);
    }
};