var path = require('path');

var isAuth = require("../config/middleware/isAuth");

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
		if(req.user){
			res.render('profile');
		} else {
			res.render('login');
		}
	});

	app.get("/register", function(req, res){
		if(req.user){
			res.render('profile');
		} else {
			res.render('register');
		}
	});

	app.get("/profile", isAuth, function(req, res){
		res.render('profile');
	});
};