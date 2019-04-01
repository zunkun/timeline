const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');

const Relations = sqlite.define('relations', {
	name: Sequelize.STRING,
	gender: Sequelize.STRING,
	relation: Sequelize.STRING,
	sequelence: Sequelize.INTEGER
});

Relations.sync();
module.exports = Relations;
