const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	userName: String,
	productId: String,
	userId: String,
	rating: String,
	description: String,
	date: String,
	attachmentUrls: [{
		type: String
	}]
});

module.exports = mongoose.model('Comments', CommentSchema);