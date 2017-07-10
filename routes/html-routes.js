var path = require('path');

module.exports = function(server){
	server.get('/', function(request, response){
		response.send('Successful connect.');
	});

	server.get('/addrecipe', function(request, response){
		response.sendFile(path.resolve(__dirname + "/../public/addrecipe.html"));
	});
}