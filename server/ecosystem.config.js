module.exports = {
	apps: [{
		name: 'TIMELINE',
		script: 'bin/www.js',
		instances: 1,
		autorestart: true,
		watch: false,
		max_memory_restart: '2G',
		env_production: {
			PORT_MAIN: 5500,
			NODE_ENV: 'development'
		}
	}]
};
