const Router = require('koa-router');
const router = new Router();

const faceService = require('../services/faceService');

let isRecognition = false;
const faceMap = new Map();

router.prefix('/tl/api/faces');
router.post('/', async (ctx, next) => {
	const { id } = ctx.request.body;
	if (isRecognition || (faceMap.has(id) && (Date.now() - faceMap.get(id)) < 20 * 1000)) {
		ctx.body = '重复鉴别';
		ctx.status = 200;
		return;
	}
	isRecognition = true;
	faceMap.set(id, Date.now());

	ctx.body = faceService.recognition(id);
	isRecognition = false;
});

router.post('/detect', async (ctx, next) => {
	const { id } = ctx.request.body;
	if (isRecognition || (faceMap.has(id) && (Date.now() - faceMap.get(id)) < 20 * 1000)) {
		ctx.body = '重复鉴别';
		ctx.status = 200;
		return;
	}
	isRecognition = true;
	faceMap.set(id, Date.now());

	ctx.body = faceService.detect(id);
	isRecognition = false;
});

module.exports = router;
