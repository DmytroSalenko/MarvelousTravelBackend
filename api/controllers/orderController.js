// External Dependencies
const boom = require('boom');

// Get Data Models
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const OrderItem = require('../models/Country');
const DeliveryInfo = require('../models/DeliveryInfo');
const User =  require('../models/User');

// Get all order
exports.getOrders = async (req, reply) => {
	try {
		const orders = await Order.find();
		return orders;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Get single order by ID
exports.getSingleOrder = async (req, reply) => {
	try {
		const id = req.params.id;
		const order = await Order.findById(id);
		return order;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Add a new order
exports.addOrder = async (req, reply) => {
	try {
		const user_id = req.user;
		let existingCarts = await Cart.find({userId: user_id});
		if (existingCarts.length === 0) {
			return reply.status(403).send({message: "You dont have a cart"});
		} else {
			const cart = existingCarts[0];
			let order = new Order();
			order.userId = user_id;
			order.isPaid = true;
			order.date = Date.now();

			for (let cartItem of cart.cartItems) {
				let orderItem = new OrderItem();
				orderItem.quantity = cartItem.quantity;
				orderItem.product = cartItem.product;

				order.orderItems.push(orderItem);
			}

			const user = await User.findById(user_id);
			const deliveryInfo = await DeliveryInfo.findById(user.deliveryInfoId);
			order.deliveryInfo = deliveryInfo;

			const savedOrder = await order.save();
			cart.cartItems = [];
			await Cart.findByIdAndUpdate(cart._id, cart);
			// const cartToDelete = await Cart.findByIdAndRemove(cart.id);

			return savedOrder;
		}
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Update an existing order
exports.updateOrder = async (req, reply) => {
	try {
		//TODO rework this method in the same way as addOrder
		const id = req.params.id;
		const order = req.body;
		const { ...updateData } = order;
		const update = await Order.findByIdAndUpdate(id, updateData, { new: true });
		return update;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Delete a order
exports.deleteOrder = async (req, reply) => {
	try {
		const id = req.params.id;
		const order = await Order.findByIdAndRemove(id);
		return order;
	} catch (err) {
		throw boom.boomify(err);
	}
};