const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');
const Image = require('./Image');

const Exif = sqlite.define('exifs', {
	hash: {
		type: Sequelize.STRING,
		unique: true
	},
	imageInfo: Sequelize.JSON,
	thumbnail: Sequelize.JSON,
	exif: Sequelize.JSON,
	gps: Sequelize.JSON,
	interoperability: Sequelize.JSON,
	makernote: Sequelize.JSON
});

Exif.belongsTo(Image);

Exif.sync();
module.exports = Exif;
