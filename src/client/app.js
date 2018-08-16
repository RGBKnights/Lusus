import React from 'react';
import { Client } from 'boardgame.io/react';
import GameBoard from './board';
import GameLogic from '../game';

const ClientApp = Client({
  game: GameLogic,
  board: GameBoard,
  multiplayer: { server: 'localhost:8000' }
});

const App = () => (
  <div>
    <h1>Player 1 View</h1>
    <ClientApp gameID="f5396086" playerID="0" />
    <hr />
    <h1>Player 2 View</h1>
    <ClientApp gameID="f5396086" playerID="1" />
  </div>
);

export default App;