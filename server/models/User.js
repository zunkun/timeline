const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');
const { stringHash } = require('../util');

const User = sqlite.define('users', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	phone: Sequelize.STRING,
	age: Sequelize.INTEGER,
	gender: Sequelize.STRING,
	role: {
		type: Sequelize.INTEGER,
		defaultValue: 0 // 0-普通用户 1-管理员
	}
});

User.sync().then(() => {
	User.findOne({
		where: {
			username: 'admin'
		}
	}).then(user => {
		if (user) {
			return;
		}
		let password = stringHash('abcd1234');
		// stringHash(user.password);
		console.log({ password });
		User.create({ username: 'admin', password, role: 1 });
	});
});

module.exports = User;
