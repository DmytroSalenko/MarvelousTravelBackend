const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	// {type: mongoose.Schema.Types.ObjectId, ref:'Users'}
	userId: String,
	userName: String,
	date: String,
	description: String
});

module.exports = mongoose.model('Comments', CommentSchema);