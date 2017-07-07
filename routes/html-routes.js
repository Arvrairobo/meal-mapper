module.exports = function(server){
	server.get('/', function(request, response){
		response.send('Successful connect.');
	});
}