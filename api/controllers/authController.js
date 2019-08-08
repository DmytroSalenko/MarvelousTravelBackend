// External Dependencies
const boom = require('boom');
const bcrypt = require('bcrypt');

// Get Data Models
const User = require('../models/User');


exports.signUp = async (req, reply) => {
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
            return reply.jwtSign(usersFound[0].id, function (err, token) {
                return reply.send(err || { 'token': token })
            });
        } else {
            reply.status(400).send({message: 'Invalid password'});
        }

    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.authenticateRequest = async (req, reply, next) => {
    try {
		await req.jwtVerify()
	} catch (err) {
		reply.send(err)
	}
	next();
};