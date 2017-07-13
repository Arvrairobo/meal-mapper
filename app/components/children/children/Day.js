var React = require('react');

var Day = React.createClass({

	render: function(){
		<div className='day-col'  onClick={this.clickDay.bind(null, 0)}>

			<p>{this.props.day}</p>
			

		</div>
	}

});

/*<hr/>
			{this.props.meals.map((recipe, i) => {
				return (
					<p key={i}>{recipe.name}</p>
				)
			})}*/

module.exports = Day;