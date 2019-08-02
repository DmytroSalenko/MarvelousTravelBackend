// External Dependencies
const boom = require('boom');

// Get Data Models
const Cart = require('../models/Cart');

// Get all cart
exports.getCarts = async (req, reply) => {
	try {
		const carts = await Cart.find();
		return carts;
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Get single cart by ID
exports.getSingleCart = async (req, reply) => {
	try {
		const id = req.params.id;
		const cart = await Cart.findById(id);
		return cart;
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Add a new cart
exports.addCart = async (req, reply) => {
	try {
		const cart = new Cart(req.body);
		return cart.save();
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Update an existing cart
exports.updateCart = async (req, reply) => {
	try {
		const id = req.params.id;
		const cart = req.body;
		const { ...updateData } = cart;
		const update = await Cart.findByIdAndUpdate(id, updateData, { new: true });
		return update;
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Delete a cart
exports.deleteCart = async (req, reply) => {
	try {
		const id = req.params.id;
		const cart = await Cart.findByIdAndRemove(id);
		return cart;
	} catch (err) {
		throw boom.boomify(err);
	}
}