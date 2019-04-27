const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');

const Events = sqlite.define('events', {
	title: {
		type: Sequelize.STRING,
		require: true
	},
	color: Sequelize.STRING,
	location: Sequelize.STRING,
	description: Sequelize.TEXT,
	start: Sequelize.DATE,
	end: Sequelize.DATE
});

Events.sync();
module.exports = Events;
