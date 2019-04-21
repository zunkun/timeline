const Router = require('koa-router');
const router = new Router();
const constants = require('../config/constants');

router.prefix('/api/common');

router.get('/constants', (ctx, next) => {
	ctx.body = constants;
	next();
});

module.exports = router;
