var passport = require('passport');
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

var moment = require('moment');

module.exports = function(server){

		/* Handle Login POST */
	server.post('/login', passport.authenticate('login',
		{
				successRedirect: '/dashboard',
				failureRedirect: '/',
				failureFlash : true
		})
	);

	/* Handle Registration POST */
	server.post('/signup', passport.authenticate('signup', {
		successRedirect: '/dashboard',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	// Route for getting some data about our user to be used client side
	server.get("/api/user_data", function(req, res) {
	 if (!req.user) {
		 // The user is not logged in, send back an empty object
		 res.json({});
	 }
	 else {
		// Otherwise send back the user's email, first name, and id
		 res.json({
			 id: req.user.id,
			 email: req.user.email,
			 firstName: req.user.firstName
		 });
	 }
	});

	// Create a new recipe
	server.post('/api/recipe', function(request, response){
		Recipe.create(request.body, function(error, recipe){
			if(error) throw error;
			response.json(recipe);
		});
	});

	// Create a new meal plan
	server.post('/api/mealplan/:userId/:date', function(request, response){
		var date = parseInt(request.params.date);
		var userId = request.params.userId;
		
		Mealplan.create({startDate: date}, function(error, mealplan){
			if(error) throw error;
			
			User.findOneAndUpdate({_id: userId}, {$push: {'mealplans': mealplan._id} },
			{new: true}, function(error, article){
				response.json(mealplan);
			});
		});
	});

	// Get user info (populate with meal plans)
	server.get('/api/user/:id', function(request, response){
		User.findOne({ _id: request.params.id }).populate('mealplans').exec(function(error, user){
			if(error) throw error;
			response.json(user);
		});
	});

	// Get meal plan info (populate with recipes)
	server.get('/api/mealplan/:id', function(request, response){
		Mealplan.findOne({ _id: request.params.id }).populate('meals').exec(function(error, mealplan){
			if(error) throw error;
			response.json(mealplan);
		});
	})

	// Search for all recipes based on search term
	server.get('/api/recipes/:search', function(request, response){
		var search = request.params.search;
		// TODO add search algorithm that only returns results based on search term
		// For now just search all recipes
		Recipe.find({}, function(error, recipes){
			if(error) throw error;
			response.json(recipes);
		});

		// TODO make an actual search algorithm
	});
}