// External Dependencies
const boom = require('boom');
const Country = require('../models/Country');


// get all countries
exports.getCountries = async (req, reply) => {
    try {
        let countries = await Country.find();
        reply.send(countries);
    } catch (err) {
        throw boom.boomify(err);
    }
};

// get country by id
exports.getSingleCountry = async (req, reply) => {
    try {
        const id = req.params.id;
        const country = await Country.findById(id);
        reply.send(country);
    } catch (err) {
        throw boom.boomify(err);
    }
};

// add new country
exports.addCountry = async (req, reply) => {
    try {
        const country = new Country(req.body);
        reply.send(country.save());
    } catch (err) {
        throw boom.boomify(err);
    }
};

// update existing country
exports.updateCountry = async (req, reply) => {
    try {
        const id = req.params.id;
        const country = req.body;
        const { ...updateData } = country;
        const update = await Country.findByIdAndUpdate(id, updateData, { new: true });
        reply.send(update);
    } catch (err) {
        throw boom.boomify(err);
    }
};

// delete country
exports.deleteCountry = async (req, reply) => {
    try {
        const id = req.params.id;
        const country = await Country.findByIdAndRemove(id);
        reply.send(country);
    } catch (err) {
        throw boom.boomify(err);
    }
};