const mongoose = require('mongoose');
const ProductModel = require('./Product');

const CartItemSchema = new mongoose.Schema({
	quantity: Number,
	cartId: String,
	product: ProductModel.schema
});

module.exports = mongoose.model('CartItems', CartItemSchema);