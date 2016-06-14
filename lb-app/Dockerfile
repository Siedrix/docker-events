FROM nodesource/trusty:4.0.0

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

ADD . /app
WORKDIR /app

ENV NODE_ENV production

CMD ["node", "lb.js"]