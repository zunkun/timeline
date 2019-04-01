const Router = require('koa-router');
const router = new Router();
const Relations = require('../models/Relations');

router.prefix('/tl/api/relations');

router.get('/', async (ctx, next) => {
	return Relations.findAll({ order: [['sequelence', 'ASC']] })
		.then((relations) => {
			ctx.body = relations || [];
		});
	// return next();
});

router.post('/', async (ctx, next) => {
	const relation = ctx.request.body;
	if (!relation.name || !relation.sequelence) {
		ctx.status = 404;
		return;
	}
	Relations.create(relation);
	ctx.body = {};
	await next();
});

router.put('/:id', async (ctx, next) => {
	const relation = ctx.request.body;
	if (!relation.name || !relation.sequelence) {
		ctx.status = 404;
		return;
	}
	Relations.update(relation, { where: { id: ctx.params.id } });
	ctx.body = {};
	await next();
});

router.del('/:id', async (ctx, next) => {
	Relations.destroy({ where: { id: ctx.params.id } });
	ctx.status = 200;
	await next();
});

module.exports = router;
