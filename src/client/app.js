import React from 'react';
import { Client } from 'boardgame.io/react';

import GameBoard from './board';
import GameCore from '../game/core';

const queryString = require('query-string');
const parsed = queryString.parse(window.location.search);
const matchId = parsed.m;
const playerId = parsed.p;

const ClientApp = Client({
  game: GameCore,
  board: GameBoard,
  debug: false,
  multiplayer: { server: process.env.REACT_APP_SERVER_URL }
});

const ClientPage = () => (
  <ClientApp gameID={matchId} playerID={playerId} />
);

export default ClientPage;