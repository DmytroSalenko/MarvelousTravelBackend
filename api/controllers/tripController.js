// External Dependencies
const boom = require('boom');

// Get Data Models
const User =  require('../models/User');
const Trip =  require('../models/Trip');
const Chat = require('../models/Chat');

// Create a trip
exports.createTrip = async (req, reply) => {
    try {
        const user_id = req.body.userId;
        const user = await User.findById(user_id);
        if (user.length === null){
            reply.status(404).send({message: 'User was not found'})
        }else {
            const tripData = req.body;
            let trip = new Trip();
            trip.name = tripData.name;
            trip.description = tripData.description;
            trip.start_date = tripData.start_date;
            trip.end_date = tripData.end_date;
            trip.picture_url = tripData.picture_url;
            const savedTrip = await trip.save();

            user.trips.push(savedTrip)
            await user.save();

            // create a chat for a trip
            let chat = new Chat();
            chat.tripId = trip.id;
            const savedChat = await chat.save();

            return JSON.stringify(savedTrip) + JSON.stringify(savedChat);
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
        console.log(req.body, "this is body");
        const trip = await Trip.findByIdAndDelete(tripId);
        const chat = await Chat.findByIdAndDelete(chatId);
        return trip + chat;
    }catch (err) {
        throw boom.boomify(err);
    }
};

// TODO: fix params
// Update trip
exports.updateTrip = async (req, reply) => {
    try {
        const tripId = req.params.tripId;
        console.log(tripId);
        const updatedData = req.body;
       // Trip.update({_id:tripId},{$set:{name:updatedData.name, description:updatedData.desc, start_date:updatedData.start_date,
        //        end_date:updatedData.end_date, picture_url:updatedData.picture_url}});
        console.log(updatedData);
        const { ...updateData } = updatedData;
        const update = await Trip.findByIdAndUpdate(tripId, updateData, { new: true });
        return update;

    }catch (err) {
        throw boom.boomify(err);
    }
};

// Get trip by id
// TODO: somehow all trips returned, fix this
exports.getSingleTrip = async (req, reply) => {
    try {
        const id = req.params.tripId;
        const trip = await Trip.findById(id);
        console.log(trip, "this is my trip");
        return trip;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get all trips
exports.getTrips = async (req, reply) => {
    try {
        const trips = await Trip.find();
        return trips;
    } catch (err) {
        throw boom.boomify(err);
    }
};