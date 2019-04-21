'use strict';

const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const session = require('koa-session');
const fs = require('fs');
const path = require('path');

const passport = require('./core/auth/passport');

// middlewares
app.use(bodyparser({
	enableTypes: ['json', 'form', 'text']
}));
app.use(json());

// Sessions
app.keys = ['abcd1234', '11235813abcd'];
app.use(session({}, app));

app.use(passport.initialize());
app.use(passport.session());

// 请求出错日志
app.on('error', function (err) {
	console.error(err);
});

/**
 * 初始化路由
 */
function initRouters (pathRoute) {
	let routersPath = path.join(__dirname, 'routes');
	let files = fs.readdirSync(routersPath);

	files.forEach(file => {
		let stat = fs.lstatSync(path.join(routersPath, file));
		if (stat.isDirectory()) {
			initRouters(pathRoute ? path.join(pathRoute, file) : file);
		} else {
			if (file.endsWith('.js')) {
				let _router = require(path.join(routersPath, file));
				app.use(_router.routes());
				app.use(_router.allowedMethods());
			}
		}
	});
}

app.use(require('koa-static')(path.join(__dirname, '/public')));

initRouters();
module.exports = app;
