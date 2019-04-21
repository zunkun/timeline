const Router = require('koa-router');
const router = new Router();
const Todos = require('../models/Todos');
const isAuth = require('../core/auth/isAuth');
const constants = require('../config/constants');
const { literal, Op } = require('sequelize');

router.prefix('/tasks/api/todos');
router.use(isAuth());
router.get('/', async (ctx, next) => {
	let query = ctx.query;
	let type = query.type;
	let limit = Number(query.limit) || 10;
	let page = Number(query.page) || 1;
	let offset = (page - 1) * limit;
	let checked = query.checked;
	const where = {};
	if (type) {
		where.type = type;
	}
	if (checked) {
		where.checked = true;
	}

	ctx.body = await Todos.findAndCountAll({ where, limit, offset, order: [['checked', 'ASC'], ['type', 'DESC'], ['createdAt', 'DESC']] });

	await next();
});

router.get('/types', async (ctx, next) => {
	ctx.body = constants.todoTypes;
	await next();
});

router.post('/', async (ctx, next) => {
	let todo = ctx.request.body;
	if (!todo.text || !todo.text.trim()) {
		ctx.status = 400;
		return;
	}
	await Todos.update({ sequence: literal('`sequence` +1') }, {
		where: {
			type: todo.type,
			id: {
				[Op.ne]: null
			}
		}
	});
	ctx.body = await Todos.create({ type: todo.type || 'common', checked: todo.checked, text: todo.text, sequence: 0 });
	ctx.status = 200;
	await next();
});

router.put('/:id', async (ctx, next) => {
	let id = ctx.params.id;
	let data = ctx.request.body;
	Todos.update(data, { where: { id } });
	ctx.status = 200;
	ctx.body = {};
	await next();
});

router.put('/:id/checked', async (ctx, next) => {
	let id = ctx.params.id;
	Todos.update({ checked: ctx.request.body.checked }, { where: { id } });
	ctx.body = {};
});

router.delete('/:id', async (ctx, next) => {
	let id = ctx.params.id;
	Todos.destroy({ where: { id } });
	ctx.status = 200;
	ctx.body = {};
	await next();
});

router.post('/sequence', async (ctx, next) => {
	ctx.status = 200;
	await next();
});

module.exports = router;
