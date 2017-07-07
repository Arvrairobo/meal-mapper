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

	// Associations
	mealplans: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "MealPlan"
	}],

	// Add in ability to save individual meals
	// leftovers: [{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 
	// }]
});

module.exports = mongoose.model('User', User);