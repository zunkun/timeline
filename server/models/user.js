const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');

const User = sqlite.define('users', {
	phone: Sequelize.STRING,
	name: Sequelize.STRING,
	age: Sequelize.INTEGER,
	gender: Sequelize.STRING,
	email: Sequelize.STRING,
	address: Sequelize.STRING,
	desc: Sequelize.TEXT
});

User.sync().then(() => {
	return User.findOrCreate({
		name: 'admin'
	});
}).catch(error => console.log(error));

module.exports = User;
