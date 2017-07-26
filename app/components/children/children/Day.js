var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import {Pie} from 'react-chartjs-2';

// Each of these is a column to be used in the calendar view
var Day = React.createClass({

	// Start with 0 for each macro
	getInitialState: function(){
		return ({
			totalCarbs: (0).toFixed(1),
			totalProtein: (0).toFixed(1),
			totalFat: (0).toFixed(1),
			totalCalories: 0,
			userData: {}
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
		var calories = 0;

		for(var i = 0; i < this.props.meals.length; i++){
			carbs += this.props.meals[i].carbs;
			protein += this.props.meals[i].protein;
			fat += this.props.meals[i].fat;
			calories += this.props.meals[i].calories;
		}

		carbs = carbs.toFixed(1);
		protein = protein.toFixed(1);
		fat = fat.toFixed(1);
		calories = Math.floor(calories);

		var maxCalories = 2000;
		var caloriePercent = ((calories/maxCalories)*100).toFixed(1);

		// Set all to 1 for equality if nothing for the day
		if(carbs === 0 && protein === 0 && fat === 0){
			carbs = 1;
			protein = 1;
			fat = 1;
		}

		var pieData = {
			datasets: [{
				data: [carbs, protein, fat],
				backgroundColor: ['rgba(67, 101, 224, .5)', 'rgba(172, 67, 224, .5)', 'rgba(45, 237, 89, .5)'],
				hoverBackgroundColor: ['rgba(67, 101, 224, .9)', 'rgba(172, 67, 224, .9)', 'rgba(45, 237, 89, .9)'],
				options: {
					legend: {
						display: false
					}
				}
			}],
			labels: ['Carbs','Protein','Fat']
		}

		return (
			<div className='day-column' onClick={ () => this.props.clickDay(this.props.dayNum) } >
				<div className='day-name center-align'>
					<h3>{ this.props.day }</h3>
				</div>

				<div className="divider"></div>
					<div className='center-align'>

							<Pie data={pieData} />
							<p>Daily Calories: {calories}/{maxCalories} ({caloriePercent}%)</p>
					</div>

					<div className='recipe-area'>
					<ReactCSSTransitionGroup
						transitionName="popout"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={250}
						transitionLeave={true} >

							{/* Cylce through and create a listing for each recipe in a day */}
							{this.props.meals.map((recipe, i) => {
								return (
									<div className='day-recipe wobble' key={i} 
										style={{backgroundImage: 'url(' + recipe.image + ')', backgroundSize: 'cover'}}>

										<div className='day-recipe-tl'>
											<h3 className='recipe-name'><a href={recipe.url} target='_blank'>{recipe.name}</a></h3>
										</div>

										<div className='day-recipe-tr'>
											<a href='#' className='btn-delete'><p className='btn-delete' onClick={ this.props.removeRecipe.bind(null, this.props.dayNum, i) }>
												<i className="material-icons delete-meal">delete</i></p></a>
										</div>

										<div className='day-recipe-body'>
											<p>Recipe by {recipe.creator}</p>
											<p className='macro-text'>Carbs: {recipe.carbs}g | Protein: {recipe.protein}g | Fat: {recipe.fat}g | Calories: {recipe.calories}</p>
										</div>
									</div>
								)
							})}
					</ReactCSSTransitionGroup>
					</div>
				</div>
							
		)
	}

});

module.exports = Day;