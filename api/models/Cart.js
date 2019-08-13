const mongoose = require('mongoose');
const CartItemModel = require('./CartItem');

const CartSchema = new mongoose.Schema({
	cartItems: [CartItemModel.schema],
	userId: String
});

module.exports = mongoose.model('Carts', CartSchema);