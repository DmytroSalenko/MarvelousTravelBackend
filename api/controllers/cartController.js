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
		const userId = req.user;
		let existingCarts = await Cart.find({userId: userId});
		if (existingCarts.length !== 0) {
			return reply.status(403).send({message: "The cart is already created"});
		} else {
			let cart = new Cart();
			cart.userId = userId;

			await cart.save();
			// return {cartItems: cart.cartItems, userId: cart.userId};
			reply.send(cart);
		}
	} catch (err) {
		throw boom.boomify(err);
	}
};

exports.addToCart = async (req, reply) => {
	const userId = req.user;
	const productId = req.body.productId;
	const quantity = req.body.quantity;

	const carts = await Cart.find({userId: userId});
	if (carts.length === 0) {
		reply.status(204).send({message: 'There is no cart'});
	} else {
		const product = await Product.findById(productId);
		let cart = carts[0];
		let cartItem = new CartItem();
		cartItem.cartId = cart._id;
		cartItem.quantity = quantity;
		cartItem.product = product;
		cart.cartItems.push(cartItem);
		await Cart.findByIdAndUpdate(cart._id, cart);
		// const updatedCart = await Cart.findById(cart._id);
		return cartItem;
	}
};

exports.updateCartItem = async (req, reply) => {
	try {
		const cartItemId = req.params.id;
		const quantity = req.body.quantity;
		const carts = await Cart.find({'cartItems._id': cartItemId});
		if (carts.length === 0) {
			reply.status(204).send({message: 'There is no cart with such item'});
		} else {
			let cart = carts[0];
			let filteredCartItems = cart.cartItems.find(function(element) {
				return element._id.toString() === cartItemId;
			});
			let cartItemToUpdate = filteredCartItems;
			cartItemToUpdate.quantity = quantity;
			await Cart.findByIdAndUpdate(cart._id, cart);
			// const updatedCart = await Cart.findById(cart._id);
			return cartItemToUpdate;
		}
	} catch (err) {
		throw boom.boomify(err);
	}

};

exports.getUserCart = async (req, reply) => {
	try {
		const userId = req.user;
		const cart = await Cart.findOne({userId: userId});
		if (cart === null || cart.length === 0) {
			reply.status(204).send({message: 'There is no cart'});
		} else {
			reply.send(cart);
		}
	} catch (err) {
		throw boom.boomify(err);
	}

};

exports.deleteCartItem = async (req, reply) => {
	try {
		const cartItemId = req.params.id;
		const carts = await Cart.find({'cartItems._id': cartItemId});
		if (carts.length === 0) {
			reply.status(204).send({message: 'There is no cart with such item'});
		} else {
			let cart = carts[0];
			let filteredCartItems = cart.cartItems.filter(function(element) {
				return element._id.toString() !== cartItemId;
			});

			cart.cartItems = filteredCartItems;
			await Cart.findByIdAndUpdate(cart._id, cart);
			const updatedCart = await Cart.findById(cart._id);
			return updatedCart;
		}
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Update an existing cart
exports.updateCart = async (req, reply) => {
	try {
		const user_id = req.user;
		let existingCarts = await Cart.find({userId: user_id});
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
		const user_id = req.user;
		let existingCarts = await Cart.find({userId: user_id});
		if (existingCarts.length === 0) {
			reply.status(204).send({message: 'There is no cart'});
		} else {
			let cart = existingCarts[0];
			cart.cartItems = [];
			await Cart.findByIdAndUpdate(cart._id, cart);
			const updatedCart = await Cart.findById(cart._id);
			return updatedCart;
		}
	} catch (err) {
		throw boom.boomify(err);
	}
};