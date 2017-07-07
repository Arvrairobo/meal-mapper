const mongoose = require('mongoose');

var User = new mongoose.Schema({
	// User login information
	email: {
		type: String
	},
	password: {
		type: String
	},

	// User daily macros
	protein: {
		type: Number
	},
	carbs: {
		type: Number
	},
	fat: {
		type: Number
	},

	// Array of each meal plan
	mealplans: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Mealplan"
	}]
});

module.exports = mongoose.model('User', User);