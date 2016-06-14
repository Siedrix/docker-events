Build

```
docker build -t siedrix/lb-app .
```


Run

```
docker run -d --net="host" \
-v /var/run:/docker \
-e DOCKER_SOCKET_PATH="/docker/docker.sock" \
--name lb siedrix/lb-app
```

Logs
```
docker logs lb | /usr/local/bin/bunyan
```