import React from 'react';
import { Client } from 'boardgame.io/react';

import GameBoard from './board';
import GameCore from '../game/core';

const queryString = require('query-string');

class ClientPage extends React.Component {

  render() {
    let index = window.location.hash.indexOf('?');
    let url = window.location.hash.substring(index);
    const parsed = queryString.parse(url);
    const matchId = parsed.m;
    const playerId = parsed.p;

    const ClientApp = Client({
      game: GameCore,
      board: GameBoard,
      debug: true,
      multiplayer: { server: process.env.REACT_APP_SERVER_URL }
    });

    return <ClientApp gameID={matchId} playerID={playerId} />;
  }
}

export default ClientPage;