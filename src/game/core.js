import { Game } from 'boardgame.io/core';
import { GameLogic } from './logic';

var clone = require('clone');

let logic = new GameLogic();

const GameCore = Game({
    name: 'Lusus',
    setup: (ctx) => {
        let data = logic.initialize(ctx);
        logic.setup(data, ctx);
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

  export default GameCore;