// Set up and connect to database
const mongoose = require('mongoose');

mongoose.Promise = Promise;
// mongoose.connect('mongodb://127.0.0.1:27017');
// var database = mongoose.connection();

database.on('error', function(error){
	console.log(`Error with database: ${error}.`);
});

database.once('open', function(){
	console.log('Database connection successful.')
});