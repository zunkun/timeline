var fs = require('fs');
var crypto = require('crypto');
const { faceDetectionNet, faceDetectionOptions, canvas } = require('./face');

const util = {
	faceDetectionNet,
	faceDetectionOptions,
	canvas,
	getHash (filepath) {
		return new Promise((resolve, reject) => {
			if (!filepath || !fs.existsSync(filepath)) {
				return reject(Error('文件不存在'));
			}
			var md5sum = crypto.createHash('md5');
			var stream = fs.createReadStream(filepath);
			stream.on('data', function (chunk) {
				md5sum.update(chunk);
			});
			stream.on('end', function () {
				let hash = md5sum.digest('hex').toUpperCase();
				resolve(hash);
			});
		});
	}
};

module.exports = util;
