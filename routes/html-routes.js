var path = require('path');

module.exports = function(server){

	server.get('/', function(request, response){
		response.sendFile(path.resolve(__dirname + "/../public/home.html"));
	});

	server.get('/dashboard', function(request, response){
		response.sendFile(path.resolve(__dirname + "/../public/dashboard.html"));
	});

	server.get('/myplan', function(request, response){
		response.sendFile(path.resolve(__dirname + "/../public/app.html"));
	});

	// Admin use only for now
	server.get('/recipe', function(request, response){
		response.sendFile(path.resolve(__dirname + "/../public/recipe.html"));
	});
}