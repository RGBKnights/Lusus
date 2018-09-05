import { Game } from 'boardgame.io/core';
import { getStartingCubits, getCubit, CubitLocation, TARGETS, LOCATIONS } from './cubits';

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
        selectCubit: (G, ctx, id) => {
            const g = clone(G);
            let cubit = getCubit(g, id);
            cubit.onSelected(g, ctx);
            return g;
        },
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