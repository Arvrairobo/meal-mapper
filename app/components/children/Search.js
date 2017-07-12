var React = require('react');

var Search = React.createClass({

	getInitialState: function(){
		return {
			searchTerm: ''
		}
	},

	changeSearch: function(event){
		this.setState({ searchTerm: event.target.value });
	},

	sendSearch: function(event){
		this.props.setSearch(this.state.searchTerm);
	},

	render: function(){
		return (
			<div class='search-panel'>
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
							</div>
						)
					})}
				</div>

			</div>
		)
	}
});

module.exports = Search;