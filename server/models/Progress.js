const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');
const Projects = require('./Projects');

const Progress = sqlite.define('progress', {
	type: Sequelize.STRING,
	name: Sequelize.STRING,
	sequence: Sequelize.INTEGER,
	color: Sequelize.STRING,
	description: Sequelize.TEXT
});

Projects.hasMany(Progress);

Progress.sync();

module.exports = Progress;
