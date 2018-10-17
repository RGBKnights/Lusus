import React from 'react';
import { Client } from 'boardgame.io/react';
import Landing from './landing';
import GameBoard from './board';
import GameCore from '../game/core';


const queryString = require('query-string');

let App = null;

const parsed = queryString.parse(window.location.search);
if(parsed.m === undefined) {
  
  App = Landing

} else {
  const matchId = parsed.m;
  const playerId = parsed.p;

  const ClientApp = Client({
    game: GameCore,
    board: GameBoard,
    debug: false,
    multiplayer: { server: process.env.REACT_APP_SERVER_URL }
  });

  App = () => (<ClientApp gameID={matchId} playerID={playerId} />)
}

export default App;