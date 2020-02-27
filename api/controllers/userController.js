// External Dependencies
const boom = require('boom');
const bcrypt = require('bcrypt');

// Get Data Models
const User = require('../models/User');
const DeliveryInfo = require('../models/DeliveryInfo');

// Get all users
exports.getUsers = async (req, reply) => {
	try {
		const users = await User.find();
		reply.send(users);
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Get single user by ID
exports.getSingleUser = async (req, reply) => {
	try {
		const id = req.params.id;
		const user = await User.findById(id);
		reply.send(user);
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Add a new user
exports.addUser = async (req, reply) => {
	try {
		let email = req.body.email;
		let first_name = req.body.first_name;
		let last_name = req.body.last_name;
		let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		if (!email.match(regex)) {
			reply.status(403).send({message: "Email is invalid"});
		} else {
			let existingUsers = await User.find({email: email});
			if (existingUsers.length > 0) {
				reply.status(403).send({message: "This user already exists"});
			} else {
				let user = new User();
				user.email = email;
				user.password_hash = bcrypt.hashSync(req.body.password, 2);
				user.first_name = first_name;
				user.last_name = last_name;
				const saved_user = await user.save();
				reply.send(saved_user);
			}
		}
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Update an existing user
exports.updateUser = async (req, reply) => {
	try {
		const id = req.params.id;
		const user = req.body;
		const { ...updateData } = user;
		const update = await User.findByIdAndUpdate(id, updateData, { new: true });
		reply.send(update);
	} catch (err) {
		throw boom.boomify(err);
	}
};

// Delete a user
exports.deleteUser = async (req, reply) => {
	try {
		const id = req.params.id;
		const user = await User.findByIdAndRemove(id);
		reply.send(user);
	} catch (err) {
		throw boom.boomify(err);
	}
};

//Change password TODO maybe delete it or rework finally
exports.changePassword = async (req, reply) => {
	try {
		const oldPassword = req.body.oldPassword;
		const newPassword = req.body.password;
		const userId = req.user;
		let user = await User.findById(userId);
		const isMatch = bcrypt.compareSync(oldPassword, user.password_hash);
		if (isMatch) {
			user.password_hash = bcrypt.hashSync(newPassword, 2);
			await User.findByIdAndUpdate(user._id, user);
		} else {
			throw new Error();
		}
	} catch (err) {
		throw boom.boomify(err);
	}
};