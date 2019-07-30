const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
	product_id: String,
	quantity: Number
});

module.exports = mongoose.model('CartItems', CartItemSchema);