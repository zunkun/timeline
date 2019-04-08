const Router = require('koa-router');
const router = new Router();
const Image = require('../models/Image');

router.prefix('/tl-web/api/tags');

router.post('/', async (ctx) => {
	const { tag, images } = ctx.request.body;
	for (let image of images) {
		Image.findOne({ where: { id: image.id } })
			.then(existImage => {
				let tags = existImage.tags || '';
				if (tags.indexOf(tag) > -1) {
					return Promise.resolve();
				}
				if (!tags) {
					tags = tag;
				} else {
					let tagSet = new Set((existImage.tags || '').split('|'));
					tagSet.add(tag);
					tags = Array.from(tagSet).join('|');
				}
				return Image.update({ tags }, { where: { id: image.id } });
			});
	}
	ctx.body = {};
});

module.exports = router;
