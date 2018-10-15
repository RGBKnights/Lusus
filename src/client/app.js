import React from 'react';
import { Client } from 'boardgame.io/react';
import GameTable from './board';
import GameCore from '../game/core';

const uuidv4 = require('uuid/v4');
const queryString = require('query-string');

const parsed = queryString.parse(window.location.search);
const matchId = parsed.match ? parsed.match : uuidv4();
const playerId = parsed.player ? parsed.player : "0";

const ClientApp = Client({
  game: GameCore,
  board: GameTable,
  debug: false,
  multiplayer: { server: process.env.REACT_APP_SERVER_URL } // 'lusus.us-3.evennode.com'
});

const App = () => (
  <div>
    <div>
      <ClientApp gameID={matchId} playerID={playerId} />
    </div>
  </div>
);

export default App;