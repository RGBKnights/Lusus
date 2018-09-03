import React from 'react';
import { Client } from 'boardgame.io/react';
import GameBoard from './board';
import GameLogic from '../game/logic';

const ClientApp = Client({
  game: GameLogic,
  board: GameBoard,
  debug: false,
  multiplayer: false, // { server: 'localhost:8000' }
});

const App = () => (
  <div>
    <ClientApp gameID="f5396086" />
  </div>
);

export default App;