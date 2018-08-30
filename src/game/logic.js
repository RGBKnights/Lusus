import { Game } from 'boardgame.io/core';
let clone = require('clone');

const GameLogic = Game({
    name: 'Lusus',
    setup: (ctx) => {
        return { 
            counter: 0 
        };
    },
    moves: {
        playCubit: (G, ctx) => {
            const g = clone(G);
            g.counter++;
            return g;
        },
        activateCubit: (G, ctx) => {
            const g = clone(G);
            g.counter++;
            return g;
        },
        moveUnit: (G, ctx) => {
            const g = clone(G);
            g.counter++;
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