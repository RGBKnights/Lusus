import { Server } from 'boardgame.io/server';
import ChessGame from '../src/game';

const port = 8000;
console.log(`App running on http://localhost:${port}/`)
console.log(`Api running on http://localhost:${port+1}/`)

const server = Server({ games: [ChessGame] });
server.run(port);

// API
// [GET] List Games - ~/games
// [POST] Create a match of the game - ~/games/{game}/create
// { "numPlayers": 2 }
// [POST] join a match returning a player key - ~/games/{game}/{match}/join
// {"playerID":0,"playerName": "Jane"}