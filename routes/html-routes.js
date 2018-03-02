var path = require('path');

module.exports = function(app){
	//Temporary route for testing until we get a main page
	app.get("/", function(req, res){
		res.sendFile(path.join(__dirname, "../views/add.html"));
	});

	app.get("/add", function(req, res){
		res.sendFile(path.join(__dirname, "../views/add.html"));
	});

	app.get("/request", function(req, res){
		res.sendFile(path.join(__dirname, "../views/giftreq.html"));
	});

	app.get("/login", function(req, res){
		res.sendFile(path.join(__dirname, "../views/login.html"));
	});

	app.get("/register", function(req, res){
		res.sendFile(path.join(__dirname, "../views/register.html"));
	});
};