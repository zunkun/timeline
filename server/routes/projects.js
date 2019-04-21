const Router = require('koa-router');
const router = new Router();
const Projects = require('../models/Projects');
const Progress = require('../models/Progress');
const Tasks = require('../models/Tasks');
const constants = require('../config/constants');
const { literal, Op } = require('sequelize');

router.prefix('/tasks/api/projects');

router.get('/', async (ctx, next) => {
	let query = ctx.query;
	let type = query.type;
	let limit = Number(query.limit) || 10;
	let page = Number(query.page) || 1;
	let offset = (page - 1) * limit;
	const where = {};
	if (type) {
		where.type = Boolean(type);
	}
	if (query.enable) {
		where.enable = Boolean(query.enable);
	}
	ctx.body = await Projects.findAndCountAll({ where, limit, offset, order: [['enable', 'DESC'], ['createdAt', 'DESC']] });

	await next();
});

router.post('/', async (ctx, next) => {
	let project = ctx.request.body;
	if (!project.name || !project.type) {
		ctx.status = 404;
		return;
	}
	let _project = await Projects.create(project);

	for (let progress of constants.progress) {
		await Progress.create({
			type: progress.type,
			name: progress.name,
			sequence: progress.sequence,
			projectId: _project.id
		});
	}

	let data = await Projects.findOne({
		where: { id: _project.id },
		include: [{ model: Progress }]
	});
	ctx.body = data;
	next();
});

router.get('/:id', async (ctx, next) => {
	let data = await Projects.findOne({
		where: { id: ctx.params.id },
		include: { model: Progress, include: { model: Tasks } },
		order: [[Progress, 'sequence', 'ASC'], [Progress, Tasks, 'sequence', 'ASC']]
	});
	ctx.body = data;
	await next();
});

router.put('/:id', async (ctx, next) => {
	let id = ctx.params.id;
	let project = ctx.request.body;

	ctx.body = await Projects.update(project, { where: { id } });
	next();
});

router.del('/:id', async (ctx, next) => {
	let id = ctx.params.id;

	ctx.body = await Projects.destroy({ where: { id } });
	next();
});

router.post('/:project/progress/', async (ctx, next) => {
	const body = ctx.request.body;
	if (!body.name) {
		ctx.status = 404;
		return;
	}
	let progress = await Progress.findOne({ where: { projectId: ctx.params.project }, order: [['sequence', 'DESC']] });
	if (progress) {
		body.sequence = (Number(progress.sequence) + 1) || 1;
	}
	body.sequence = body.sequence || 1;
	body.projectId = ctx.params.project;
	ctx.body = await Progress.create(body);
	await next();
});

router.post('/:project/progress/:id/moved', async (ctx, next) => {
	const { id } = ctx.params;
	const body = ctx.request.body;

	ctx.body = await Tasks.update(body, { where: { id } });
	await next();
});

router.put('/:project/progress/:id', async (ctx, next) => {
	const { project, id } = ctx.params;
	const body = ctx.request.body;

	ctx.body = await Progress.update(body, { where: { projectId: project, id } });
	await next();
});

router.delete('/:project/progress/:id', async (ctx, next) => {
	const { project, id } = ctx.params;
	let progress = await Progress.findOne({ where: { id } });
	if (!progress) {
		ctx.status = 404;
		return;
	}
	await Tasks.destroy({ where: { progressId: id } });
	await Progress.destroy({ where: { id } });
	await Progress.update({ sequence: literal('`sequence` -1') }, {
		where: {
			projectId: project,
			sequence: {
				[Op.gte]: progress.sequence || 0
			}
		}
	});
	ctx.status = 200;
	await next();
});

router.post('/:projectId/progress/:progressId/tasks/', async (ctx, next) => {
	const { progressId } = ctx.params;
	const body = ctx.request.body;
	if (!body.title) {
		ctx.status = 400;
		return;
	}

	await Tasks.update({ sequence: literal('`sequence` +1') }, { where: { progressId } });

	ctx.body = await Tasks.create({ progressId, title: body.title, description: body.description, color: body.color, sequence: 0 });
	await next();
});

router.put('/:projectId/progress/:progressId/tasks/:id', async (ctx, next) => {
	const { id } = ctx.params;
	const body = ctx.request.body;
	if (!body.title) {
		ctx.status = 400;
		return;
	}

	ctx.body = await Tasks.update(body, { where: { id } });
	await next();
});

router.delete('/:projectId/progress/:progressId/tasks/:id', async (ctx, next) => {
	const { id } = ctx.params;

	ctx.body = await Tasks.destroy({ where: { id } });
	await next();
});

router.post('/:projectId/progress/:progressId/tasks/:id/moved', async (ctx, next) => {
	const { id } = ctx.params;
	const body = ctx.request.body;

	ctx.body = await Tasks.update(body, { where: { id } });
	await next();
});

module.exports = router;
