const Router = require('koa-router');
const router = new Router();
const multer = require('koa-multer');
const Relations = require('../models/Relations');

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

router.prefix('/timeline/api/relations');

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

router.post('/avatars', upload.single('file'), async (ctx, next) => {
	const data = ctx.req.body;
	const origin = ctx.req.file;
	const avatar = `/images/${origin.filename}`;

	Relations.findOne({
		where: {
			id: data.relation
		}
	}).then(async (relation) => {
		if (!relation) {
			return Promise.resolve();
		}

		if (!relation.avatars) {
			relation.avatars = '';
		}
		if (relation.avatars.indexOf(avatar) > -1) {
			return Promise.resolve();
		}
		return Relations.update({
			avatars: `${relation.avatars}|${avatar}`
		}, {
			where: {
				id: data.relation
			}
		});
	});
	ctx.body = {};
});

router.del('/avatars', async (ctx, next) => {
	const { avatar, id } = ctx.request.body;

	Relations.findOne({ where: { id } }).then(relation => {
		if (!relation) return Promise.resolve();
		let avatars = (relation.avatars || '').split('|') || [];
		let index = avatars.indexOf(`${avatar}`);
		if (index > -1) {
			avatars.splice(index, 1);
			return Relations.update({ avatars: avatars.join('|') }, { where: { id } });
		}
		return Promise.resolve();
	});

	ctx.status = 200;
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
