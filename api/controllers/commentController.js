// External Dependencies
const boom = require('boom');

// Get Data Models
const Comment = require('../models/Comment');
const Order = require('../models/Order');

// Get all comments
exports.getComments = async (req, reply) => {
	try {
		const comments = await Comment.find();
		return comments;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Get single comment by ID
exports.getSingleComment = async (req, reply) => {
	try {
		const id = req.params.id;
		const comment = await Comment.findById(id);
		return comment;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Get single comment by ID
exports.getCommentsByProductId = async (req, reply) => {
	try {
		const id = req.params.product_id;
		const comment = await Comment.find({'productId': id});
		return comment;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Add a new comment
exports.addComment = async (req, reply) => {
	try {
		const user_id = req.user;
		const product_id = req.body.productId;
		//TODO uncomment this when frontend is ready

		// const ordersCreated = await Order.find({'user_id': user_id, 'orderItems.product._id': product_id});
		// if (ordersCreated.length === 0) {
		// 	reply.status(404).send({message: "You have to purchase this item first"});
		// } else {
		// 	let comment = new Comment(req.body);
		// 	comment.userId = user_id;
		// 	return comment.save();
		// }
		const commentData = req.body;
		let comment = new Comment();
		comment.userId = user_id;
		comment.userName = commentData.userName;
		comment.productId = commentData.productId;
		comment.rating = commentData.rating;
		comment.description = commentData.description;
		comment.date = commentData.date;
		return comment.save();
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Update an existing comment
exports.updateComment = async (req, reply) => {
	try {
		//TODO add checking that item is purchased and comment is left by correct user
		const id = req.params.id;
		const comment = req.body;
		const { ...updateData } = comment;
		const update = await Comment.findByIdAndUpdate(id, updateData, { new: true });
		return update;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Delete a comment
exports.deleteComment = async (req, reply) => {
	try {
		const id = req.params.id;
		const comment = await Comment.findByIdAndRemove(id);
		return comment;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Ensure that user has purchased the item before leaving a comment
exports.ensurePurchased = async (req, reply, next) => {
	try {
		const id = req.user;
		const product_id = req.body.product_id;
		const order = await Comment.findOne({'user_id': id, 'orderItems.product_id': product_id});
		next();
	} catch (err) {
		throw boom.boomify(err);
	}
};