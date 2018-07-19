import { Game } from 'boardgame.io/core';
import Chess from 'chess.js';

function Load(pgn) {
  let chess = null;
  if (Chess.Chess) {
    chess = new Chess.Chess();
  } else {
    chess = new Chess();
  }
  chess.load_pgn(pgn);
  return chess;
}


const ChessGame = Game({
  setup: () => ({ pgn: '' }),
  name: 'chess',
  moves: {
    move(G, ctx, san) {
      const chess = Load(G.pgn);
      let whitesTurn = chess.turn() === 'w' && ctx.currentPlayer === '1';
      let blacksTurn = chess.turn() === 'b' && ctx.currentPlayer === '0';

      if (whitesTurn || blacksTurn) {
        return { ...G };
      }

      chess.move(san);

      return { pgn: chess.pgn() };
    },
  },
  flow: {
    movesPerTurn: 1,

    endGameIf: G => {
      const chess = Load(G.pgn);
      if (chess.game_over()) {
        let isDraw = chess.in_draw() || chess.in_threefold_repetition() || chess.insufficient_material() || chess.in_stalemate()
        if (isDraw) {
          return 'd';
        }
        
        if (chess.in_checkmate()) {
          if (chess.turn() === 'w') {
            return 'b';
          } else {
            return 'w';
          }
        }
      }
    },
  },
});

export default ChessGame;