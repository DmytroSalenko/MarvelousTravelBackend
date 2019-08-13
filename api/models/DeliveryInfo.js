const mongoose = require('mongoose');

const DeliveryInfoSchema = new mongoose.Schema({
	userName: String,
	addressLine: String,
	city: String,
	postalCode: String,
	province: String
});

module.exports = mongoose.model('DeliveryInfos', DeliveryInfoSchema);