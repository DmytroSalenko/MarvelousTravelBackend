const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	brand: String,
	name: String,
	price: Number,
	tag: String,
	imagePath: [{
		type: String
	}]
});

module.exports = mongoose.model('Products', ProductSchema);