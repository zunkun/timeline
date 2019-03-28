const Service = require('node-windows').Service;
const path = require('path');

// Create a new service object
const svc = new Service({
	name: 'ZKOA',
	description: 'ZKOA SERVER',
	script: path.join(__dirname, './bin/www'),
	nodeOptions: [
		'--harmony',
		'--max_old_space_size=4096'
	],
	env: [{
		name: 'NODE_ENV',
		value: 'prod'
	}]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
	console.log('ZKOA SERVER INSTALLED.');
	svc.start();
});

svc.install();
