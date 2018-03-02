module.exports = function(sequelize, DataTypes){
	var User = sequlize.define("User", {
		username: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.EMAIL
		}
	});
	return User;
}