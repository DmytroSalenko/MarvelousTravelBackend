// External Dependencies
const boom = require('boom');

// Get Data Models
const DeliveryInfo = require('../models/DeliveryInfo');

// Get all delivery infos
exports.getDeliveryInfos = async (req, reply) => {
	try {
		const deliveryInfos = await DeliveryInfo.find();
		return deliveryInfos;
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Get single delivery info by ID
exports.getSingleDeliveryInfo = async (req, reply) => {
	try {
		const id = req.params.id;
		const deliveryInfo = await DeliveryInfo.findById(id);
		return deliveryInfo;
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Add a new delivery info
exports.addDeliveryInfo = async (req, reply) => {
	try {
		const deliveryInfo = new DeliveryInfo(req.body);
		return deliveryInfo.save();
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Update an existing delivery info
exports.updateDeliveryInfo = async (req, reply) => {
	try {
		//TODO fix it
		const id = req.params.id;
		const deliveryInfo = req.body;
		const { ...updateData } = deliveryInfo;
		const update = await DeliveryInfo.findByIdAndUpdate(id, updateData, { new: true });
		return update;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Delete a delivery info
exports.deleteDeliveryInfo = async (req, reply) => {
	try {
		const id = req.params.id;
		const deliveryInfo = await DeliveryInfo.findByIdAndRemove(id);
		return deliveryInfo;
	} catch (err) {
		throw boom.boomify(err);
	}
}