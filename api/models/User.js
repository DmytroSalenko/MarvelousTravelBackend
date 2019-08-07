const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: String,
	password_hash: String,
	deliveryinfo_id: String
});

module.exports = mongoose.model('Users', UserSchema);