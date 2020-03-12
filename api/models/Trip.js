const mongoose = require('mongoose');
const UserModel = require('./User');
const CityModel = require('./City');

const TripSchema = new mongoose.Schema({
    name: String,
    description: String,
    trip_start_date: String,
    trip_end_date: String,
    picture_url: String,
    destinations: [{
        city: CityModel.schema, start_date: String, end_date: String
    }],
    users: {type: mongoose.Schema.Types.ObjectId, ref:'Users'}
});

module.exports = mongoose.model('Trips', TripSchema);