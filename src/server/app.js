import { Server } from 'boardgame.io/server';
import GameCore from '../game/core';

const server = Server({ games: [GameCore] })

const port = process.env.PORT || 8000;
console.log(`App running on http://localhost:${port}/`)
console.log(`Api running on http://localhost:${port+1}/`)
server.run(port);