const path = require('path');
const isImage = require('is-image');
const ExifImage = require('exif').ExifImage;
const fs = require('fs');
const util = require('../util');

const Directory = require('../models/Directory');
const Image = require('../models/Image');
const ImageDate = require('../models/ImageDate');
const Exif = require('../models/Exif');

class ScanService {
	constructor () {
		this.imageDateMap = new Map();
		this.dirMap = new Map();
	}
	async scan (dir) {
		let images = await this.listImages(dir);

		if (!images.length) return Promise.resolve();
		return this.record(dir, images);
	}

	async listImages (dir) {
		let _this = this;
		let images = [];
		if (!dir) return images;
		let list = fs.readdirSync(dir);

		list.forEach(async (file) => {
			file = path.join(dir, file);

			let stat = fs.statSync(file);
			if (stat && stat.isDirectory()) {
				let childrenImages = await _this.scan(file);
				images = images.concat(childrenImages);
			} else if (isImage(file)) {
				let fileInfo = path.parse(file);

				images.push({
					fullpath: file,
					link: file.replace(/\\/g, '\/').slice(2),
					dir: fileInfo.dir,
					base: fileInfo.base,
					name: fileInfo.name,
					ext: fileInfo.ext,
					ctime: stat.ctime
				});
			}
		});
		return images;
	}

	async record (dir, images = []) {
		if (!dir) return Promise.resolve();

		return this.getDirId(dir)
			.then(directoryId => {
				let promiseArray = [];

				for (let image of images) {
					let promise = util.getHash(image.fullpath)
						.then(hash => {
							return Image.findOne({ where: { hash, fullpath: image.fullpath } })
								.then(async existImage => {
									if (existImage) {
										return Promise.resolve(existImage);
									}
									console.log(`正在保存${image.name}`);
									return this.getDayInfo(image.ctime, image.fullpath)
										.then((dayInfo) => {
											return this.saveImage(image, hash, directoryId, dayInfo);
										});
								});
						});
					promiseArray.push(promise);
				}
				return Promise.all(promiseArray);
			});
	}

	async saveImage (image, hash, directoryId, dayInfo) {
		let { exifData, ctime, year, month, day, daystr, imagedateId } = dayInfo;
		console.log('saveImage');
		return Image.create({
			fullpath: image.fullpath,
			hash,
			link: image.fullpath.replace(/\\/g, '\/').slice(2),
			name: image.name,
			dir: image.dir,
			base: image.base,
			ext: image.ext,
			directoryId,
			year,
			month,
			day,
			daystr,
			ctime,
			imagedateId
		}).then((imageData) => {
			console.log(`存储 ${image.name} exif 信息`);
			return this.saveExif(imageData.id, hash, exifData);
		});
	}

	async getDayInfo (_ctime, fullpath) {
		let exifData = await this.getExif(fullpath);
		console.log({ exifData });
		let timeStr = exifData.exif.DateTimeOriginal || exifData.exif.CreateDate;
		let ctime;
		if (timeStr) {
			ctime = new Date(timeStr.split(' ')[0].replace(/\:/g, '-'));
		} else {
			ctime = new Date(_ctime);
		}
		console.log({ _ctime, fullpath });
		let year = ctime.getFullYear();
		let month = ctime.getMonth() < 9 ? `0${ctime.getMonth() + 1}` : ctime.getMonth() + 1;
		let day = ctime.getDate() < 10 ? `0${ctime.getDate()}` : ctime.getDate();
		let daystr = `${year}-${month}-${day}`;

		return this.getImageDateId(daystr, year, month, day)
			.then(imagedateId => {
				if (!imagedateId) {
					return Promise.reject(Error(`获取日期信息失败 ${daystr}`));
				}
				return { exifData, imagedateId, ctime, year, month, day, daystr };
			});
	}

	async saveExif (imageId, hash, exifData) {
		return Exif.insertOrUpdate({
			imageId,
			hash,
			imageInfo: exifData.image,
			thumbnail: exifData.thumbnail,
			gps: exifData.gps,
			exif: exifData.exif,
			interoperability: exifData.interoperability,
			makernote: exifData.makernote
		}, {
			where: { hash }
		});
	}

	async saveExistPathImage (fullpath, hash) {
		console.log({ fullpath, hash });
		let stat = fs.statSync(fullpath);
		let _isImage = isImage(fullpath);
		if (!_isImage || !stat || stat.isDirectory()) {
			return Promise.resolve();
		} else {
			console.log(stat.ctime, fullpath);
			return this.getDayInfo(stat.ctime, fullpath)
				.then(dayInfo => {
					console.log({ dayInfo });
					let { exifData, ctime, year, month, day, daystr, imagedateId } = dayInfo;
					return Image.update({
						hash,
						ctime,
						year,
						month,
						day,
						daystr,
						imagedateId
					}, { where: { fullpath } })
						.then(() => {
							return Image.find({ fullpath }).then(imageData => {
								return this.saveExif(imageData.id, hash, exifData);
							});
						});
				});
		}
	}

	async getImageDateId (daystr, year, month, day) {
		if (this.imageDateMap.has(daystr)) {
			return this.imageDateMap.get(daystr);
		}
		return ImageDate.findOne({ where: { daystr } })
			.then(imageDate => {
				if (imageDate) {
					return imageDate;
				}
				return ImageDate.upsert({ year, month, day, daystr })
					.then(() => {
						return ImageDate.findOne({ where: { daystr } });
					});
			})
			.then(imageDate => {
				this.imageDateMap.set(daystr, imageDate.id);
				return imageDate.id;
			});
	}

	async getDirId (dir) {
		if (this.dirMap.has(dir)) {
			return this.dirMap.get(dir);
		}
		let name = path.win32.basename(dir);

		return Directory.findOne({ where: { dir } })
			.then(existDir => {
				if (existDir) {
					return existDir;
				}
				return Directory.create({ dir, name });
			})
			.then(dirData => {
				this.dirMap.set(dir, dirData.id);
				return dirData.id;
			});
	}

	async getExif (fullpath) {
		return new Promise((resolve, reject) => {
			ExifImage(fullpath, (err, exifData) => {
				if (err) {
					console.log({ err });
					// reject(err);
					resolve({ exif: {} });
				}
				resolve(exifData);
			});
		});
	}

	async addNodes (node) {
		if (!node) return Promise.resolve();
		try {
			if (node.isLeaf) {
				let fileInfo = path.parse(node.id);
				let stat = fs.statSync(node.id);
				let images = [{ fullpath: node.id, dir: fileInfo.dir, base: fileInfo.base, name: fileInfo.name, ext: fileInfo.ext, ctime: stat.ctime }];
				return this.record(fileInfo.dir, images);
			}
			return this.scan(node.id);
		} catch (error) {
			console.log(error);
			return Promise.resolve();
		}
	}
}

const scanService = new ScanService();

module.exports = scanService;
