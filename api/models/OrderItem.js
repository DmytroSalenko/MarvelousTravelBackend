const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
	product_id: String,
	quantity: Number
});

module.exports = mongoose.model('OrderItems', OrderItemSchema);