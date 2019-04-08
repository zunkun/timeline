const Router = require('koa-router');
const router = new Router();
const diskService = require('../services/diskService');
const Directory = require('../models/Directory');

router.prefix('/timeline/api/disks');
router.get('/', async (ctx, next) => {
	try {
		let disklists = await diskService.listDisk();
		ctx.body = disklists;
	} catch (error) {
		ctx.body = [];
	}
	await next();
});

router.post('/', async (ctx, next) => {
	let nodes = ctx.request.body;

	diskService.addNodes(nodes);
	ctx.status = 200;
	await next();
});

router.get('/path', async (ctx, next) => {
	let folderPath = ctx.query.folderPath;
	console.log({ folderPath });
	let folders = await diskService.folders(folderPath);
	ctx.body = folders || [];
	await next();
});

router.get('/dirs', async (ctx, next) => {
	let directories = await Directory.findAll({});
	console.log(13214);
	ctx.body = directories || [];
	await next();
});

module.exports = router;
