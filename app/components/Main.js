// Include React and DOM for dragging
var React = require("react");

// Include sub-components
var Planner = require("./children/Planner");
var Search = require("./children/Search");

// Include helper functions
var helpers = require('../utils/helpers.js');

var Main = React.createClass({

	getInitialState: function(){
		return {
			searchTerm: '',
			searchResults: [],
			addRecipe: {},
			clickAdd: false,

			// this.state plan will hold all meal data (initialize empty) / database only holds IDs then populates
			mealPlan: { meals: [[],[],[],[],[],[],[]] }
		}
	},

	componentDidMount: function(){
		// Check for user meal plan and load into state
	},

	componentDidUpdate: function(prevProps, prevState){
		// Check if search term changes - if so, run search
		if(prevState.searchTerm != this.state.searchTerm){
			helpers.searchRecipes(this.state.searchTerm).then(function(recipes){
				this.setState({ searchResults: recipes.data });
			}.bind(this));
		}
	},

	setSearch: function(newSearch){
		this.setState({ searchTerm: newSearch });
	},

	setRecipe: function(newRecipe){
		// If there is a new recipe to add (i.e. not empty)
		if(newRecipe){
			this.setState({ addRecipe: newRecipe, clickAdd: true });
		}
	},

	addToMealPlan: function(day){
		var newPlan = this.state.mealPlan;

		// Push the selected the selected recipe in state to the day clicked
		newPlan.meals[day].push(this.state.addRecipe);
		this.setState({ mealPlan: newPlan, clickAdd: false });
	},

	// Day (0-6) and recipe number
	removeFromMealPlan: function(day, recipe){
		var newPlan = this.state.mealPlan;

		// Pop the selected the selected recipe in state to the day clicked
		newPlan.meals[day].splice(recipe, 1);
		this.setState({ mealPlan: newPlan });
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
						<Planner addRecipe={this.state.addRecipe} clickAdd={this.state.clickAdd}
							addToMealPlan={this.addToMealPlan} mealPlan={this.state.mealPlan}
							removeFromMealPlan={this.removeFromMealPlan} />
					</div>

					<div className='col s3'>
						<Search setSearch={this.setSearch} setRecipe={this.setRecipe} 
							searchResults={this.state.searchResults} />
					</div>
				</div>
			</div>
		)
	}
});

// Export the component
module.exports = Main;
