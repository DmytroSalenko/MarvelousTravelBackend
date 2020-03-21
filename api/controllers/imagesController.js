const User = require('../models/User');
const jimp = require('jimp');
const path = require('path');



exports.getImage = async (req, reply) => {
    let user_id = req.params.user_id;
    let image_name = req.params.image_name;
    reply.sendFile(path.resolve('api/resources/image', user_id, image_name));
};

exports.uploadProfileIcon = async (req, reply) => {
    const file = req.file;
    const icon_name = file.filename;
    const mini_icon_name = 'shakal-' + icon_name;
    const destination = file.destination;
    const icon_path = 'http://' + destination + '/' + icon_name;
    const mini_icon_path = 'http://' + destination + '/' + mini_icon_name;

    jimp.read(icon_path, (err, icon) => {
        if (err) throw err;
        icon.resize(50, 50)
            .quality(100)
            .write(mini_icon_path);
    });


    const user_id = req.params.id;
    let user = await User.findById(user_id);
    user.icon_path = process.env.serverAddress + ':' + process.env.serverPort + '/' + icon_path;
    user.mini_icon_path = process.env.serverAddress + ':' + process.env.serverPort + '/' + mini_icon_path;

    let updated_user = await User.findByIdAndUpdate(user_id, user, { new: true });
    reply.send(updated_user)
};


exports.getProfileIcon = async (req, reply) => {
    let user_id = req.params.id;
    let user = await User.findById(user_id);
    if (user) {
        let profile_icon_path = user.icon_path;
        if (profile_icon_path != null) {
            reply.sendFile(path.resolve(profile_icon_path));
        } else {
            reply.status(404).send({message: 'No icon found'});
        }
    } else {
        reply.status(404).send({message: 'No users found'});
    }

};


exports.getProfileMiniIcon = async (req, reply) => {
    let user_id = req.params.id;
    let user = await User.findById(user_id);
    if (user) {
        let profile_mini_icon_path = user.mini_icon_path;
        if (profile_mini_icon_path != null) {
            reply.sendFile(path.resolve(profile_mini_icon_path));
        } else {
            reply.status(404).send({message: 'No icon found'});
        }
    } else {
        reply.status(404).send({message: 'No users found'});
    }
};