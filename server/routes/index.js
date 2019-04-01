const Router = require('koa-router');
const router = new Router();

router.prefix('/');
router.get('/', async (ctx, next) => {
	ctx.body = {};
})
;

module.exports = router;
