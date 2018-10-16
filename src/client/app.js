import React from 'react';
import { Client } from 'boardgame.io/react';
import GameBoard from './board';
import GameCore from '../game/core';

const uuidv4 = require('uuid/v4');
const queryString = require('query-string');

const parsed = queryString.parse(window.location.search);
if(parsed.m === undefined && parsed.p === undefined) {
  window.location = window.location.origin + "/?p=0&m=" + uuidv4();
}

const matchId = parsed.m;
const playerId = parsed.p;

const ClientApp = Client({
  game: GameCore,
  board: GameBoard,
  debug: false,
  multiplayer: { server: process.env.REACT_APP_SERVER_URL }
});

const App = () => (
  <div>
    <div>
      <ClientApp gameID={matchId} playerID={playerId} />
    </div>
  </div>
);

export default App;