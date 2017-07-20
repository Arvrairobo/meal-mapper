const mongoose = require('mongoose');

var User = new mongoose.Schema({
	// User login information
	email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
         type: String,
         required: true
    },
    lastName: {
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
	startWeight: {type: Number}, // In pounds
	targetWeight: {type: Number}, // In pounds
	currentWeight: {type: Number}, // In pounds
	gender: {type: String},
	bodyFat: {type: Number},
	activityLevel: {type: Number}, // 0 none, 1 some, 2 active, 3 very active
	rateOfChange: {type: Number}, // weekly rate of change (in pounds) ex. 1.2

	// Array of each meal plan
	mealplans: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Mealplan"
	}]
});

module.exports = mongoose.model('User', User);