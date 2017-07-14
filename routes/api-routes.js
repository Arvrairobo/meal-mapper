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