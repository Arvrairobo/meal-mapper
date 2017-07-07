const mongoose = require('mongoose');

var Recipe = new mongoose.Schema({
	name: {
		type: String
	},
	url: {
		type: String
	},
	image: {
		type: String
	},

	protein: {
		type: Number
	},
	carbs: {
		type: Number
	},
	fat: {
		type: Number
	}

	ingredients: {
		type: Array
	},
	servings: {
		type: Number
	}
})

module.exports = mongoose.model('Recipe', Recipe);