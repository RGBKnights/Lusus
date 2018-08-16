import { Server } from 'boardgame.io/server';
import GameLogic from '../game';

const server = Server({ games: [GameLogic] });

const port = 8000;
console.log(`App running on http://localhost:${port}/`)
console.log(`Api running on http://localhost:${port+1}/`)

server.run(port);