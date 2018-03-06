//Require db models
var db = require("../models");
const Op = db.Sequelize.Op;


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
			gender: req.body.gender.toLowerCase(),
			hobbies: req.body.hobbies,
			likes: req.body.likes
		}).then(function(gift){
			res.json(gift);
		});
	});

	//Get route for returning a gift from DB
	app.get('/api/request/:priority/:value', function(req, res){
		var priority = req.params.priority;
		var value = req.params.value.toLowerCase();
		console.log(priority);
		console.log(value);

		switch(priority){
			case 'age':
					//Finds all + or - 5 years of age
					db.Gift.findAll({
						where: {[priority]: {[Op.between]: [value-5, value+5]}}
					}).then(function(gifts){
						res.json(gifts);
					});
				break;
			case 'gender':
					//Finds all matching gender
					db.Gift.findAll({
						where: {[priority]: value}
					}).then(function(gifts){
						res.json(gifts);
					});
				break;
			case 'hobbies':
			case 'likes':
					//Finds all results with matching likes or hobbies
					var regex;
					value = value.split(',');
					regex = value.join('|');
					
					console.log(value);

					db.Gift.findAll({
						where: {[priority]: {[Op.regexp]: regex}}
					}).then(function(gifts){
						res.json(gifts);
					});
				break;
		}
	});
};

