import { Server, Mongo } from 'boardgame.io/server';
import GameCore from '../game/core';

const path = require('path');
const serve = require('koa-static');

var currentPath = process.cwd();
let env =  process.env.NODE_ENV
let host = process.env.MONGO_URI;
let database = process.env.MONGO_DATABASE
const port = process.env.PORT || 8000;

console.log('Startup - Environment: ', env);
console.log('Startup - Database: ', host);

let db = undefined;
if (host && database) {
  db = new Mongo({ url: host, dbname: database })
}

const server = Server({ 
  games: [GameCore],
  db: db
})

const buildPath = path.join(currentPath, '/build/client/');
server.app.use(serve(buildPath));

server.run(port, () => {
  console.log(`Startup - Listening on [${port}]`);
});