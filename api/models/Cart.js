const mongoose = require('mongoose');
const CartItemModel = require('./CartItem');

const CartSchema = new mongoose.Schema({
	user_id: String,
	cartItems: [CartItemModel.schema]
});

module.exports = mongoose.model('Carts', CartSchema);