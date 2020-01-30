const mongoose = require('mongoose');
const UserModel = require('./User');

const TripSchema = new mongoose.Schema({
    name: String,
    description: String,
    start_date: String,
    end_date: String,
    picture_url: String,
    users: {type: mongoose.Schema.Types.ObjectId, ref:'Users'}
});

module.exports = mongoose.model('Trips', TripSchema);