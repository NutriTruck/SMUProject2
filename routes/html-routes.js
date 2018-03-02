var path = require('path');

module.exports = function(app){
	//Temporary route for testing until we get a main page
	app.get("/", function(req, res){
		res.sendFile(path.join(__dirname, "../views/add.html"));
	});
};