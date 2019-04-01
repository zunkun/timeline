const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');
const Directory = require('./Directory');
const ImageDate = require('./ImageDate');

const Image = sqlite.define('images', {
	// directory: Sequelize.STRING,
	fullpath: {
		type: Sequelize.STRING,
		unique: true
	},
	link: Sequelize.STRING,
	name: Sequelize.STRING,
	base: Sequelize.STRING,
	dir: Sequelize.STRING,
	ext: Sequelize.STRING,
	desc: Sequelize.TEXT,
	year: Sequelize.STRING,
	month: Sequelize.STRING,
	day: Sequelize.STRING,
	daystr: Sequelize.STRING,
	ctime: Sequelize.DATE
});

Image.belongsTo(Directory);
ImageDate.hasMany(Image, { as: 'Image' });
Image.belongsTo(ImageDate);

Image.sync();
module.exports = Image;
