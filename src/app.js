import { Client } from 'boardgame.io/react';
import ChessBoard from './board';
import ChessGame from './game';

const ClientApp = Client({
  game: ChessGame,
  board: ChessBoard,
  debug: true
});

export default ClientApp;