const mongoose = require('mongoose');

var User = new mongoose.Schema({
	// User login information
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},

	// User macro information
	protein: {
		type: Number,
		required: true,
		default: 0
	},
	fat: {
		type: Number,
		required: true,
		default: 0
	},
	carbs: {
		type: Number,
		required: true,
		default: 0
	},

	// Fitness profile
	diet: {type: String},
	height: {type: Number}, // In inches - convert to ft. in. on client side
	weight: {type: Number}, // In pounds
	targetWeight: {type: Number}, // In pounds
	gender: {type: String},
	bodyFat: {type: Number},
	activityLevel: {type: Number}, // 0 none, 1 some, 2 active, 3 very active


	// Array of each meal plan
	mealplans: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Mealplan"
	}]
});

module.exports = mongoose.model('User', User);