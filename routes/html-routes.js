var path = require('path');

module.exports = function(server){

	server.get('/', function(request, response){
		response.sendFile(path.resolve(__dirname + "/../public/home.html"));
	});

	server.get('/recipe', function(request, response){
		response.sendFile(path.resolve(__dirname + "/../public/recipe.html"));
	});

	server.get('/:app?', function(request, response){
		var route = request.params.app;

		// Only send app if request is for dashboard or mealplan
		if(route === 'dashboard' || route === 'mealplan'){
			response.sendFile(path.resolve(__dirname + "/../public/app.html"));
		} else {
			response.sendStatus(404);
		}
	});
}