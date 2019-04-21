const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');
const Progress = require('./Progress');

const Tasks = sqlite.define('tasks', {
	title: Sequelize.STRING,
	description: Sequelize.TEXT,
	sequence: Sequelize.INTEGER,
	color: Sequelize.STRING,
	userId: Sequelize.INTEGER
});

Progress.hasMany(Tasks);
Tasks.belongsTo(Progress);

Tasks.sync();
module.exports = Tasks;
