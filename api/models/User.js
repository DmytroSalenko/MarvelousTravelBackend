const mongoose = require('mongoose');
const CityModel = require('./City');


const UserSchema = new mongoose.Schema({
	email: String,
	password_hash: String,
	first_name: String,
	last_name: String,
	create_at: Date,
	icon_path: String,
	mini_icon_path: String,
	about: String,
	interests: String,
	date_of_birth: Date,
	place_of_living: CityModel.schema,
	images_path: [{type: String}],
	trips: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'Trips'}
	],
	chats: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'Chats'}
	],
	comments: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}
	]
});

module.exports = mongoose.model('Users', UserSchema);