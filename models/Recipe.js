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
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	servings: {
		type: Number
	},

	protein: {
		type: Number
	},
	carbs: {
		type: Number
	},
	fat: {
		type: Number
	},

	ingredients: [{
		amount: Number,
		measurement: String,
		ingredient: String
	}],

	tags: {
		type: [String]
	},
	meal: {
		type: String
	}
})

module.exports = mongoose.model('Recipe', Recipe);