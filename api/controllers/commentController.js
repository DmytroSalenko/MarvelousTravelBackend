// External Dependencies
const boom = require('boom');

// Get Data Models
const Comment = require('../models/Comment');

// Get all comments
exports.getComments = async (req, reply) => {
	try {
		const comments = await Comment.find();
		return comments;
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Get single comment by ID
exports.getSingleComment = async (req, reply) => {
	try {
		const id = req.params.id;
		const comment = await Comment.findById(id);
		return comment;
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Add a new comment
exports.addComment = async (req, reply) => {
	try {
		const comment = new Comment(req.body);
		return comment.save();
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Update an existing comment
exports.updateComment = async (req, reply) => {
	try {
		const id = req.params.id;
		const comment = req.body;
		const { ...updateData } = comment;
		const update = await Comment.findByIdAndUpdate(id, updateData, { new: true });
		return update;
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Delete a comment
exports.deleteComment = async (req, reply) => {
	try {
		const id = req.params.id;
		const comment = await Comment.findByIdAndRemove(id);
		return comment;
	} catch (err) {
		throw boom.boomify(err);
	}
}