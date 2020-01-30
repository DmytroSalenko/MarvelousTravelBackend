// External Dependencies
const boom = require('boom');

// Get Data Models
const City = require('../models/City');
const Sight = require('../models/Sight');


// get all sights
exports.getSights= async (req, reply) => {
    try {
        let sights = await Sight.find();
        // city.map(city => city.imagePath[0] = 'http://' + req.hostname + '/' + city.imagePath[0]);
        return sights;
    } catch (err) {
        throw boom.boomify(err);
    }
};


// get sight by id
exports.getSingleSight = async (req, reply) => {
    try {
        const id = req.params.id;
        const sight = await Sight.findById(id);
        return sight;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// add a new sight
exports.addSight = async (req, reply) => {
    try {
        let request = req.body;
        const city_name = req.body.city;
        request.city = await City.findOne({'name':city_name});
        let sight = new Sight(request);
        return sight.save();
    } catch (err) {
        throw boom.boomify(err);
    }
};

// update an existing sight
exports.updateSight = async (req, reply) => {
    try {
        const id = req.params.id;
        const sight = req.body;
        const { ...updateData } = sight;
        const update = await Sight.findByIdAndUpdate(id, updateData, { new: true });
        return update;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// delete sight
exports.deleteSight = async (req, reply) => {
    try {
        const id = req.params.id;
        const sight = await Sight.findByIdAndRemove(id);
        return sight;
    } catch (err) {
        throw boom.boomify(err);
    }
};