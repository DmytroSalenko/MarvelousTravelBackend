// External Dependencies
const boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const googleClientID = '594467304444-i56gdff7v61kje4v756n2t3j0n9gfj98.apps.googleusercontent.com';
const client = new OAuth2Client(googleClientID);

// Get Data Models
const User = require('../models/User');


exports.signIn = async (req, reply) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const usersFound = await User.find({ email: email });

        if (usersFound.length > 1) {
            reply.status(403).send({message: 'Multiple users found'});
            return;
        } else if (usersFound.length === 0) {
            reply.status(404).send({message: 'No users found'});
            return;
        }
        const isMatch = bcrypt.compareSync(password, usersFound[0].password_hash);

        if (isMatch) {
            let token = jwt.sign({email: password}, 'hui konya');
            reply.send({ 'access_token': token, 'token_type': 'Bearer' });
        } else {
            reply.status(400).send({message: 'Invalid password'});
        }

    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.googleSignIn = async (req, reply) => {
    const userToken = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: userToken,
            audience: googleClientID,
        });

        const payload = ticket.getPayload();
        const userName = payload['given_name'];
        const userLastName = payload['family_name'];
        const userEmail = payload['email'];
        const userPicture = payload['picture'];

        const usersFound = await User.find({ email: userEmail });
        if(usersFound.length === 0){
            let user = new User();
            user.email = userEmail;
            user.first_name = userName;
            user.last_name = userLastName;
            user.icon_path = userPicture;
            const saved_user = await user.save();
            reply.send(saved_user);
            let token = jwt.sign({email: userEmail}, 'hui konya');
            reply.send({ 'access_token': token, 'token_type': 'Bearer' });
        } else {
            let token = jwt.sign({email: usersFound.email}, 'hui konya');
            reply.send({ 'access_token': token, 'token_type': 'Bearer' });
        }

        reply.send();
    }
    verify().catch(console.error);
};

exports.checkEmailAvailability = async (req, reply) => {
    const email = req.body.email;
    const usersFound = await User.find({ email: email });
    if (usersFound.length > 0) {
        reply.status(403).send();
    } else {
        reply.status(200).send();
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