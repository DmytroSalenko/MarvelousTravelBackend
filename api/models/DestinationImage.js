const mongoose = require('mongoose');


const DestinationImage = new mongoose.Schema({
    url: String,
    width: Number,
    height: Number,
    bytes: Number,
    format: String
});

module.exports = mongoose.model('DestinationImage', DestinationImage);