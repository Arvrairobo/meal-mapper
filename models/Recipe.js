const mongoose = require('mongoose');

var Recipe = new mongoose.Schema({
	name: {
		type: String
	},
	url: {
		type: String
	},
	picutre: {
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
})

module.exports = mongoose.model('Recipe', Recipe);