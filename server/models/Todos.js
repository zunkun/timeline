const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');

const Todos = sqlite.define('todos', {
	type: {
		type: Sequelize.INTEGER,
		defaultValue: 0 // 0-普通 1-重要
	},
	text: Sequelize.STRING,
	checked: Sequelize.BOOLEAN,
	sequence: Sequelize.INTEGER,
	description: Sequelize.TEXT,
	image: Sequelize.STRING,
	userId: Sequelize.INTEGER
});

Todos.sync();
module.exports = Todos;
