'use strict';

module.exports = () => {
	return async function isAuth (ctx, next) {
		console.log('当前是否登录', ctx.isAuthenticated());
		if (ctx.isAuthenticated()) {
			return next();
		}
		console.log('没有登录');
		ctx.status = 401;
		// await ctx.redirect('/signin');
	};
};
