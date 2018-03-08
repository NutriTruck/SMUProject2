var path = require('path');

module.exports = function(app){
	app.get("/", function(req, res){
		res.render('home');
	});

	app.get("/share", function(req, res){
		res.render('share');
	});

	app.get("/request", function(req, res){
		res.render('request');
	});

	app.get("/login", function(req, res){
		res.render('login');
	});

	app.get("/register", function(req, res){
		res.render('register');
	});

	app.get("/profile", function(req, res){
		res.render('profile');
	});
};