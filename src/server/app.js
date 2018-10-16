process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import { Server, Mongo } from 'boardgame.io/server';
import GameCore from '../game/core';

const path = require('path');
const serve = require('koa-static');
require('dotenv').config();

var currentPath = process.cwd();
let dbHost = process.env.MONGO_URI;
let dbName = process.env.MONGO_DATABASE;
const port = process.env.PORT || 8000;

console.log('Startup[Environment]', process.env.NODE_ENV);
console.log('Startup[Database]', dbHost);

let db = undefined;
if (dbHost && dbName) {
  db = new Mongo({ url: dbHost, dbname: dbName })
}

const server = Server({ 
  games: [GameCore],
  db: db
})

const buildPath = path.join(currentPath, '/build/');
server.app.use(serve(buildPath));

server.run(port, () => {
  console.log(`Startup[Listening] localhost:${port}/`);
});