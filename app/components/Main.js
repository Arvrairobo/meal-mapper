// Include React and DOM for dragging
var React = require("react");

// Include sub-components
var Planner = require("./children/Planner");
var Search = require("./children/Search");

// Include helper functions
var helpers = require('../utils/helpers.js');
var moment = require('moment');

var Main = React.createClass({

	getInitialState: function(){
		return {
			searchTerm: '',
			searchResults: [],
			// this.state plan will hold all meal data (initialize empty) / database only holds IDs then populates
			mealPlan: { meals: [[],[],[],[],[],[],[]] },
			planId: '',
			update: false
		}
	},

	componentDidMount: function(){
		// Retrieve user ID from local storage
		var userId = localStorage.id;

		// Get user data from database
		helpers.getUserInfo(userId).then(function(user){
			// Get data for meal plans
			var userPlans = user.data.mealplans;
			
			// Check if there are meal plans stored
			if(userPlans.length > 0){
				// If there are plans, get the most recent one populated from database
				var lastMealPlan = userPlans[userPlans.length - 1];
				var lastDate = moment(lastMealPlan.startDate);
				var currentDate = moment();

				var duration = moment.duration(currentDate.diff(lastDate));
				var days = duration.asDays();

				// If more than a week has passed, create new plan starting on most recent Sunday
				if(days > 7){
					this.createEmptyPlan(userId);
				} else {
					// Otherwise, get recipes for plan and save
					// Fill in blank indexes if need be so they render correctly
					helpers.getMealPlan(lastMealPlan._id).then(function(mealplan){
						console.log(mealplan);
					});

					for(var i = 0; i < 7; i++){
						if(!lastMealPlan.meals[i]){
							lastMealPlan.meals[i] = [];
						}
					}

					this.setState({
						mealPlan: {meals: lastMealPlan.meals },
						planId: lastMealPlan._id
					});
				}

			} else {
				this.createEmptyPlan(userId);
			}
		}.bind(this));
	},

	componentDidUpdate: function(prevProps, prevState){
		// Check if search term changes - if so, run search
		if(prevState.searchTerm != this.state.searchTerm){
			helpers.searchRecipes(this.state.searchTerm).then(function(recipes){
				this.setState({ searchResults: recipes.data });
			}.bind(this));
		}

		// Only update database if recipe is added or removed from week
		if(this.state.update){
			this.setState({ update: false });
			this.saveMealPlan();
		}
	},

	setSearch: function(newSearch){
		this.setState({ searchTerm: newSearch });
	},

	// Adds a specific recipe to a specific day
	addToMealPlan: function(day, recipe){
		var newPlan = this.state.mealPlan;

		// Push the selected the selected recipe in state to the day clicked
		newPlan.meals[day].push(recipe);
		this.setState({ mealPlan: newPlan, update: true });
	},

	// Day (0-6) and recipe number (0-n)
	removeFromMealPlan: function(day, recipe){
		var newPlan = this.state.mealPlan;

		// Pop the selected the selected recipe in state to the day clicked
		newPlan.meals[day].splice(recipe, 1);
		this.setState({ mealPlan: newPlan, update: true });
	},

	// Create a new 7 day meal plan on a user id
	createEmptyPlan: function(userId){
		// Start by getting today's day of week (i.e. monday = 1)
		var days = moment().format('e');
		// Get most recent past Sunday by subtracting number of days
		var startDate = moment().subtract(days, 'days');
		startDate.second(0);
		startDate.minute(0);
		startDate.hour(0);
		startDate.format('x');

		// Save empty meal plan with startDate (also saves to user id)
		helpers.createEmptyMealPlan(startDate, userId);
	},

	// Every time meal plan is modified, update database
	saveMealPlan: function(){
		// Create temporary 2D array with just meal IDs
		var tempPlan = [[],[],[],[],[],[],[]];

		for(var i = 0; i < 6; i++){
			if(this.state.mealPlan.meals[i].length){
				for(var j = 0; j < this.state.mealPlan.meals[i].length; j++){
					tempPlan[i].push(this.state.mealPlan.meals[i][j]._id);
				}
			}
		}
		
		helpers.saveMealPlan(tempPlan, this.state.planId);
	},

	render: function() {
		return (
			<div>
				<nav>
					<div className='nav-wrapper'>
						<a href="/" className="brand-logo">Meal Planner</a>
						<ul id='nav-mobile' className='right'>
							<li><a href='/dashboard'>My Dashboard</a></li>
							<li><a href='#'>Meal Plan</a></li>
							<li><a href='/'>Log Out</a></li>
						</ul>
					</div>
				</nav>
				
				<div className='row'>
					<div className='col s9'>
						<Planner mealPlan={this.state.mealPlan} removeFromMealPlan={this.removeFromMealPlan} />
					</div>

					<div className='col s3'>
						<Search setSearch={this.setSearch} searchResults={this.state.searchResults}
							addToMealPlan={this.addToMealPlan}/>
					</div>
				</div>
			</div>
		)
	}
});

// Export the component
module.exports = Main;
