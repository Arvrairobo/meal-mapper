var React = require('react');

var Planner = React.createClass({

	clickDay: function(day){
		// Runs when you click a "day" column
		// Check first if clickAdd is true - signals that a recipe from search was clicked first
		if(this.props.clickAdd){
			// Add the current recipe to the meal plan day, then reset
			this.props.addToMealPlan(day);
		}
	},

	renderDay: function(day){
		var meals = this.props.mealPlan.meals[day];
	},

	render: function(){
		return (
			<div>
				<div className='day-col'  onClick={this.clickDay.bind(null, 0)}>
					<p>Sunday</p><hr/>
					<div className='meal-store'>
						{ this.renderDay(0) }
					</div>
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