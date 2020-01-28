const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
	name: String,
});

module.exports = mongoose.model('Countries', CountrySchema);