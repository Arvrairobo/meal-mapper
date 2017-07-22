var passport = require('passport');
// Keys for Edamam API
const appId = '1d8fc3d8';
const appKey = '82b0696857a06bb20b6bc51dedc0360f';
const search = 'https://api.edamam.com/search';

// Set up and connect to database
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mealplanner', {
     useMongoClient: true,
});
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

// For scraping
var urlrequest = require('request');
var cheerio = require('cheerio');

module.exports = function(server){

		/* Handle Login POST */
	server.post('/login', passport.authenticate('login',
		{
				successRedirect: '/dashboard',
				failureRedirect: '/',
//				failureFlash : true
		})
	);

    /* Handle Registration POST */
    server.post('/signup', passport.authenticate('signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup',
//        failureFlash : true
    }));

    // Route for getting some data about our user to be used client side
     server.get("/api/user_data", function(req, res) {
       if (!req.user) {
         // The user is not logged in, send back an empty object
         res.json({});
       }
       else {
        // Otherwise send back the user's email, first name, and id
           res.send(req.user)

       }
     });

// TODO- Post route to update user info
    server.post("/api/user_data", function(req, res) {
        User.findOneAndUpdate({"_id": req.user.id},
            {
            height: req.body.height,
            startWeight: req.body.startWeight,
            targetWeight: req.body.targetWeight,
            currentWeight: req.body.currentWeight,
            age: req.body.age,
            gender: req.body.gender,
            activityLevel: req.body.activityLevel,
            rateOfChange: req.body.rateOfChange,
            }
        ).exec(function(err, doc) {
             // Log any errors
             if (err) {
               console.log(err);
             }
             else {
               // Or send the document to the browser
               res.send(doc);
             }
           });
    })

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

		var arr = { meals: [[],[],[],[],[],[],[]] };

		Mealplan.create({startDate: date, mealplan: arr}, function(error, mealplan){
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
		Mealplan.findOne({ _id: request.params.id })
			.populate({
				path: 'meals',
				model: 'Recipe'
			}).exec(function(error, mealplan){
			if(error) throw error;

			response.json(mealplan);
		});
	});

	server.get('/api/shoppinglist/:userId', function(request, response){
		// First get the user ID
		User.findOne({ _id: request.params.userId }).populate('mealplans').exec(function(error, user){
			if(error) throw error;
			
			// Get latest meal plan ID
			var planId = user.mealplans[user.mealplans.length - 1]._id;

			// Get recipes for that meal plan
			Mealplan.findOne({ _id: planId })
				.populate({
					path: 'meals',
					model: 'Recipe'
				}).exec(function(error, mealplan){
				if(error) throw error;

				var shoppingList = [];
				// Go through each meal and add ingredients to list

				for(var i = 0; i < 7; i++){
					if(mealplan.meals[i].length){
						for(var j = 0; j < mealplan.meals[i].length; j++){
							for(k = 0; k < mealplan.meals[i][j].ingredients.length; k++){
								shoppingList.push(mealplan.meals[i][j].ingredients[k].ingredient);
							}
						}
					}
				}

				var minList = [];
				var minAmount = [];
				for(var i = 0; i < shoppingList.length; i++){
					var index = minList.indexOf(shoppingList[i]);
					if(index === -1){
						minList.push(shoppingList[i]);
						minAmount.push(1);
					} else {
						minAmount[index]++;
					}
				}

				var finalList = [];
				for(var i = 0; i < minList.length; i++){
					finalList[i] = {
						ingredient: minList[i],
						amount: minAmount[i]
					}
				}

				response.json(finalList);
			});
		});
	});

	server.put('/api/mealplan/:id', function(request, response){
		var arr = { meals: [[],[],[],[],[],[],[]] }
		var data = request.body;
		var planId = request.params.id;

		for(var i = 0; i < 7; i ++){
			key = i.toString();
			if(key in data){
				data[key].map(function(id){
					arr.meals[i].push(id);
				})
			}
		}

		Mealplan.findOneAndUpdate({_id: planId}, {$set: {meals: arr.meals}}, function(error, mealplan){
			if(error) throw error;

			response.json(mealplan);
		})
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

	// Scrape recipe from Allrecipes.com
	server.post('/api/scrape/', function(request, response){
		var url = request.body.url;
		urlrequest(url, function(error, response, html){
			var $ = cheerio.load(html);

			// Get recipe title
			var recipeName = $('h1.recipe-summary__h1').text();
			// var recipeImage = ???
			var recipeCreator = 'Allrecipes.com';
			var recipeServings = parseInt($('#servings').attr('data-original'));

			// Nutrients
			var recipeCarbs = parseFloat($('[itemProp=carbohydrateContent]').children().first().text());
			var recipeProtein = parseFloat($('[itemProp=proteinContent]').children().first().text());
			var recipeFat = parseFloat($('[itemProp=fatContent]').children().first().text());
			var recipeCalories = parseInt($('[itemProp=calories]').children().first().text());

			// Create ingredients list
			var ingredients = [];
			$('.recipe-ingred_txt').each(function(i, element){
				var ingd = $(this).text();
				if(ingd != '' && ingd != 'Add all ingredients to list'){
					ingredients.push(ingd);
				}
			});

			console.log(recipeName);
			console.log(ingredients);
			console.log('servings: ' + recipeServings);
			console.log('protein: ' + recipeProtein);
		});
		response.end();
	});
}