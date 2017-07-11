var React = require('react');

var Search = React.createClass({

	getInitialState: function(){
		return {
			searchTerm: ''
		}
	},

	componentDidUpdate: function(){
		console.log(this.props);
	},

	changeSearch: function(event){
		this.setState({ searchTerm: event.target.value });
	},

	sendSearch: function(event){
		this.props.setSearch(this.state.searchTerm);
	},

	render: function(){
		return (
			<div>
				<input value={this.state.searchTerm} onChange={this.changeSearch} />
				<a className="waves-effect waves-light btn" onClick={this.sendSearch}>Search</a>
			</div>
		)
	}
});

module.exports = Search;