import { Server } from 'boardgame.io/server';
import GameCore from '../game/core';

const path = require('path');
const KoaStatic = require('koa-static');
const buildPath = path.join(__dirname, '../../build');

const server = Server({ games: [GameCore] });
server.app.use(KoaStatic(buildPath));

const port = process.env.PORT || 8000;
console.log(`App running on http://localhost:${port}/`)
console.log(`Api running on http://localhost:${port+1}/`)

server.run(port);