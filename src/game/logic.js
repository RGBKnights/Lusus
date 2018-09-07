import { Game } from 'boardgame.io/core';
import { GameState } from './cubits';

let clone = require('clone');
let game = new GameState();

const GameLogic = Game({
    name: 'Lusus',
    setup: (ctx) => {
        let data = game.getStartingState(ctx);
        return data;
    },
    moves: {
        moveUnit: (G, ctx) => {
            const g = clone(G);
            return g;
        }
    },
    flow: {
        endTurn: true,
        endPhase: true,
        endGame: true,
        optimisticUpdate: (G, ctx, move) => false,
    }
  });

  export default GameLogic;