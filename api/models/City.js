const mongoose = require('mongoose');
const CountryModel = require('./Country');
const DestinationImageModel = require('./DestinationImage')

const CitySchema = new mongoose.Schema({
	name: String,
	id : String, // city_id
	parent_id: String,
	country_id: String,
	coordinates: {latitude: Number, longitude: Number},
	snippet : String,
	images: [{
		sizes: {medium: DestinationImageModel.schema,
				original: DestinationImageModel.schema,
				thumbnail: DestinationImageModel.schema }
	}]
});

module.exports = mongoose.model('Cities', CitySchema);