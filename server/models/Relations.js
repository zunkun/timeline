const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');

const Relations = sqlite.define('relations', {
	name: Sequelize.STRING,
	gender: Sequelize.STRING,
	relation: Sequelize.STRING,
	sequelence: Sequelize.INTEGER,
	color: Sequelize.STRING,
	timestamp: Sequelize.STRING,
	avatars: Sequelize.TEXT
});

Relations.sync();
module.exports = Relations;
