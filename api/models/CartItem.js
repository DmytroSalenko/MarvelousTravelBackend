const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
	//TODO add product schema here
	product_id: String,
	quantity: Number
});

module.exports = mongoose.model('CartItems', CartItemSchema);