import { Game } from 'boardgame.io/core';
import { getStartingCubits, getCubit } from './cubits';

let clone = require('clone');

const GameLogic = Game({
    name: 'Lusus',
    setup: (ctx) => {
        let cubits = getStartingCubits(ctx);
        return {
            selection: null,
            targets: [],
            objectives: 0,
            cubits: cubits
        };
    },
    moves: {
        focus: (G, ctx, id) => {
            const g = clone(G);
            let cubit = getCubit(g, id);
            cubit.onFocus(g, ctx);
            return g;
        },
        blur: (G, ctx) => {
            const g = clone(G);
            let cubit = getCubit(g, g.selection);
            cubit.onBlur(g, ctx);
            return g;
        },
        target: (G, ctx) => {
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