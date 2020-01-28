// External Dependencies
const boom = require('boom');

// Get Data Models
const City = require('../models/City');

// Get all products
exports.getCities = async (req, reply) => {
	try {
		let city = await City.find();
		// city.map(city => city.imagePath[0] = 'http://' + req.hostname + '/' + city.imagePath[0]);
		return city;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Get single product by ID
exports.getSingleCity = async (req, reply) => {
	try {
		const id = req.params.id;
		const city = await City.findById(id);
		return city;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Add a new product
exports.addCity = async (req, reply) => {
	try {
		const city = new City(req.body);
		return city.save();
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Update an existing product
exports.updateCity = async (req, reply) => {
	try {
		const id = req.params.id;
		const city = req.body;
		const { ...updateData } = city;
		const update = await City.findByIdAndUpdate(id, updateData, { new: true });
		return update;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Delete a product
exports.deleteCity = async (req, reply) => {
	try {
		const id = req.params.id;
		const city = await City.findByIdAndRemove(id);
		return city;
	} catch (err) {
		throw boom.boomify(err);
	}
};