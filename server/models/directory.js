const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');

const Directory = sqlite.define('directory', {
	dir: Sequelize.STRING,
	name: Sequelize.STRING,
	desc: Sequelize.TEXT
});

module.exports = Directory;
