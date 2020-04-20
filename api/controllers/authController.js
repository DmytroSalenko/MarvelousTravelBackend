// External Dependencies
const boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const FB = require('fb');
const {OAuth2Client} = require('google-auth-library');
const googleClientID = '594467304444-i56gdff7v61kje4v756n2t3j0n9gfj98.apps.googleusercontent.com';
const client = new OAuth2Client(googleClientID);
const fs = require('fs');
const download = require('image-downloader')
const path = require('path');



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
            reply.send({ 'user': usersFound[0], 'token_data': {'access_token': token, 'token_type': 'Bearer' }});
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
            let user_id = saved_user.id;
            let image_url = saved_user.icon_path;
            let icon_path = path.resolve('api/resources/image', user_id);
            if (!fs.existsSync(icon_path)){
                fs.mkdirSync(icon_path);
            }
            let updated_path = path.join(icon_path, 'profilepic.jpg');
            const options = {url: image_url, dest: updated_path};
            var image_url_to_save = await downloadIMG(options);

            image_url_to_save = process.env.serverAddress + ':' + process.env.serverPort + '/' + path.join(...image_url_to_save.split(path.sep).slice(-5));

            saved_user.icon_path = image_url_to_save;
            const updated_user = await User.findByIdAndUpdate(saved_user.id, saved_user, { new: true });
            let token = jwt.sign({email: userEmail}, 'hui konya');
            reply.send({ 'user': updated_user, 'token_data': {'access_token': token, 'token_type': 'Bearer' }});
        } else {
            let token = jwt.sign({email: usersFound.email}, 'hui konya');
            reply.send({ 'user': usersFound[0], 'token_data': {'access_token': token, 'token_type': 'Bearer' }});
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
                            let user_id = saved_user.id;
                            let image_url = saved_user.icon_path;
                            let icon_path = path.resolve('api/resources/image', user_id);
                            if (!fs.existsSync(icon_path)){
                                fs.mkdirSync(icon_path);
                            }
                            let updated_path = path.join(icon_path, 'profilepic.jpg');
                            const options = {url: image_url, dest: updated_path};
                            var image_url_to_save = await downloadIMG(options);

                            image_url_to_save = process.env.serverAddress + ':' + process.env.serverPort + '/' + path.join(...image_url_to_save.split(path.sep).slice(-5));

                            saved_user.icon_path = image_url_to_save;
                            const updated_user = await User.findByIdAndUpdate(saved_user.id, saved_user, { new: true });
                            console.log(updated_user.id);
                            let user_email = user.email;
                            let password = user.password_hash;
                            let token = jwt.sign({user_email: password}, 'hui konya');
                            reply.send({ 'user': updated_user, 'token_data': {'access_token': token, 'token_type': 'Bearer' }});
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

async function downloadIMG(options) {
    try {
        const { filename, image } = await download.image(options);
        console.log(filename);
        return filename;// => /path/to/dest/image.jpg
    } catch (e) {
        console.error(e)
    }
}
//TODO add logout function