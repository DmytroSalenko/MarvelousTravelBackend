// External Dependencies
const boom = require('boom');

// Get Data Models
const City = require('../models/City');
const Country = require('../models/Country')

// Get all cities
exports.getCities = async (req, reply) => {
	try {
		let city = await City.find();
		// city.map(city => city.imagePath[0] = 'http://' + req.hostname + '/' + city.imagePath[0]);
		reply.send(city);
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Get single city by ID
exports.getSingleCity = async (req, reply) => {
	try {
		const id = req.params.id;
		const city = await City.findById(id);
		reply.send(city);
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Add a new city
exports.addCity = async (req, reply) => {
	try {
		let request = req.body;
		const country_name = req.body.country;
		request.country = await Country.findOne({'name':country_name});
		let city = new City(request);
		reply.send(city.save());
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Update an existing city
exports.updateCity = async (req, reply) => {
	try {
		const id = req.params.id;
		const city = req.body;
		const { ...updateData } = city;
		const update = await City.findByIdAndUpdate(id, updateData, { new: true });
		reply.send(update);
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Delete a city
exports.deleteCity = async (req, reply) => {
	try {
		const id = req.params.id;
		const city = await City.findByIdAndRemove(id);
		reply.send(city);
	} catch (err) {
		throw boom.boomify(err);
	}
};