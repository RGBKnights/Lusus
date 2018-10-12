import { Server, Mongo, InMemory } from 'boardgame.io/server';
import GameCore from '../game/core';

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

const port = process.env.PORT || 8000;
console.log(`App running on http://localhost:${port}/`)
console.log(`Api running on http://localhost:${port+1}/`)
server.run(port);