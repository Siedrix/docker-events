
Some usefull commands for the demo
```
docker run --name some-redis -d redis
docker run --name some-mongo -d mongo


docker run --name demo-app -d -p 4000:3000 -e "host=cat.dev" -e "port=4000"  siedrix/demo-app

docker run --name demo-app-1 -d -p 4001:3000 -e "host=cat.dev" -e "port=4001"  siedrix/demo-app
```

