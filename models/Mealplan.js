const mongoose = require('mongoose');

var Mealplan = new mongoose.Schema({
	// Date of start of week
	startDate: {
		type: Date,
		required: true
	},
	
	// 2D array format
	meals:[
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
		[{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}]
	]
});

// teachers: [ { teacher: { type: Schema.ObjectId, ref: "Teacher" } } ]

module.exports = mongoose.model('Mealplan', Mealplan);