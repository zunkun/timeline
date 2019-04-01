const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');

const ImageDate = sqlite.define('imagedates', {
	year: Sequelize.STRING,
	month: Sequelize.STRING,
	day: Sequelize.STRING,
	daystr: {
		type: Sequelize.STRING,
		unique: true
	},
	ctime: Sequelize.DATE
});

ImageDate.sync();
module.exports = ImageDate;
