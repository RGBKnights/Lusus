import React from 'react';
import { Client } from 'boardgame.io/react';
import ChessBoard from './board';
import ChessGame from './game';

const uuidv4 = require('uuid/v4');

var url = new URL(window.location);
var params = new URLSearchParams(url.search);

let flagDebug = params.has('d') ? params.get("d").toLowerCase() === "true" : false;
let matchId = params.has('m') ? params.get("m") : uuidv4();
let playerId = params.has('p') ? params.get("p") : null;

const ClientApp = Client({
  game: ChessGame,
  board: ChessBoard,
  multiplayer: { server: 'localhost:8000' },
  debug: flagDebug
});

const App = () => (
  <ClientApp gameID={matchId} playerID={playerId} />
);

export default App;