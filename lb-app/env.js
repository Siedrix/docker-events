'use strict'
const fs = require('fs')
const data = {
	nodeEnv : process.env.NODE_ENV || 'dev'
}

data.docker = {}
if(process.env.DOCKER_TYPE === 'certs'){
	let ca = fs.readFileSync(process.env.DOCKER_CERT_PATH + '/ca.pem');
	let cert = fs.readFileSync(process.env.DOCKER_CERT_PATH + '/cert.pem');
	let key = fs.readFileSync(process.env.DOCKER_CERT_PATH + '/key.pem');

	data.docker.conf = {
		host: process.env.DOCKER_HOST || '192.168.59.103',
		port: process.env.DOCKER_PORT || 2375,
		ca: ca,
		cert: cert,
		key: key
	}

	data.docker.type = 'certs'

	// Allow tls over http
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}else{
	data.docker.conf = {
		socketPath: process.env.DOCKER_SOCKET_PATH || '/var/run/docker.sock'
	}

	data.docker.type = 'socket deamon'
}

module.exports = data