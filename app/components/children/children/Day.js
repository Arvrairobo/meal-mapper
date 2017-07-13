var React = require('react');

var Day = React.createClass({

	render: function(){
		return (

		<div className='day-col' onClick={() => this.props.clickDay(this.props.dayNum)} >
			<p>{ this.props.day }</p>
			<hr/>

			{this.props.meals.map((recipe, i) => {
				return (
					<p key={i}>{recipe.name}</p>
				)
			})}

		</div>

		)
	}

});

/*<hr/>
{this.props.meals.map((recipe, i) => {
	return (
		<p key={i}>{recipe.name}</p>
	)
})}*/

module.exports = Day;