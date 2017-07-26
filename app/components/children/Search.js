var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Search = React.createClass({

	getInitialState: function(){

		var randList = ['lobster', 'cupcakes', 'lunch', 'easy meal', 'Italian', 'steak', 'grill', 'christmas',
				'spicy', 'Mexican', 'Thai', 'pepper', 'snack', 'cheese', 'chicken', 'salmon', 'bread']
		var searchDefault = randList[Math.floor(Math.random() * randList.length)];
		
		return {
			searchTerm: '',
			addRecipe: {},
			searchDefault: searchDefault,
			filter: 'all'
		}
	},

	componentDidUpdate: function(){
		console.log(this.state.filter);
	},

	// As user types in search box this will update
	changeSearch: function(event){
		this.setState({ searchTerm: event.target.value });
	},

	changeFilter: function(event){
		console.log('change filter');
		this.setState({ filter: event.target.value });
	},

	// When search button is pressed, send to parent component
	sendSearch: function(event){
		this.props.setSearch(this.state.searchTerm);
	},

	// When click button to add recipe, add to parent component
	addRecipe: function(day, recipeNum){
		this.props.addToMealPlan(day, this.props.searchResults[recipeNum]);
	},

	render: function(){

		return (

			<div id='search-bar'>
				<div id='pull-search' className='center-align valign-wrapper'>
					<a href='#'><i className="material-icons no-select">search</i></a></div>

				<div className='row'>
					<div className='col sm12 center-align'>
						<h3>Search for Recipes</h3>
						
						{/*Search bar and button */}
						<input value={this.state.searchTerm} onChange={this.changeSearch} className='center-align'
							id='search-term' placeholder={this.state.searchDefault}/>
						<a className="waves-effect waves-light btn blue lighten-1" onClick={this.sendSearch}>Search</a>

						<form>
							<p>
							<input type="checkbox" id="breakfast" />
							<label htmlFor="breakfast">Breakfast</label>
							<br/>
							<input type="checkbox" id="lunch" />
							<label htmlFor="lunch">Lunch</label>
							<br/>
							<input type="checkbox" id="dinner" />
							<label htmlFor="dinner">Dinner</label>
							<br/>
							<input type="checkbox" id="snack" />
							<label htmlFor="snack">Snack</label>
							</p>
						</form>
					</div>
				</div>

				<div className='row'>
					<div className='col sm12'>
						<div className='search-results' >

							<ReactCSSTransitionGroup
							transitionName="popout"
							transitionEnterTimeout={250}
							transitionLeaveTimeout={250}>
							
							{this.props.searchResults.map((recipe, i) => {
								return (
									<div key={i} className='search-result'>
										<div className='search-recipe-name'>
											<h3 ><a href={recipe.url} target='_blank'>{recipe.name}</a></h3>
										</div>

										<p className='macro-text'>Carbs: {recipe.carbs}g | Protein: {recipe.protein}g | Fat: {recipe.fat}g | Calories: {recipe.calories}</p>
										<p className='small-text'>Meal: {recipe.meal}</p>
										<p className='small-text'>Tags: 

										{recipe.tags.map((tag, i) => {
											return (
												<span key={i}> {tag}, </span>
											)
										})} </p>

										<div className='center-align'>

											<table className='add-day'>
												<tbody>
												<tr>
													<td><i className="material-icons no-select">add</i></td>
													<td><a href='#' onClick={this.addRecipe.bind(null, 0, i)} >S</a></td>
													<td><a href='#' onClick={this.addRecipe.bind(null, 1, i)} >M</a></td>
													<td><a href='#' onClick={this.addRecipe.bind(null, 2, i)} >T</a></td>
													<td><a href='#' onClick={this.addRecipe.bind(null, 3, i)} >W</a></td>
													<td><a href='#' onClick={this.addRecipe.bind(null, 4, i)} >T</a></td>
													<td><a href='#' onClick={this.addRecipe.bind(null, 5, i)} >F</a></td>
													<td><a href='#' onClick={this.addRecipe.bind(null, 6, i)} >S</a></td>
												</tr>
												</tbody>
											</table>
										
										</div>
									</div>
								)
							})}
							</ReactCSSTransitionGroup>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Search;