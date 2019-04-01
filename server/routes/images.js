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
	console.log({ query, page, limit, offset });
	try {
		let imageLists = await ImageDate.findAll({
			limit,
			offset,
			include: [{ model: Image, as: 'Image' }],
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
