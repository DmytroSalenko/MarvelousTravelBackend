const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	userId: String,
	userName: String,
	date: String,
	description: String
});

module.exports = mongoose.model('Comments', CommentSchema);