// Set up and connect to database
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mealplanner');
var database = mongoose.connection();

database.on('error', function(error){
	console.log(`Error with database: ${error}.`);
});

database.once('open', function(){
	console.log('Database connection successful.')
});

var User = require('../models/User.js');
var Mealplan = require('../models/Mealplan.js');
var Recipe = require('../models/Recipe.js');

module.exports = function(server){
	// Create new user
	server.post('/api/user', function(request, response){
		User.create(request.body, function(error, user){
			if(error) throw error;

			response.json(user);
		});
	});

	// Get user details
	server.get('/api/user/:email', function(request, response){
		User.find({email: request.params.email}, function(error, user){
			if(error) throw error;

			response.json(user);
		});
	});
}