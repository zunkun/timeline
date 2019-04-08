const Router = require('koa-router');
const router = new Router();
const multer = require('koa-multer');
const Relations = require('../models/Relations');

const avatarSet = new Set();

const storage = multer.diskStorage({
	// 文件保存路径
	destination: (req, file, cb) => {
		cb(null, './public/images/');
	},
	// 修改文件名称
	filename: (req, file, cb) => {
		const fileFormat = (file.originalname).split('.'); // 以点分割成数组，数组的最后一项就是后缀名
		cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
	}
});
// 加载配置
const upload = multer({ storage });

function delay (timestamp) {
	return new Promise(function (resolve, reject) {
		console.log('wait ...');
		let timer = setInterval(function () {
			if (!avatarSet.has(timestamp)) {
				clearInterval(timer);
				resolve(true);
			}
			console.log(timestamp, avatarSet.has(timestamp), 'wait...');
		}, 500);
	});
}

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

router.post('/avatars', upload.single('file'), async (ctx, next) => {
	const data = ctx.req.body;
	const origin = ctx.req.file;
	const avatar = `/images/${origin.filename}`;

	if (avatarSet.has(data.timestamp)) {
		console.log('等待...');
		await delay(data.timestamp);
		console.log('等待结束');
	}
	console.log(22222);

	avatarSet.add(data.timestamp);

	Relations.findOne({
		where: {
			id: data.relation
		}
	}).then(async (relation) => {
		if (!relation) {
			return Promise.resolve();
		}
		console.log(relation.timestamp, data.timestamp, relation.timestamp !== data.timestamp);
		if (relation.timestamp !== data.timestamp) {
			return Relations.update({
				timestamp: data.timestamp,
				avatars: avatar
			}, {
				where: {
					id: data.relation
				}
			});
		}

		if (!relation.avatars) {
			relation.avatars = '';
		}

		console.log(relation.avatars, avatar, relation.avatars.indexOf(avatar));

		if (relation.avatars.indexOf(avatar) > -1) {
			return Promise.resolve();
		}
		return Relations.update({
			timestamp: data.timestamp,
			avatars: `${relation.avatars}|${avatar}`
		}, {
			where: {
				id: data.relation
			}
		});
	}).then(() => {
		console.log('finish');
		avatarSet.delete(data.timestamp);
		return Promise.resolve();
	});
	ctx.body = {};
	await next();
});

module.exports = router;
