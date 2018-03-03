var db = require("../models");

module.exports = function(app){
	//Get route for getting a gift from the DB
	app.get('/api/gift/', function(req, res){
		db.Gift.findAll({})
		.then(function(dbGift){
			res.json(dbGift);
		});
	});

	//Post route for creating new gifts in the DB
	app.post('/api/gift/', function(req, res){
		console.log(req);

		db.Gift.create({
			gift: req.body.gift,
			age: req.body.age,
			gender: req.body.gender,
			hobbies: req.body.hobbies,
			likes: req.body.likes
		}).then(function(gift){
			res.json(gift);
		});
	});

	//Get route for returning a gift from DB
	app.get('/api/request/:priority/:value', function(req, res){
		db.Gift.findAll({
			where: {[req.params.priority]: req.params.value}
		}).then(function(gifts){
			res.json(gifts);
		});
	});
};

