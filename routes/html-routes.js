var path = require('path');

module.exports = function(app){
	//Temporary route for testing until we get a main page
	app.get("/", function(req, res){
		res.sendFile(path.join(__dirname, "../public/assets/index.html"));
	});

	app.get("/add", function(req, res){
		res.sendFile(path.join(__dirname, "../public/assets/add.html"));
	});

	app.get("/request", function(req, res){
		res.sendFile(path.join(__dirname, "../public/assets/giftreq.html"));
	});

	app.get("/login", function(req, res){
		res.sendFile(path.join(__dirname, "../public/assets/login.html"));
	});

	app.get("/register", function(req, res){
		res.sendFile(path.join(__dirname, "../public/assets/register.html"));
	});

	app.get("/options", function(req, res){
		res.sendFile(path.join(__dirname, "../public/assets/options.html"));
	});

	app.get("/profile", function(req, res){
		res.sendFile(path.join(__dirname, "../public/assets/profile.html"));
	});
};