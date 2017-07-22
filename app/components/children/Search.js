var React = require('react');

var Search = React.createClass({

	getInitialState: function(){
		return {
			searchTerm: '',
			addRecipe: {}
		}
	},

	// As user types in search box this will update
	changeSearch: function(event){
		this.setState({ searchTerm: event.target.value });
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
				<div id='pull-search' className='center-align valign-wrapper'><i className="material-icons no-select">search</i></div>

				<div className='row'>
					<div className='col sm12 center-align'>
						<h3>Find Food For Me</h3>
						
						<input value={this.state.searchTerm} onChange={this.changeSearch} className='center-align' id='search-term' />
						<a className="waves-effect waves-light btn blue lighten-1" onClick={this.sendSearch}>Search</a>

					</div>
				</div>

				<div className='row'>
					<div className='col sm12'>
						<div className='search-results'>
							{this.props.searchResults.map((recipe, i) => {
								return (
									<div key={i} className='search-result'>
										<h3><a href={recipe.url} target='_blank'>{recipe.name}</a></h3>
										<p className='small-text'>Carbs: {recipe.carbs}g, Protein: {recipe.protein}g, Fat: {recipe.fat}g</p>
										<p className='small-text'>Calories {recipe.calories}g</p>
										<p className='small-text'>Meal: {recipe.meal}</p>
										<p className='small-text'>Tags: 

										{recipe.tags.map((tag, i) => {
											return (
												<span key={i}> {tag}, </span>
											)
										})} </p>

										<div className='center-align'>
											<p>
												<a href='#' onClick={this.addRecipe.bind(null, 0, i)} >S</a> |
												<a href='#' onClick={this.addRecipe.bind(null, 1, i)} >M</a> |
												<a href='#' onClick={this.addRecipe.bind(null, 2, i)} >T</a> |
												<a href='#' onClick={this.addRecipe.bind(null, 3, i)} >W</a> |
												<a href='#' onClick={this.addRecipe.bind(null, 4, i)} >T</a> |
												<a href='#' onClick={this.addRecipe.bind(null, 5, i)} >F</a> |
												<a href='#' onClick={this.addRecipe.bind(null, 6, i)} >S</a>
											</p>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Search;