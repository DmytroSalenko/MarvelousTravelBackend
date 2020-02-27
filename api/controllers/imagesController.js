const User = require('../models/User');
const jimp = require('jimp');



exports.uploadProfileIcon = async (req, reply) => {
    const file = req.file;
    const icon_name = file.filename;
    const mini_icon_name = 'shakal-' + icon_name;
    const destination = file.destination;
    const icon_path = destination + '/' + icon_name;
    const mini_icon_path = destination + '/' + mini_icon_name;

    jimp.read(icon_path, (err, icon) => {
        if (err) throw err;
        icon.resize(50, 50)
            .quality(100)
            .write(mini_icon_path);
    });


    const user_id = req.params.id;
    let user = await User.findById(user_id);
    user.icon_path = icon_path;
    user.mini_icon_path = mini_icon_path;

    let updated_user = await User.findByIdAndUpdate(user_id, user, { new: true });
    reply.send(updated_user)
};


exports.getProfileIcon = async (req, reply) => {
    let user_id = req.params.id;
    let user = await User.findById(user_id);
    if (user) {
        let profile_icon_path = user.icon_path;
        if (profile_icon_path != null) {
            reply.sendFile(profile_icon_path);
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
            reply.sendFile(profile_mini_icon_path);
        } else {
            reply.status(404).send({message: 'No icon found'});
        }
    } else {
        reply.status(404).send({message: 'No users found'});
    }
};