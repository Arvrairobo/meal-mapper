// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const expressSession = require('express-session');

// Create new Express server
var server = express();

// Set dynamic porting for development
var PORT = process.env.PORT || 3000;

// Set middleware functions
server.use(express.static('./public'));
server.use(cookieParser());
server.use(bodyParser.text());
server.use(bodyParser.json({type: 'application/vnd.api+json'}));
server.use(bodyParser.urlencoded({extended: true}));

// Configuring Passport

server.use(expressSession({secret: 'keyboard-cat', resave: true, saveUninitialized: true }));
server.use(passport.initialize());
server.use(passport.session());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

// Connect routes
require('./routes/html-routes.js')(server);
require('./routes/api-routes.js')(server);

//
//// catch 404 and forward to error handler
//server.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
//
//// error handler
//server.use(function(err, req, res, next) {
//  // set locals, only providing error in development
//  res.locals.message = err.message;
//  res.locals.error = req.server.get('env') === 'development' ? err : {};
//  res.locals.error = req.server.get('env') === 'development' ? err : {};
//
//  // render the error page
//  res.status(err.status || 500);
//  res.send('error');
//});

// Start server
server.listen(PORT, function(){
	console.log(`Server established successfully on port ${PORT}.`);
});
