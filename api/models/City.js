const mongoose = require('mongoose');
const CountryModel = require('./Country');


const CitySchema = new mongoose.Schema({
	name: String,
	id : String, // city_id
	parent_id: String,
	country_id: String,
	latitude: Number,
	longitude: Number,
	snippet : String,
	image_path: [{
		type: String
	}]
});

module.exports = mongoose.model('Cities', CitySchema);