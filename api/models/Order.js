const mongoose = require('mongoose');
const OrderItemModel = require('./OrderItem');

const OrderSchema = new mongoose.Schema({
	user_id: String,
	deliveryinfo_id: String,
	isPaid: Boolean,
	date: String,
	orderItems: [OrderItemModel.schema]
});

module.exports = mongoose.model('Orders', OrderSchema);