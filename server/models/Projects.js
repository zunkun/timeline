const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');

const Projects = sqlite.define('projects', {
	name: Sequelize.STRING,
	type: Sequelize.STRING,
	color: Sequelize.STRING,
	enable: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	description: Sequelize.TEXT
});

Projects.sync();
module.exports = Projects;
