import { Game } from 'boardgame.io/core';
import { GameState } from './logic';

let clone = require('clone');

const GameCore = Game({
    name: 'Lusus',
    setup: (ctx) => {
        let data = new GameState(ctx);
        return data;
    },
    moves: {
        moveUnit: (G, ctx) => {
            const g = clone(G);
            g.moveUnit(null, null);
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

  export default GameCore;