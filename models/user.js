module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User", {
		username: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING
		}
	});
	return User;
}