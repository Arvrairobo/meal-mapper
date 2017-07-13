var React = require('react');

// Include Day sub component
var Day = require('./children/Day');

var Planner = React.createClass({

	clickDay: function(day){
		// Runs when you click a "day" column
		// Check first if clickAdd is true - signals that a recipe from search was clicked first
		if(this.props.clickAdd){
			// Add the current recipe to the meal plan day, then reset
			this.props.addToMealPlan(day);
		}
	},

	render: function(){
		console.log(this.props.mealPlan.meals);
		return (
			
			<div>
				<div className='day-col'  onClick={this.clickDay.bind(null, 0)}>
					<p>Sunday</p><hr/>

					{this.props.mealPlan.meals[0].map((recipe, i) => {
						return (
							<p key={i}>{recipe.name}</p>
						)
					})}

				</div>

			</div>
		)
	}
});

module.exports = Planner;