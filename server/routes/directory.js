const Router = require('koa-router');
const router = new Router();

const Directory = require('../models/directory');

router.prefix = '/tl/directory';
router.get('/', async (ctx, next) => {
	ctx.body = await Directory.find({});
});

router.post('/', async (ctx, next) => {
	const { dir } = ctx.request.body;
	const name = dir.split('/');

	await Directory.updateOne({ dir }, { dir, name }, { upsert: true });
	ctx.body = {};
});

module.exports = router;
