// External Dependencies
const boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const FB = require('fb');

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

exports.checkEmailAvailability = async (req, reply) => {
    const email = req.body.email;
    const usersFound = await User.find({ email: email });
    if (usersFound.length > 0) {
        reply.status(403).send();
    } else {
        reply.status(200).send();
    }
};

exports.facebookAuthentication = async (req, reply) => {
    // get access token to validate user's token
    FB.api('/oauth/access_token' , 'get',
        {client_id: '880651202407103', client_secret: '86a4d5f5655a882663997c6999464349',
         grant_type: 'client_credentials'},
        async function(response) {
            // validate user's token (input token) having access token
            let access_token = response.access_token;
            let input_token = req.params.access_token;
            FB.api('/debug_token', 'get', {input_token: input_token, access_token: access_token},
                async function (fb_response) {
                    let fb_id = req.body.id;
                    if (fb_id === fb_response.data.user_id) {
                        let email = req.body.email;
                        let user = await User.findOne({email: email});
                        if (user) {
                            let user_email = user.email;
                            let password = user.password_hash;
                            let token = jwt.sign({user_email: password}, 'hui konya');
                            reply.send({ 'user': user, 'token_data': {'access_token': token, 'token_type': 'Bearer' }});
                        } else {
                            user = new User();
                            user.email = email;
                            user.password_hash = "";
                            user.first_name = req.body.first_name;
                            user.last_name = req.body.last_name;
                            user.icon_path = req.body.picture_normal.data.url;
                            user.mini_icon_path = req.body.picture_small.data.url;

                            const saved_user = await user.save();
                            let user_email = user.email;
                            let password = user.password_hash;
                            let token = jwt.sign({user_email: password}, 'hui konya');
                            reply.send({ 'user': saved_user, 'token_data': {'access_token': token, 'token_type': 'Bearer' }});
                        }
                    }
                })
    });
};

exports.authorizeRequest = async (req, reply) => {
    try {
		await jwt.verify(req.headers.authorization, 'hui konya');
	} catch (err) {
		reply.send(err)
	}
};

//TODO add logout function