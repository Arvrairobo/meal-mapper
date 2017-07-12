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
						<Planner />
					</div>

					<div className='col s3'>
						<Search setSearch={this.setSearch} searchResults={this.state.searchResults} />
					</div>
				</div>
			</div>
		)
	}
});

// Export the component
module.exports = Main;
