var path = require('path');

module.exports = function(app){
	//Temporary route for testing until we get a main page
	app.get("/", function(req, res){
		res.render('home');
		//res.sendFile(path.join(__dirname, "../public/assets/index.html"));
	});

	app.get("/share", function(req, res){
		res.render('share');
		//res.sendFile(path.join(__dirname, "../public/assets/add.html"));
	});

	app.get("/request", function(req, res){
		res.render('request');
		//res.sendFile(path.join(__dirname, "../public/assets/giftreq.html"));
	});

	app.get("/login", function(req, res){
		res.render('login');
		//res.sendFile(path.join(__dirname, "../public/assets/login.html"));
	});

	app.get("/register", function(req, res){
		res.render('register');
		//res.sendFile(path.join(__dirname, "../public/assets/register.html"));
	});

	app.get("/profile", function(req, res){
		res.render('profile');
		//res.sendFile(path.join(__dirname, "../public/assets/profile.html"));
	});
};