var React = require('react');

var Planner = React.createClass({

	clickDay: function(day){
		if(this.props.clickAdd){
			// Add the current recipe to the meal plan day, then reset
			this.props.addToMealPlan(day);
		}
	},

	// TODO loop through meal plan every render and add meals

	render: function(){
		return (
			<div>
				<div className='day-col'  onClick={this.clickDay.bind(null, 0)}>
					<p>Sunday</p>
					<div className='meal-store'></div>
				</div>

				<div className='day-col'>
					<p>Monday</p>
				</div>

				<div className='day-col'>
					<p>Tuesday</p>
				</div>

				<div className='day-col'>
					<p>Wednesday</p>
				</div>

				<div className='day-col'>
					<p>Thursday</p>
				</div>

				<div className='day-col'>
					<p>Friday</p>
				</div>

				<div className='day-col'>
					<p>Saturday</p>
				</div>
			</div>
		)
	}
});

module.exports = Planner;