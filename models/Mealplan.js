const mongoose = require('mongoose');

var Mealplan = new mongoose.Schema({
	// Date of start of week
	startDate: {
		type: Date,
		required: true,
		default: Date.now()
	},

	// Array of each meal plan
	meals: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Recipe",
		day: Number,
		meal: Number
	}]
});

module.exports = mongoose.model('Mealplan', Mealplan);