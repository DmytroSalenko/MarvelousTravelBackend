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
		let email = req.body.email;
		let deliveryInfo = req.body.deliveryInfoId;
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
				user.deliveryInfoId = deliveryInfo;
				user.password_hash = bcrypt.hashSync(req.body.password, 2);
				return user.save();
			}
		}
	} catch (err) {
		throw boom.boomify(err);
	}
};

exports.getUserWithDeliveryInfo = async (req, reply) => {
	try {
		const userId = req.user;
		const user = await User.findById(userId);
		const deliveryId = user.deliveryInfoId;
		const deliveryInfo = await DeliveryInfo.findById(deliveryId);

		const userWithDelivery = { _id: user._id, email: user.email, deliveryInfoId: deliveryId, deliveryInfo: deliveryInfo };

		reply.send(userWithDelivery);
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
		return update;
	} catch (err) {
		throw boom.boomify(err);
	}
};

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

//Change password
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
		}
	} catch (err) {
		throw boom.boomify(err);
	}
};