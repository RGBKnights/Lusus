process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const currentPath = process.cwd();

import { Server } from 'boardgame.io/server';
import GameCore from '../game/core';

const path = require('path');
const serve = require('koa-static');
require('dotenv').config();
console.log('Startup[Environment]', process.env.NODE_ENV);

const dbHost = process.env.MONGO_URI;
console.log('Startup[Database]', dbHost);

const server = Server({ games: [GameCore] });
const buildPath = path.join(currentPath, '/build/');
server.app.use(serve(buildPath));

const port = process.env.PORT || 8000;
server.run(port, () => {
  console.log(`Startup[Listening] http://localhost:${port}/`);
});