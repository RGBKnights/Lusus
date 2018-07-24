import { Client } from 'boardgame.io/react';
import ChessBoard from './board';
import ChessGame from './game';

const ClientApp = Client({
  game: ChessGame,
  board: ChessBoard,
  multiplayer: { server: 'localhost:8000' },
  debug: true
});

export default ClientApp;