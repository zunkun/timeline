const Router = require('koa-router');
const router = new Router();
const Image = require('../models/Image');
const ImageDate = require('../models/ImageDate');
const Scan = require('../models/Scan');

router.prefix('/timeline/api/images');

router.get('/', async (ctx, next) => {
	let query = ctx.query;
	let page = Number(query.page) || 1;
	let limit = Number(query.limit) || 10;
	let offset = (page - 1) * limit;
	let tags = query.tags || '';
	const where = {};
	if (query.tags === '无法识别') {
		let scans = await Scan.findAll({ tag: '核验未识别' });
		let hashes = [];
		for (let scan of scans) {
			hashes.push(scan.hash);
		}
		const where = {
			hash: {
				$in: hashes
			}
		};

		let imageLists = await ImageDate.findAll({
			limit,
			offset,
			include: [{ model: Image, where, as: 'Image' }],
			order: [['daystr', 'DESC']],
			nested: true
		});
		ctx.body = imageLists;
		return;
	}

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

router.post('/explore', async (ctx, next) => {
	const { fullpath } = ctx.request.body;
	const exec = require('child_process').exec;
	exec(`explorer.exe /select, ${fullpath}`);
	ctx.status = 200;
});

module.exports = router;
