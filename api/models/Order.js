const mongoose = require('mongoose');
const OrderItemModel = require('./Country');
const DeliveryInfo = require('./DeliveryInfo');

const OrderSchema = new mongoose.Schema({
	userId: String,
	deliveryInfo: DeliveryInfo.schema,
	isPaid: Boolean,
	date: String,
	orderItems: [OrderItemModel.schema]
});

module.exports = mongoose.model('Orders', OrderSchema);