const Router = require('koa-router');
const router = new Router();
const diskService = require('../services/diskService');
const Directory = require('../models/Directory');
router.prefix('/');
router.get('/', async (ctx, next) => {
	console.log(22222222);
	return ctx.render('index.ejs', { title: 'hello' });
})
;

module.exports = router;
