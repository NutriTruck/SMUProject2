var db = require("../models");

module.exports = function(app){
	app.get('/api/gifts', function(req, res){
		db.Gift.findAll({})
		.then(function(dbGift){
			res.json(dbGift);
		});
	});
};

