// env DOCKER_TYPE=certs DOCKER_HOST="192.168.99.100" DOCKER_PORT=2376 node lb.js | /usr/local/bin/bunyan
const Docker = require('dockerode')

const endpoint = 'http://192.168.99.100'
const env = require('./env')

const proxy = require('redbird')({port: 8000})
const modem = new Docker(env.docker.conf)

const parseEnvVars = function(envVars){
	var vars = {}
	envVars.forEach(function(envVar){
		var key = envVar.split('=')[0]
		var value = envVar.split('=')[1]

		vars[key] = value
	})

	return vars
}

modem.getEvents(function(err, res) {
	if (err) {
		return console.log('Error', err)
	}

	res.on('data', function(buffer){
		var data = JSON.parse(buffer.toString())
		var action = data.Action
		console.log('data:', data.Action, data.id || '')

		// remove from lb
		if(action === 'stop' || action === 'die'){
			modem.getContainer(data.id).inspect(function(err, container){
				if(err){
					return console.log('Error', err)
				}

				var vars = parseEnvVars(container.Config.Env)

				if(vars.host){
					proxy.unregister(vars.host, endpoint+':'+vars.port)
				}
			})
		}

		// add from lb
		if(action === 'start'){
			modem.getContainer(data.id).inspect(function(err, container){
				if(err){
					return console.log('Error', err)
				}

				var vars = parseEnvVars(container.Config.Env)

				if(vars.host){
					proxy.register(vars.host, endpoint+':'+vars.port)
				}
			})
		}
	})

	res.on('end', function(data){
		console.log('Connection broken')
	})
})

modem.listContainers(function (err, containers) {
	if(err){
		return console.log('Error', err)
	}

	containers.forEach(function(container){
		modem.getContainer(container.Id).inspect(function(err, container){
			if(err){
				return console.log('Error', err)
			}

			var vars = parseEnvVars(container.Config.Env)

			if(vars.host){
				proxy.register(vars.host, endpoint+':'+vars.port)
			}

		})
	})
})

