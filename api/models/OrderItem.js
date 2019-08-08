const mongoose = require('mongoose');
const ProductModel = require('./Product');

const OrderItemSchema = new mongoose.Schema({
	product: ProductModel.schema,
	quantity: Number
});

module.exports = mongoose.model('OrderItems', OrderItemSchema);