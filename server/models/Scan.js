const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');

const Scan = sqlite.define('scans', {
	tag: Sequelize.STRING,
	hash: Sequelize.TEXT,
	status: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
});

Scan.sync();
module.exports = Scan;
