// Include React
var React = require("react");

var Main = React.createClass({
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
					</div>

					<div className='col s3' id='recipe-search'>
					</div>
				</div>
			</div>
		)
	}
});

// Export the component
module.exports = Main;
