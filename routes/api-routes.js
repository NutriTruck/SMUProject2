//Require db models and passport
var db = require("../models");
var passport = require("../config/passport");
//Constant for sequelize operators
const Op = db.Sequelize.Op;


module.exports = function(app){
	//Post route for checking if user has valid credentials
	app.post("/api/login", passport.authenticate("local"), function(req, res){
		res.json("/profile");
	});

	//Post Route for registering a new user
	app.post("/api/register", function(req, res){
		db.User.create({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: req.body.password
		}).then(function(){
			res.redirect(307, "/api/login");
		}).catch(function(err){
			console.log(err);
			res.json(err);
		});
	});

	//Logout route
	app.get("/logout", function(req, res){
		req.session.destroy(function(err) {
     		req.logout();
     		res.redirect('/');
   		});
	});

	//User data route
	app.get("/api/user_data", function(req, res){
		if(!req.user){
			res.json({});
		}else{
			res.json({
				firstname: req.user.firstname,
				lastname: req.user.lastname,
				email: req.user.email,
				id: req.user.id
			});
		}
	});

	//Get route for getting a gift from the DB
	app.get('/api/gift/', function(req, res){
		db.Gift.findAll({})
		.then(function(dbGift){
			res.json(dbGift);
		});
	});

	//Post route for creating new gifts in the DB
	app.post('/api/gift/', function(req, res){
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

	//Get route for retrieving giftees
	app.get('/api/giftee/:id', function(req, res){
		db.Giftee.findAll({
			where: {userId: req.params.id}
		}).then(function(giftees){
			res.json(giftees);
		});
	})

	//Post route for creating a new giftees
	app.post('/api/giftee', function(req, res){
		db.Giftee.create({
			userId: req.body.userId,
			name: req.body.name,
			age: req.body.age,
			gender: req.body.gender,
			hobbies: req.body.hobbies,
			likes: req.body.likes
		}).then(function(giftee){
			res.json(giftee);
		});
	});

	app.delete('/api/giftee/:id', function(req, res){
		db.Giftee.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(data){
			res.json(data);
		});
	});

	//Get route for returning a gift from DB
	app.get('/api/request/:priority/:value', function(req, res){
		var priority = req.params.priority;
		var value = req.params.value.toLowerCase();

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

					db.Gift.findAll({
						where: {[priority]: {[Op.regexp]: regex}}
					}).then(function(gifts){
						res.json(gifts);
					});
				break;
		}
	});
};

