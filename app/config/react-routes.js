// Import dependencies
var React = require("react");
var router = require("react-router");

var Route = router.Route;
var Router = router.Router;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;

// Reference the high-level components
var Main = require("../components/Main");
var Planner = require("../components/children/Planner");
var Search = require("../components/children/Search");

// Export the Routes
module.exports = (

	// The high level component is the Router component
	<Router history={hashHistory}>
		<Route path="/" component={Main}>

			{/* If user selects Info or Chat show the appropriate component */}
			<Route path="info" component={Info} />
			<Route path="chat" component={Chat} />

			{/* If user selects any other path... we get the Info Route */}
			<IndexRoute component={Info} />

		</Route>
	</Router>

);

/*
RESTRUCTURE TO:
MAIN
	-HOME
	-DASHBOARD
	-PLANNER
		(contains PLAN and SEARCH)
	-ADDRECIPE

*/