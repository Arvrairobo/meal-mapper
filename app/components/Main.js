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
			mealPlan: {}
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

		// If no meals have been set, create base array
		if(!newPlan.meals){
			newPlan.meals = [[],[],[],[],[],[],[]]
		}

		newPlan.meals[day].push(this.state.addRecipe);
		console.log(newPlan);
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
							addToMealPlan={this.addToMealPlan} mealPlan={this.state.mealPlan}/>
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
