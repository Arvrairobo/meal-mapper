// Keys for Edamam API
const appId = '1d8fc3d8';
const appKey = '82b0696857a06bb20b6bc51dedc0360f';
const search = 'https://api.edamam.com/search';

// Set up and connect to database
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mealplanner');
var database = mongoose.connection;

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

	// Create a new recipe
	server.post('/api/recipe', function(request, response){
		Recipe.create(request.body, function(error, recipe){
			if(error) throw error;
			response.json(recipe);
		});
	});

	// Search for all recipes based on search term
	server.get('/api/recipes/:search', function(request, response){
		var search = request.params.search;

		// For now just search all recipes
		Recipe.find({}, function(error, recipes){
			if(error) throw error;
			response.json(recipes);
		});

		// TODO make an actual search algorithm
	});
}