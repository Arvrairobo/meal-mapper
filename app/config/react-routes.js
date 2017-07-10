// Import dependencies
var React = require("react");
var router = require("react-router");

var Route = router.Route;
var Router = router.Router;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;

// Reference the high-level components
var Main = require("../components/Main");
var Dashboard = require("../components/children/Dashboard");
var Mealplan = require("../components/children/Mealplan");

// Export the Routes
module.exports = (

	// The high level component is the Router component
	<Router history={hashHistory}>
		<Route path="/" component={Main}>

			<Route path="dashboard" component={Dashboard} />
			<Route path="mealplan" component={Mealplan} />

			<IndexRoute component={Dashboard} />

		</Route>
	</Router>

);

/*
RESTRUCTURE TO:
MAIN
	-DASHBOARD
	-PLANNER
		(contains PLAN and SEARCH)
	-ADDRECIPE

*/