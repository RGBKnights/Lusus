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
            objectives: [],
            goal: 0,
            cubits: cubits
        };
    },
    moves: {
        focus: (G, ctx, id) => {
            console.log("ctx", ctx);

            const g = clone(G);

            let cubit = getCubit(g, id);
            if(g.selection === id) {
                cubit.onBlur(g, ctx);
            } else {
                cubit.onFocus(g, ctx);
            }

            return g;
        },
        target: (G, ctx, id) => {
            const g = clone(G);
        
            let objective = g.objectives.find(t => t.id === id);
            if(objective) {
                g.objectives = g.objectives.filter(t => t.id !== id);
            } else {
                let target = g.targets.find(t => t.id === id);
                g.objectives.push(target);
            }
            
            if(g.objectives.length === g.goal) {
                let cubit = getCubit(g, g.selection);
                cubit.onActivated(g, ctx);
            }

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