import React from 'react';
import { Client } from 'boardgame.io/react';
import GameBoard from './board';
import GameCore from '../game/core';

const ClientApp = Client({
  game: GameCore,
  board: GameBoard,
  debug: true,
  multiplayer: false, // { server: 'localhost:8000' }
});

const App = () => (
  <div>
    <ClientApp gameID="f5396086" />
  </div>
);

export default App;