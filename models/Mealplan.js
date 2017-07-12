const mongoose = require('mongoose');

var Mealplan = new mongoose.Schema({
	// Date of start of week
	startDate: {
		type: Date,
		required: true,
		default: Date.now()
	},

	// Array of each meal plan (FOR DAY/MEAL BREAKDOWN)
	// meals: [{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "Recipe",
	// 	day: Number,
	// 	meal: Number
	// }]

	// 2D array format
	meals: [
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}]
	]
});

module.exports = mongoose.model('Mealplan', Mealplan);