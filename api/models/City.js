const mongoose = require('mongoose');
const CountryModel = require('./Country');


const CitySchema = new mongoose.Schema({
	city_name: String,
	country_name: String,
	city_id: String,
	country_id: String,
	latitude: Number,
	longitude: Number,
	image_path: [{
		type: String
	}]
});

module.exports = mongoose.model('Cities', CitySchema);