import { Game } from 'boardgame.io/core';
import { 
    GAME_PHASES,
    // LOCATIONS,
    // TARGET_TYPES
} from './common';

import { GameLogic } from './logic';

var clone = require('clone');

const GameCore = Game({
    name: 'Lusus',
    setup: (ctx) => {
      let data = {};
      let logic = new GameLogic();
      logic.initialize(data, ctx);
      logic.setup(data, ctx);
      return data;
    },
    moves: {
      playCubit: (G, ctx, source, target) => {
        const g = clone(G);
        return g;
      },
      moveUnit: (G, ctx, source, target) => {
        const g = clone(G);
        return g;
      },
      drawCubit: (G, ctx) => {
        const g = clone(G);
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
        },
        {
          name: GAME_PHASES.Action,
        },
        {
          name: GAME_PHASES.Move,
        },
        {
          name: GAME_PHASES.Draw,
        },
      ],
    }
  });

  export default GameCore;