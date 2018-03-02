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
		interests: {
			type: DataTypes.STRING,
			allowNull: false,
			get function(){
				return this.getDataValue('interests').split(';');
			},
			set: function (val) {
				this.setDataValue('interests', val.join(';'));
			}
		},
	});
	return Gift;
};