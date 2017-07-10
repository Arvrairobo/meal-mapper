var path = require('path');

module.exports = function(server){

	server.get('/', function(request, response){
		response.sendFile(path.resolve(__dirname + "/../public/home.html"));
	});

	server.get('/addrecipe', function(request, response){
		response.sendFile(path.resolve(__dirname + "/../public/addrecipe.html"));
	});
}