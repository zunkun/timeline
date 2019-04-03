const Router = require('koa-router');
const router = new Router();
const Image = require('../models/Image');
const ImageDate = require('../models/ImageDate');

router.prefix('/tl/api/images');

router.get('/', async (ctx, next) => {
	let query = ctx.query;
	let page = Number(query.page) || 1;
	let limit = Number(query.limit) || 10;
	let offset = (page - 1) * limit;
	let tags = query.tags || '';
	const where = {};
	if (tags) {
		where.$or = [];
		tags.split(',').forEach(tag => {
			where.$or.push({
				tags: {
					$like: `%${tag}%`
				}
			});
		});
	}
	console.log({ query, page, limit, offset, where });
	try {
		let imageLists = await ImageDate.findAll({
			limit,
			offset,
			include: [{ model: Image, where, as: 'Image' }],
			order: [['daystr', 'DESC']],
			nested: true
		});
		ctx.body = imageLists;
	} catch (error) {
		console.log({ error });
		ctx.body = [];
	}
	await next();
});

module.exports = router;
