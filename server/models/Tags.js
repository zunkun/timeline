const sqlite = require('../core/db/sqlite');
const Sequelize = require('sequelize');

const constants = require('../config/constants');

const Tags = sqlite.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true
	},
	tags: Sequelize.STRING
});

Tags.sync().then(() => {
	return constants.tags.map((tagLists, name) => {
		return Tags.findOne({ name }).then((tagData) => {
			let tags = '';
			if (!tagData) {
				tags = tagLists.join('|');
			} else {
				let _tags = !tagData.tags ? [] : tagData.tags.split('|');
				let tagsSet = new Set(_tags);
				tagLists.forEach((tagItem) => {
					tagsSet.add(tagItem);
				});
				tags = Array.from(tagsSet).join('|');
			}
			return Tags.upsert({ name, tags });
		});
	});
});

module.exports = Tags;
