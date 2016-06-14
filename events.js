// env DOCKER_TYPE=certs DOCKER_HOST="192.168.99.100" DOCKER_PORT=2376 node events.js 
const Docker = require('dockerode')

const env = require('./env')

const modem = new Docker(env.docker.conf)

modem.getEvents(function(err, res) {
	if (err) {
		return console.log('Error', err)
	}

	res.on('data', function(buffer){
		var data = JSON.parse(buffer.toString())
		console.log('data:', data.Action, data.id || '')
	})

	res.on('end', function(data){
		console.log('Connection broken')
	})	
})