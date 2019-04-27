const Router = require('koa-router');
const router = new Router();

const Events = require('../models/Events');
const { Op } = require('sequelize');

router.prefix('/tasks/api/events');

router.get('/', async (ctx, next) => {
	let { timestamp, type } = ctx.query;
	timestamp = Number(timestamp) || new Date().getTime();
	type = type || 'dayGridMonth';

	let startDate;
	let endDate;
	let date = new Date(timestamp);
	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();
	if (type === 'dayGridMonth') {
		startDate = new Date(year, month, 1, 0, 0, 0);

		let daysOfMonth = new Date(year, month + 1, 0).getDate();
		endDate = new Date(year, month, daysOfMonth, 23, 59, 59);
	} else if (type === 'timeGridWeek' || type === 'listWeek') {
		startDate = new Date(year, month, day, 0, 0, 0);
		endDate = new Date(timestamp + 7 * 24 * 60 * 60 * 1000);
	} else {
		startDate = new Date(year, month, day, 0, 0, 0);
		endDate = new Date(year, month, day, 23, 59, 59);
	}

	let events = await Events.findAll({
		where: {
			[Op.or]: [
				{
					start: {
						[Op.between]: [startDate, endDate]
					}
				},
				{
					end: {
						[Op.between]: [startDate, endDate]
					}
				}
			]
		}
	});

	ctx.body = events;
});

router.post('/', async (ctx, next) => {
	let event = ctx.request.body;

	if (!event.title || !Array.isArray(event.timerange) || event.timerange.length !== 2) {
		ctx.status = 404;
		return;
	}

	ctx.body = await Events.create({
		title: event.title,
		location: event.location || '',
		color: event.color || '',
		description: event.description || '',
		start: event.timerange[0],
		end: event.timerange[1]
	});
	await next();
});

router.put('/:id', async (ctx, next) => {
	const id = ctx.params.id;
	const event = ctx.request.body;

	ctx.body = await Events.update(event, { where: { id } });
	await next();
});

router.delete('/:id', async (ctx, next) => {
	const id = ctx.params.id;
	ctx.body = await Events.destroy({ where: { id } });
	await next();
});

module.exports = router;
