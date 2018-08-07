import React from 'react';
import { Client } from 'boardgame.io/react';
import ChessBoard from './board';
import ChessGame from './game';

const ClientApp = Client({
  game: ChessGame,
  board: ChessBoard,
  multiplayer: { server: 'localhost:8000' },
  debug: true
});

/*
const App = () => (
  <div>
    <h1 className="text-center">Player 1 View</h1>
    <ClientApp gameID="f5396086" playerID="0" />
    <hr />
    <h1 className="text-center">Player 2 View</h1>
    <ClientApp gameID="f5396086" playerID="1" />
  </div>
);
*/

export default ClientApp;