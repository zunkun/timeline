const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');

const Schedule = sqlite.define('schedules', {
	year: Sequelize.STRING,
	month: Sequelize.STRING,
	day: Sequelize.STRING,
	fullday: Sequelize.STRING,
	status: Sequelize.INTEGER, // 0 未扫描 1-扫描成功
	startTime: Sequelize.DATE,
	endTime: Sequelize.DATE
});

Schedule.sync();
module.exports = Schedule;
