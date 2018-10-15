import { Server, Mongo } from 'boardgame.io/server';
import GameCore from '../game/core';

const path = require('path');
const serve = require('koa-static');

let host = process.env.MONGO_URI;
let database = process.env.MONGO_DATABASE

let db = undefined;
if (host && database) {
  db = new Mongo({ url: host, dbname: database })
}

const server = Server({ 
  games: [GameCore],
  db: db
})

const buildPath = path.join(__dirname, '../../build');
server.app.use(serve(buildPath));

const port = process.env.PORT || 8000;
server.run(port, () => {
  console.log(`Serving at: http://localhost:${port}/`);
  console.log(`Serving at: http://localhost:${port+1}/`);
});