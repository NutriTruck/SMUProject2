module.exports = function(sequelize, DataTypes) {
	var Gift = sequelize.define("Gift", {
		gift: {
			type: DataTypes.STRING
		},
		gender: {
			type: DataTypes.STRING
		},
		age: {
			type: DataTypes.INTEGER
		},
		hobbies: {
			type: DataTypes.STRING,
			allowNull: true,
			get: function(){
				return this.getDataValue('hobbies').split(';');
			},
			set: function(val){
				this.setDataValue('hobbies', val.join(';'));
			}
		},
		likes: {
			type: DataTypes.STRING,
			allowNull: true,
			get: function(){
				return this.getDataValue('likes').split(';');
			},
			set: function(val){
				this.setDataValue('likes', val.join(';'));
			}
		}
	});
	return Gift;
};