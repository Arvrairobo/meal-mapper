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
		this.loadNutrientData();
	},

	loadNutrientData: function(){
		var carbs = 0;
		var protein = 0;
		var fat = 0;

		for(var i = 0; i < this.props.meals.length; i++){
			carbs += this.props.meals[i].carbs;
			protein += this.props.meals[i].protein;
			fat += this.props.meals[i].fat;
		}

		var calories = Math.floor((carbs * 4) + (protein * 4) + (fat * 9));

		this.setState({
			totalCarbs: carbs.toFixed(1),
			totalProtein: protein.toFixed(1),
			totalFat: fat.toFixed(1),
			totalCalories: calories
		});
	},

	render: function(){

		// Calculate macros
		var carbs = 0;
		var protein = 0;
		var fat = 0;

		for(var i = 0; i < this.props.meals.length; i++){
			carbs += this.props.meals[i].carbs;
			protein += this.props.meals[i].protein;
			fat += this.props.meals[i].fat;
		}

		carbs = carbs.toFixed(1);
		protein = protein.toFixed(1);
		fat = fat.toFixed(1);
		var calories = Math.floor((carbs * 4) + (protein * 4) + (fat * 9));

		return (
			<div className='day-column' onClick={ () => this.props.clickDay(this.props.dayNum) } >
				<h3 className='day-name center-align'>{ this.props.day }</h3>

				<div className="divider"></div>
					<div className='center-align'>
						<div>

							{/* Table showing macros */}
							<table>
								<thead>
								<tr>
									<td></td>
									<th>Total</th>
									<th>Targ.</th>
									<th>Avail.</th>
								</tr>
								</thead>

								<tbody>
								<tr>
									<td><strong>C |</strong></td>
									<td>{carbs}g</td>
									<td>10.0g</td>
									<td>10.0g</td>
								</tr>
								<tr>
									<td><strong>P |</strong></td>
									<td>{protein}g</td>
									<td>10.0g</td>
									<td>10.0g</td>
								</tr>
								<tr>
									<td><strong>F |</strong></td>
									<td>{fat}g</td>
									<td>10.0g</td>
									<td>10.0g</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div className='recipe-area'>
						{/* Cylce through and create a listing for each recipe in a day */}
						{this.props.meals.map((recipe, i) => {
							return (
								<div className='day-recipe' key={i}>
									<div className='row'>
										<h3 className='recipe-name'><a href={recipe.url} target='_blank'>{recipe.name}</a></h3>
										<h3 className='btn-delete' onClick={ this.props.removeRecipe.bind(null, this.props.dayNum, i) }><i className="material-icons delete-meal">delete</i></h3>
									</div>

									<p>Added by {recipe.creator}</p>
									<p className='macro-text'>Carbs: {recipe.carbs}g | Protein: {recipe.protein}g | Fat: {recipe.fat}g | Calories: 152</p>
								</div>
							)
						})}
					</div>
				</div>
							
		)
	}

});

module.exports = Day;