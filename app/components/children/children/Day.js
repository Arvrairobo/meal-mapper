var React = require('react');

// Each of these is a column to be used in the calendar view
var Day = React.createClass({

	// Start with 0 for each macro
	getInitialState: function(){
		return ({
			totalCarbs: (0).toFixed(1),
			totalProtein: (0).toFixed(1),
			totalFat: (0).toFixed(1),
			totalCalories: 0
		})
	},

	// On update, recalculate macros
	componentWillReceiveProps: function(){
		var carbs = 0;
		var protein = 0;
		var fat = 0;

		for(var i = 0; i < this.props.meals.length; i++){
			carbs += this.props.meals[i].carbs;
			protein += this.props.meals[i].protein;
			fat += this.props.meals[i].fat;
		}

		var calories = Math.floor((carbs * 4) + (protein * 4) + (fat * 9))

		this.setState({
			totalCarbs: carbs.toFixed(1),
			totalProtein: protein.toFixed(1),
			totalFat: fat.toFixed(1),
			totalCalories: calories
		});

	},

	render: function(){
		return (
			<div className='day-col' onClick={ () => this.props.clickDay(this.props.dayNum) } >
				{/* When user clicks the column, run clickDay in parent component */}
				<p>{ this.props.day }</p>
				<hr/>

			{/* Load all recipes for the day and add to column */}
				{this.props.meals.map((recipe, i) => {
					return (
						<div key={i}>
							<p><a href={recipe.url} target='_blank'>{recipe.name}</a></p>
							<button>X</button>
						</div>
					)
				})}

				<hr/>
				<p className='small-text'>Carbs: {this.state.totalCarbs}g</p>
				<p className='small-text'>Protein: {this.state.totalProtein}g</p>
				<p className='small-text'>Fat: {this.state.totalFat}g</p>
				<p className='small-text'><strong>Calories: {this.state.totalCalories}</strong></p>

			</div>
		)
	}

});

module.exports = Day;