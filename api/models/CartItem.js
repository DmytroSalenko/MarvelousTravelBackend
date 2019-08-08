const mongoose = require('mongoose');
const ProductModel = require('./Product');

const CartItemSchema = new mongoose.Schema({
	quantity: Number,
	product: ProductModel.schema
});

module.exports = mongoose.model('CartItems', CartItemSchema);