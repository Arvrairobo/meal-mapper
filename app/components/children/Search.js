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
			<div className='search-panel'>
				<p>Find a recipe</p>
				<input value={this.state.searchTerm} onChange={this.changeSearch} />
				<a className="waves-effect waves-light btn" onClick={this.sendSearch}>Search</a>

				<h5>Search Results</h5>

				<div id='search-scroll'>
					{this.props.searchResults.map((recipe, i) => {
						return (
							<div key={i} className='search-find'>
								<p>{recipe.name}</p>
								<p className='small-text'>Carbs: {recipe.carbs}g</p>
								<p className='small-text'>Protein: {recipe.protein}g</p>
								<p className='small-text'>Fat: {recipe.fat}g</p>

								<button onClick={this.addRecipe.bind(null, 0, i)} >S</button>
								<button onClick={this.addRecipe.bind(null, 1, i)} >M</button>
								<button onClick={this.addRecipe.bind(null, 2, i)} >T</button>
								<button onClick={this.addRecipe.bind(null, 3, i)} >W</button>
								<button onClick={this.addRecipe.bind(null, 4, i)} >T</button>
								<button onClick={this.addRecipe.bind(null, 5, i)} >F</button>
								<button onClick={this.addRecipe.bind(null, 6, i)} >S</button>
							</div>
						)
					})}
				</div>

			</div>
		)
	}
});

module.exports = Search;