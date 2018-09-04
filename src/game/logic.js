import { Game } from 'boardgame.io/core';
import { getStartingCubits, getCubitsFromGameState, CubitLocation, TARGETS, LOCATIONS } from './cubits';

let clone = require('clone');

const GameLogic = Game({
    name: 'Lusus',
    setup: (ctx) => {
        let cubits = getStartingCubits(ctx);
        let targets = [
            {
                type: TARGETS.Self,
                location: new CubitLocation(LOCATIONS.board, 0, 0)
            }
        ];

        return {
            targets: targets,
            cubits: cubits
        };
    },
    moves: {
        selectCubit: (G, ctx, where, x, y, player) => {
            const g = clone(G);
            let cubits = getCubitsFromGameState(g);
            for (let i = 0; i < cubits.length; i++) {
                const cubit = cubits[i];
                if(cubit.isAt(where, x, y, player)) {
                    cubit.onSelected(g, ctx);
                } else {
                    cubit.selected = false;
                }
            }
            
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