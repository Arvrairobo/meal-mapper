var React = require('react');

var Search = React.createClass({

	getInitialState: function(){
		return {
			searchTerm: 'chicken'
		}
	},

	changeSearch: function(event){
		console.log('change search');
		this.setState({ searchTerm: event.target.value });
	},

	sendSearch: function(event){
		console.log(this.state.searchTerm);
		this.props.setSearch(this.state.searchTerm);
	},

	render: function(){
		return (
			<div>
				<input value={this.state.searchTerm} type='text' onChange={this.changeSearch} />
				<a className="waves-effect waves-light btn" onClick={this.sendSearch}>Search</a>
			</div>
		)
	}
});

module.exports = Search;