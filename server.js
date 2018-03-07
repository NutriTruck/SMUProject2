var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 8000;

var db = require("./models");

//Set up bodyparser boilerplate
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

//Set static folder
app.use(express.static("./public"));

//Set up handlebars views
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Set up routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

//Sync models and start listening to server
db.sequelize.sync({force: true}).then(function(){
	app.listen(PORT, function(){
		console.log("Listening on port " + PORT);
	});
});