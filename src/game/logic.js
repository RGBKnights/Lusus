import { Game } from 'boardgame.io/core';
let clone = require('clone');

const GameLogic = Game({
    name: 'Lusus',
    setup: (ctx) => {
        let collection = getStartingCubits(ctx);
        return { cubits: collection };
    },
    moves: {
        playCubit: (G, ctx) => {
            const g = clone(G);
            return g;
        },
        activateCubit: (G, ctx) => {
            const g = clone(G);
            return g;
        },
        moveUnit: (G, ctx) => {
            const g = clone(G);
            return g;
        }
    },
    flow: {
        endTurn: true,
        endPhase: true,
        endGame: true
    }
  });

  export default GameLogic;