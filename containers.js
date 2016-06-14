// env DOCKER_TYPE=certs DOCKER_HOST="192.168.99.100" DOCKER_PORT=2376 node containers.js
const Docker = require('dockerode')

const env = require('./env')

const modem = new Docker(env.docker.conf)

modem.listContainers(function (err, containers) {
	if(err){
		return console.log('Error', err)
	}

	containers.forEach(function(container){
		modem.getContainer(container.Id).inspect(function(err, container){
			if(err){
				return console.log('Error', err)
			}

			console.log(container.Name, container.Config.Image)
		})
	})
})