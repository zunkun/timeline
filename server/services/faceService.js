const Relation = require('../models/Relations');
const Image = require('../models/Image');
const Scan = require('../models/Scan');
const fs = require('fs');
const faceapi = require('face-api.js');
const constants = require('../config/constants');

const { canvas, faceDetectionNet, faceDetectionOptions } = require('../util');
console.log({ faceDetectionOptions });

class FaceService {
	constructor () {
		this.relation = {};
		this.faceMatcher = null;
		this.hashes = [];
		this.imageLength = 0;
	}

	async delay (time) {
		return new Promise((resolve, reject) => {
			console.log('程序等待中...');
			setTimeout(() => {
				resolve('true');
			}, time || 200);
		});
	}

	async init (relation) {
		this.relation = relation;

		let scans = await Scan.findAll({
			where: {
				$or: [
					{ tag: '核验无人脸' },
					{ tag: relation.name, status: 1 }
				]
			}
		});

		if (scans) {
			for (let scan of scans) {
				this.hashes.push(scan.hash);
			}
		}

		await faceDetectionNet.loadFromDisk('./public/models');
		await faceapi.nets.faceLandmark68Net.loadFromDisk('./public/models');
		await faceapi.nets.faceRecognitionNet.loadFromDisk('./public/models');

		if (!relation.avatars) {
			return;
		}
		const avatars = relation.avatars.split('|');

		let refDescriptors = [];

		try {
			let avatarSet = new Set();
			for (let avatar of avatars) {
				const url = `./public${avatar}`;
				if (!avatar || avatarSet.has(url)) {
					continue;
				}
				avatarSet.add(url);
				const refImage = await canvas.loadImage(url);
				console.log({ refImage });
				const refResult = await faceapi.detectSingleFace(refImage).withFaceLandmarks().withFaceDescriptor();

				if (refResult && refResult.descriptor) {
					refDescriptors.push(refResult.descriptor);
				}
			}

			const labeledDescriptors = [
				new faceapi.LabeledFaceDescriptors(
					relation.name,
					refDescriptors
				)
			];

			this.faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
		} catch (error) {
			console.log(error);
			return Promise.resolve();
		}
	}

	async recognition (id) {
		const that = this;
		let relation = await Relation.findOne({ where: { id } });

		if (!id || !relation || !relation.avatars) {
			return Promise.reject(new Error('无法找到图片'));
		}

		await this.init(relation);

		if (!this.faceMatcher) {
			return Promise.resolve();
		}

		return Image.findAll({
			attributes: ['id', 'tags', 'fullpath', 'link', 'hash'],
			where: {
				tags: {
					$or: {
						$eq: null,
						$notLike: `%${relation.name}%`
					}
				},
				hash: {
					$notIn: this.hashes
				}
			}
		}).then((images) => {
			this.images = images || [];
			this.imageLength = images.length;
			return this.computeImage();
		}).catch((error) => {
			console.log({ error });
			return Promise.reject(new Error(`识别人员 ${that.relation.name} 错误`));
		});
	}

	async computeImage () {
		if (!this.images.length) {
			return Promise.resolve();
		}
		let index = this.imageLength - this.images.length + 1;
		let image = this.images.shift();
		await this.recognitionImage(image, index);
		await this.delay(200);
		return this.computeImage();
	}

	async recognitionImage (image, index) {
		console.log(`${index}/${this.imageLength} 识别图片: ${image.fullpath}`);

		const that = this;
		if (!fs.existsSync(image.fullpath)) {
			console.log(`图片 ${image.fullpath} 不存在，执行从数据库中删除`);
			return Image.destroy({ where: { id: image.id } });
		}

		const url = `${constants.imageBase}${image.link}`;
		const queryImage = await canvas.loadImage(url);
		console.log({ url });
		const results = await faceapi.detectAllFaces(queryImage)
			.withFaceLandmarks()
			.withFaceDescriptors();
		console.log(`图片人脸数目: ${results.length}`);
		if (!results.length) {
			console.log(`图片 ${image.fullpath} 没有识别出人脸`);
			await Scan.create({ tag: '核验无人脸', hash: image.hash, status: 0 });
			return Promise.resolve();
		}
		let isMatch = false;
		for (let fd of results) {
			const bestMatch = that.faceMatcher.findBestMatch(fd.descriptor);
			console.log(bestMatch.toString());
			if (bestMatch._label === that.relation.name || bestMatch._distance <= 0.5) {
				isMatch = true;
				console.log(`${bestMatch._distance} ${that.relation.name} 与 ${image.fullpath} 匹配`);
				break;
			}
		}
		if (isMatch) {
			console.log(`【匹配】图片 ${image.fullpath} 与 ${that.relation.name} 的项目特征相似`);
			return this.saveImageTag(image).then(() => {
				return Scan.create({ tag: that.relation.name, hash: image.hash, status: 1 });
			});
		} else {
			console.log(`【不匹配】图片 ${image.fullpath} 与 ${that.relation.name} 的项目特征不相似`);
			Scan.create({ tag: that.relation.name, hash: image.hash, status: 0 });
		}
		return Promise.resolve();
	}

	saveImageTag (image) {
		console.log(`保存 ${this.relation.name} 的 图片 ${image.fullpath} 信息 `);
		let tags = image.tags || '';

		if (tags.indexOf(this.relation.name) > -1) {
			return Promise.resolve();
		}
		if (!tags) {
			tags = this.relation.name;
		} else {
			tags = `${tags}|${this.relation.name}`;
		}
		return Image.update({ tags }, { where: { id: image.id } });
	}

	async detect (id) {
		const scans = await Scan.findAll({ where: { tag: '核验无人脸' } });
		let hashSet = new Set();
		for (let scan of scans) {
			hashSet.add(scan.hash);
		}
		const hashes = Array.from(hashSet);

		let images = await Image.findAll({ where: { hash: { $in: hashes } } });

		await faceDetectionNet.loadFromDisk('./public/models');
		await faceapi.nets.faceLandmark68Net.loadFromDisk('./public/models');
		await faceapi.nets.faceRecognitionNet.loadFromDisk('./public/models');

		for (let image of images) {
			const url = `${constants.imageBase}${image.link}`;
			console.log(`检测 ${image.fullpath}   ${url}`);
			const queryImage = await canvas.loadImage(url);

			const results = await faceapi.detectAllFaces(queryImage, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

			if (!results.length) {
				console.log(`图片 ${image.fullpath} 没有人脸信息`);
			} else {
				console.log(`图片 ${image.fullpath} 侦测到人脸信息`);
			}
		}
	}
}

module.exports = new FaceService();
