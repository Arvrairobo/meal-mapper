// Include React
var React = require("react");

// Include sub-components
var Planner = require("./children/Planner");
var Search = require("./children/Search");

var Main = React.createClass({
	render: function() {
		return (
			
			<div className='row'>
				<div className='col s9' id='meal-plan'>
					<Planner />
				</div>

				<div className='col s3' id='recipe-search'>
					<Search />
				</div>
			</div>
		)
	}
});

// Export the component
module.exports = Main;
