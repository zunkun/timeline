const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');

const Directory = sqlite.define('directories', {
	dir: {
		type: Sequelize.STRING,
		unique: true
	},
	name: Sequelize.STRING,
	desc: Sequelize.TEXT
});

Directory.sync();
module.exports = Directory;
