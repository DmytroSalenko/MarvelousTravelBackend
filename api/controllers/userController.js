// External Dependencies
const boom = require('boom');
const bcrypt = require('bcrypt');

// Get Data Models
const User = require('../models/User');

// Get all users
exports.getUsers = async (req, reply) => {
	try {
		const users = await User.find();
		return users;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Get single user by ID
exports.getSingleUser = async (req, reply) => {
	try {
		const id = req.params.id;
		const user = await User.findById(id);
		return user;
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Add a new user
exports.addUser = async (req, reply) => {
	try {
		let user = new User();
		user.email = req.body.email;
		user.password_hash = bcrypt.hashSync(req.body.password, 2);
		return user.save();
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Update an existing user
exports.updateUser = async (req, reply) => {
	try {
		const id = req.params.id;
		const user = req.body;
		const { ...updateData } = user;
		const update = await User.findByIdAndUpdate(id, updateData, { new: true });
		return update;
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Delete a user
exports.deleteUser = async (req, reply) => {
	try {
		const id = req.params.id;
		const user = await User.findByIdAndRemove(id);
		return user;
	} catch (err) {
		throw boom.boomify(err);
	}
};