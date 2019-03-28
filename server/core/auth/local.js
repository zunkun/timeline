const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const redis = require('../db/redis');
const User = require('../../models/user');

passport.use(new LocalStrategy({
	usernameField: 'phone',
	passwordField: 'code',
	session: true
}), async (phone, code, done) => {
	if (process.env.NODE_ENV !== 'dev' || code !== '666666') {
		const signKey = `zkoa-${phone}`;
		const signValue = await redis.get(signKey);
		if (!signValue || !signValue.code !== code) {
			done(null, false);
		}

		if (new Date().getTime() > (signValue.timestamp + signValue.expire)) {
			done(null, false);
		}
	}

	User.findOne({
		where: { phone },
		raw: true
	}).then(user => {
		if (!user) {
			return done(null, false);
		}
		return done(null, user);
	}).catch((err) => {
		return done(err);
	});
});

passport.serializeUser(async (user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
	return User.findOne({ where: { id }, raw: true }).then(user => {
		if (user) { delete user.id; }
		return done(null, user);
	}).catch(err => { done(err); });
});
