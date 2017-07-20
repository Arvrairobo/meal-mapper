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

	// Called when delete button is clicked for a recipe
	removeRecipe: function(day, recipe){
		this.props.removeFromMealPlan(day, recipe);
	},

	render: function(){
		return (
			<div className='row'>
				<div className='col s12'>
					<div className='app-wrapper'>
						
						{/* Buttons for controlling planner */}
						<div className='row'>
							<div className='col s12'>
								<div className='center-align'>
									<a className="waves-effect waves-light btn blue lighten-1">Previous Plans</a>
									<a className="waves-effect waves-light btn blue lighten-1">Clear</a>
									<a className="waves-effect waves-light btn blue lighten-1">Save & Start Over</a>
									<a className="waves-effect waves-light btn blue lighten-1">Feed Me</a>
									<a className="waves-effect waves-light btn blue lighten-1">Shopping List</a>
								</div>
							</div>
						</div>
						
						{/* Meal plan area */}
						<div className='row'>
							<div className='col s12'>
								<div id='calendar'>

									<Day className='day-column day-column-left' day='Sunday' dayNum={0} meals={this.props.mealPlan.meals[0]} clickDay={this.clickDay}
										removeRecipe={this.removeRecipe}/>
									<Day className='day-column' day='Monday' dayNum={1} meals={this.props.mealPlan.meals[1]} clickDay={this.clickDay}
										removeRecipe={this.removeRecipe} />
									<Day className='day-column' day='Tuesday' dayNum={2} meals={this.props.mealPlan.meals[2]} clickDay={this.clickDay}
										removeRecipe={this.removeRecipe} />
									<Day className='day-column' day='Wednesday' dayNum={3} meals={this.props.mealPlan.meals[3]} clickDay={this.clickDay}
										removeRecipe={this.removeRecipe} />
									<Day className='day-column' day='Thursday' dayNum={4} meals={this.props.mealPlan.meals[4]} clickDay={this.clickDay}
										removeRecipe={this.removeRecipe} />
									<Day className='day-column' day='Friday' dayNum={5} meals={this.props.mealPlan.meals[5]} clickDay={this.clickDay}
										removeRecipe={this.removeRecipe} />
									<Day className='day-column day-column-right' day='Saturday' dayNum={6} meals={this.props.mealPlan.meals[6]} clickDay={this.clickDay}
										removeRecipe={this.removeRecipe} />

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</

		)
	}
});

module.exports = Planner;