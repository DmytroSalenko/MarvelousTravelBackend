const mongoose = require('mongoose');
const CountryModel = require('./Country');


const CitySchema = new mongoose.Schema({
	name: String,
	country: CountryModel.schema,
	latitude: Number,
	longitude: Number,
	image_path: [{
		type: String
	}]
});

module.exports = mongoose.model('Cities', CitySchema);