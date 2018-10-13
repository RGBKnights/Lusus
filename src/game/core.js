import { Game } from 'boardgame.io/core';
import { 
    GAME_PHASES,
    // LOCATIONS,
    // TARGET_TYPES
} from './common';

import { GameLogic } from './logic';

var clone = require('clone');
let logic = new GameLogic();

const GameCore = Game({
    name: 'Lusus',
    // seed: 1010195894359804352,
    setup: (ctx) => {
      let data = {};   
      logic.initialize(data, ctx);
      logic.setup(data, ctx);
      return data;
    },
    moves: {
      skipActions: (G, ctx) => {
        const g = clone(G);
        g.players[ctx.currentPlayer].actions = 0;
        return g;
      },
      skipMovement: (G, ctx) => {
        const g = clone(G);
        ctx.events.endPhase();
        return g;
      },
      playCubit: (G, ctx, source, target) => {
        const g = clone(G);
        return g;
      },
      drawCubits: (G, ctx) => {
        const g = clone(G);

        // Reset
        g.players[ctx.currentPlayer].actions = logic.getActivities(G, ctx, ctx.currentPlayer);

        // Draw new hand 
        // If not endGame()
        

        // End turn 1st and reset to 'Play' phase
        ctx.events.endTurn();
        ctx.events.endPhase();
        
        return g;
      }
    },
    flow: {
      optimisticUpdate: (G, ctx, move) => false,
      endTurn: true,
      endPhase: true,
      endGame: true,
      phases: [
        { 
          name: GAME_PHASES.Play,
          allowedMoves: (G, ctx) => ['skipActions', 'playCubit'],
          endPhaseIf: (G, ctx) => {
            let actions = logic.getActions(G, ctx, ctx.currentPlayer);
            return actions === 0 ? GAME_PHASES.Move : false;
          }
        },
        {
          name: GAME_PHASES.Action,
          allowedMoves: (G, ctx) => ['skipActions'],
          endPhaseIf: (G, ctx) => {
            let actions = logic.getActions(G, ctx, ctx.currentPlayer);
            return actions === 0 ? GAME_PHASES.Move : false;
          }
        },
        {
          name: GAME_PHASES.Move,
          allowedMoves: (G, ctx) => ['skipMovement']
        },
        { 
          name: GAME_PHASES.Draw,
          allowedMoves: (G, ctx) => ['drawCubits']
        }
      ]
    }
  });

  export default GameCore;