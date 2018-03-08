//Require bcrypt
var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User", {
		firstname: {
			type: DataTypes.STRING, 
			allowNull: false, 
			validate:{
				len: [1]
			} 
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false, 
			validate:{
				len: [1]
			} 
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false, 
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true, 
			validate:{
				isEmail: true
			} 
		}
	});

	//Method for comparing hashed password
	User.prototype.validPassword = function(password){
		return bcrypt.compareSync(password, this.password);
	};

	//Automatically hashes password before create
	User.hook("beforeCreate", function(user){
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
	});

	return User;
}