// env DOCKER_TYPE=certs DOCKER_HOST="192.168.99.100" DOCKER_PORT=2376 node stop-all.js
const Docker = require('dockerode')

const env = require('./env')

const modem = new Docker(env.docker.conf)

modem.listContainers({all: true}, function (err, containers) {
	if(err){
		return console.log('Error', err)
	}

	console.log('container', containers.length )
	containers.forEach(function(item){
		var container = modem.getContainer(item.Id)

		container.inspect(function(err, data){
			if(err){
				return console.log('Error', containers.Id, err)
			}

			console.log('info:',data.Name, data.State.Status)

			if(data.State.Status !== 'stop'){
				console.log('stoping', data.Name)
				container.stop(function(err){
					if(err){
						return console.log('Error', containers.Id, err)
					}

					console.log('stopped', data.Name)
				})
			}
		})
	})
})