// External Dependencies
const boom = require('boom');

// Get Data Models
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// Get all cart
exports.getCarts = async (req, reply) => {
	try {
		const carts = await Cart.find();
		return carts;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Get single cart by ID
exports.getSingleCart = async (req, reply) => {
	try {
		const id = req.params.id;
		const cart = await Cart.findById(id);
		return cart;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Add a new cart
exports.addCart = async (req, reply) => {
	try {
		const user_id = req.user;
		let existingCarts = await Cart.find({user_id: user_id});
		if (existingCarts.length !== 0) {
			return reply.status(403).send({message: "The cart is already created"});
		} else {
			const itemsQuantities = req.body.cartItems;
			let cart = new Cart();
			cart.user_id = user_id;

			for (let itemIdToQuantity of itemsQuantities) {
				const product = await Product.findById(itemIdToQuantity.id);
				if (product == null) {
					return reply.status(404).send({message: "Product not found"});
				}

				let cartItem = new CartItem();
				cartItem.quantity = itemIdToQuantity.quantity;
				cartItem.product = product;
				cart.cartItems.push(cartItem);
			}

			return cart.save();
		}
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Update an existing cart
exports.updateCart = async (req, reply) => {
	try {
		const user_id = req.user;
		let existingCarts = await Cart.find({user_id: user_id});
		if (existingCarts.length === 0) {
			return reply.status(403).send({message: "You dont have a cart"});
		} else {
			let cart = existingCarts[0];
			cart.cartItems = [];
			const itemsQuantities = req.body.cartItems;

			for (let itemIdToQuantity of itemsQuantities) {
				const product = await Product.findById(itemIdToQuantity.id);
				if (product == null) {
					return reply.status(404).send({message: "Product not found"});
				}

				let cartItem = new CartItem();
				cartItem.quantity = itemIdToQuantity.quantity;
				cartItem.product = product;
				cart.cartItems.push(cartItem);
			}
			const update = await Cart.findByIdAndUpdate(cart.id, cart, {new: true});
			return update;
		}
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Delete a cart
exports.deleteCart = async (req, reply) => {
	try {
		const id = req.params.id;
		const cart = await Cart.findByIdAndRemove(id);
		return cart;
	} catch (err) {
		throw boom.boomify(err);
	}
};