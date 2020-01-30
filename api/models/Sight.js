const mongoose = require('mongoose');
const CityModel = require('./City');


const SightSchema = new mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    city: CityModel.schema,
    image_path: [{
        type: String
    }]
});

module.exports = mongoose.model('Sights', SightSchema);