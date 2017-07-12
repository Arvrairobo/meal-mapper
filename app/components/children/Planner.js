var React = require('react');

var Planner = React.createClass({
	render: function(){
		return (
			<div>
				<div className='day-col'>
					<p>Sunday</p>
				</div>

				<div className='day-col'>
					<p>Monday</p>
				</div>

				<div className='day-col'>
					<p>Tuesday</p>
					<div>
						<p>A test</p>
					</div>
				</div>

				<div className='day-col'>
					<p>Wednesday</p>
				</div>

				<div className='day-col'>
					<p>Thursday</p>
				</div>

				<div className='day-col'>
					<p>Friday</p>
				</div>

				<div className='day-col'>
					<p>Saturday</p>
				</div>
			</div>
		)
	}
});

module.exports = Planner;