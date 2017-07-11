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
		console.log(this.props.searchResults);
		return (
			<div>
				<p>Find a recipe</p>
				<input value={this.state.searchTerm} onChange={this.changeSearch} />
				<a className="waves-effect waves-light btn" onClick={this.sendSearch}>Search</a>

				<p>Search Results</p>
				

			</div>
		)
	}
});

module.exports = Search;