const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: String,
	password_hash: String,
	deliveryInfoId: String
});

module.exports = mongoose.model('Users', UserSchema);