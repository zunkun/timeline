const fs = require('fs');
const path = require('path');
const isImage = require('is-image');
const scanService = require('./scanService');

class DiskService {
	async listDisk () {
		let stdout = '';
		const spawn = require('child_process').spawn;
		const list = spawn('cmd');

		return new Promise((resolve, reject) => {
			list.stdout.on('data', function (data) {
				stdout += data;
			});

			list.stderr.on('data', (data) => {
				console.log('stderr: ' + data);
			});

			list.on('exit', (code) => {
				if (code === 0) {
					let data = stdout.split('\r\n');
					data = data.splice(4, data.length - 7);
					data = data.map(Function.prototype.call, String.prototype.trim);
					resolve(data);
				} else {
					console.log('child process exited with code ' + code);
					reject(Error('获取磁盘列表失败'));
				}
			});
			list.stdin.write('wmic logicaldisk get caption\n');
			list.stdin.end();
		});
	}

	async folders (folderPath) {
		console.log({ folderPath });
		if (!folderPath) return [];
		let folders = [];
		let stat = fs.statSync(folderPath);
		if (!stat || !stat.isDirectory()) {
			return [];
		}
		if (folderPath[folderPath.length - 1] === ':') { folderPath = `${folderPath}/`; }

		let files = fs.readdirSync(folderPath);

		files.forEach(file => {
			if (file.indexOf('.') === 0 || file.indexOf('$') === 0 || file === 'System Volume Information') {
				return;
			}
			let filePath = path.join(folderPath, file);

			try {
				let fileStat = fs.statSync(filePath);
				if (fileStat) {
					let isDirectory = fileStat.isDirectory();
					if (isDirectory || isImage(filePath)) {
						folders.push({
							id: filePath,
							name: file,
							isLeaf: !isDirectory
						});
					}
				}
			} catch (error) {
			}
		});
		return folders;
	}

	async addNodes (nodes = []) {
		let promiseArray = [];
		for (let node of nodes) {
			let promise = scanService.addNodes(node);
			promiseArray.push(promise);
		}
		return Promise.all(promiseArray);
	}
};

const diskService = new DiskService();

module.exports = diskService;
