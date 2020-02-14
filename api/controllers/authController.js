// External Dependencies
const boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get Data Models
const User = require('../models/User');


exports.signIn = async (req, reply) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const usersFound = await User.find({ email: email });

        if (usersFound.length > 1) {
            reply.status(403).send({message: 'Multiple users found'});
        } else if (usersFound.length === 0) {
            reply.status(404).send({message: 'No users found'});
        }
        const isMatch = bcrypt.compareSync(password, usersFound[0].password_hash);

        if (isMatch) {
            let token = jwt.sign({email: password}, 'hui konya');
            reply.send({ 'access_token': token, 'token_type': 'Bearer' })
        } else {
            reply.status(400).send({message: 'Invalid password'});
        }

    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.authorizeRequest = async (req, reply) => {
    try {
		await jwt.verify(req.headers.authorization, 'hui konya');
	} catch (err) {
		reply.send(err)
	}
};

//TODO add logout function