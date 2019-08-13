// External Dependencies
const boom = require('boom');

// Get Data Models
const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, reply) => {
	try {
		let products = await Product.find();
		products.map(product => product.imagePath[0] = 'http://' + req.hostname + '/' + product.imagePath[0]);
		return products;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Get single product by ID
exports.getSingleProduct = async (req, reply) => {
	try {
		const id = req.params.id;
		const product = await Product.findById(id);
		return product;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Add a new product
exports.addProduct = async (req, reply) => {
	try {
		const product = new Product(req.body);
		return product.save();
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Update an existing product
exports.updateProduct = async (req, reply) => {
	try {
		const id = req.params.id;
		const product = req.body;
		const { ...updateData } = product;
		const update = await Product.findByIdAndUpdate(id, updateData, { new: true });
		return update;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Delete a product
exports.deleteProduct = async (req, reply) => {
	try {
		const id = req.params.id;
		const product = await Product.findByIdAndRemove(id);
		return product;
	} catch (err) {
		throw boom.boomify(err);
	}
};