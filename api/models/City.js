const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
	name: String,
	country: String,
	latitude: Number,
	longitude: Number,
	image_path: [{
		type: String
	}]
});

module.exports = mongoose.model('Cities', CitySchema);