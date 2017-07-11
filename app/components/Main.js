// Include React
var React = require("react");

// Include sub-components
var Planner = require("./children/Planner");
var Search = require("./children/Search");

var Main = React.createClass({

	getInitialState: function(){
		return {
			searchTerm: ''
		}
	},

	setSearch: function(newSearch){
		this.setState({ searchTerm: newSearch });
		console.log('new search: ' + this.state.searchTerm);
	},

	render: function() {
		return (
			<div>
				<nav>
					<div className='nav-wrapper'>
						<a href="#" className="brand-logo">Meal Planner</a>
						<ul id='nav-mobile' className='right hide-on-med-and-down'>
							<li><a href='#'>My Dashboard</a></li>
							<li><a href='#'>Meal Plan</a></li>
							<li><a href='#'>Log Out</a></li>
						</ul>
					</div>
				</nav>
				
				<div className='row'>
					<div className='col s9' id='meal-plan'>
						<Planner />
					</div>

					<div className='col s3' id='recipe-search'>
						<Search setSearch={this.setSearch} />
					</div>
				</div>
			</div>
		)
	}
});

// Export the component
module.exports = Main;
