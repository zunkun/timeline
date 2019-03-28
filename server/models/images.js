const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');
const Directory = require('./directory');

const Image = sqlite.define('images', {
	directory: Sequelize.STRING,
	fullpath: Sequelize.STRING,
	name: Sequelize.STRING,
	type: Sequelize.STRING,
	basename: Sequelize.STRING,
	desc: Sequelize.TEXT
});

Image.belongsTo(Directory);

module.exports = Image;
