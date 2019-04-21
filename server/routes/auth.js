const Router = require('koa-router');
const router = new Router();
const passport = require('koa-passport');

const isAuth = require('../core/auth/isAuth');

router.prefix('/api/auth');

router.post('/signin', passport.authenticate('local', { successRedirect: '/api/auth/users' }));

router.get('/api/auth/fail', async (ctx, next) => {
	console.log('fail');
});

router.get('/users', isAuth(), async (ctx, next) => {
	ctx.body = ctx.state.user;
	await next();
});

module.exports = router;
