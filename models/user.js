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
			validate:{
				len: [1]
			} 
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false, 
			validate:{
				len: [1]
			} 
		}
	});
	return User;
}