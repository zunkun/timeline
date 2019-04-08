const cron = require('node-cron');
const Schedule = require('../models/Schedule');
const Image = require('../models/Image');
const fs = require('fs');
const util = require('../util');
const scanService = require('./scanService');

let isScan = false;

const scheduledDaySet = new Set();
class ScheduleWork {
	async start () {
		await this.startScan();
		return this.startSchedule();
	}

	async startSchedule () {
		console.log('启动定时任务');
		const task = cron.schedule('0 0 */1 * * *', async () => {
			return this.startScan();
		});

		task.start();
	}

	async startScan () {
		let startTime = new Date();
		let year = startTime.getFullYear();
		let _month = startTime.getMonth();
		let month = _month + 1 <= 9 ? `0${_month}` : `${_month}`;
		let _day = startTime.getDate();
		let day = _day <= 9 ? `0${_day}` : `${_day}`;
		let fullday = `${year}-${month}-${day}`;
		if (scheduledDaySet.has(fullday)) {
			console.log('今日已经扫描结束');
			isScan = false;
			return Promise.resolve();
		}
		if (isScan) {
			console.log('当前正在扫描');
			return Promise.resolve();
		}

		return Schedule.findOne({ where: { year, month, day } })
			.then(schedule => {
				if (schedule && schedule.status) {
					scheduledDaySet.add(fullday);
					console.log('今日已经扫描');
					return Promise.resolve();
				}

				return Image.findAll({})
					.then(images => {
						let promiseArray = [];

						for (let image of images) {
							let promise;
							console.log(`扫描文件 ${image.fullpath}`);
							if (!image.fullpath || !fs.existsSync(image.fullpath)) {
								console.log(`文件${image.fullpath}不存在`);

								promise = Image.destroy({ where: { fullpath: image.fullpath } });
								promiseArray.push(promise);
								continue;
							}

							promise = util.getHash(image.fullpath)
								.then(filehash => {
									if (filehash !== image.hash) {
										console.log(`文件${image.fullpath}被修改过`);
										return scanService.saveExistPathImage(image.fullpath, filehash);
									}
									return Promise.resolve();
								});
							promiseArray.push(promise);
						}
						return Promise.all(promiseArray);
					})
					.then(() => {
						isScan = false;
						console.log('扫描成功');
						return Schedule.create({ year, month, day, status: 1 });
					});
			})
			.catch((error) => {
				isScan = false;
				console.log('扫描失败', error);
				return Schedule.create({ year, month, day, status: 0 });
			});
	}
}

const scheduleWork = new ScheduleWork();

module.export = scheduleWork.start();
