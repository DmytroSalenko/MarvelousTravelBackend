// External Dependencies
const boom = require('boom');

// Get Data Models
const Order = require('../models/Order');

// Get all order
exports.getOrders = async (req, reply) => {
	try {
		const orders = await Order.find();
		return orders;
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Get single order by ID
exports.getSingleOrder = async (req, reply) => {
	try {
		const id = req.params.id;
		const order = await Order.findById(id);
		return order;
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Add a new order
exports.addOrder = async (req, reply) => {
	try {
		const order = new Order(req.body);
		return order.save();
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Update an existing order
exports.updateOrder = async (req, reply) => {
	try {
		const id = req.params.id;
		const order = req.body;
		const { ...updateData } = order;
		const update = await Order.findByIdAndUpdate(id, updateData, { new: true });
		return update;
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Delete a order
exports.deleteOrder = async (req, reply) => {
	try {
		const id = req.params.id;
		const order = await Order.findByIdAndRemove(id);
		return order;
	} catch (err) {
		throw boom.boomify(err);
	}
}