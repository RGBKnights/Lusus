import { INVALID_MOVE } from 'boardgame.io/core';
import { Game, TurnOrder } from 'boardgame.io/core';
import { GameLogic } from '../game/logic'
// import { isPlayerInCheck } from './movement'

var clone = require('clone');

const GameCore = Game({
    name: 'Lusus',
    setup: GameLogic.setup,
    moves: {
      config(G, ctx, data) {
        return GameLogic.config(G, ctx, data);
      },
      skip(G, ctx) {
        const g = clone(G);
        if(GameLogic.skip(g, ctx)) {
          return g;
        } else {
          return INVALID_MOVE;
        }
      },
      action(G, ctx, source, target) {
        const g = clone(G);
        if(GameLogic.action(g, ctx, source, target)) {
          return g;
        } else {
          return INVALID_MOVE;
        }
      },
      placement(G, ctx, source, destination) {
        const g = clone(G);
        if(GameLogic.placement(g, ctx, source, destination)) {
          return g;
        } else {
          return INVALID_MOVE;
        }
      },
      movement(G, ctx, source, destination) {
        const g = clone(G);
        if(GameLogic.movement(g, ctx, source, destination)) {
          return g;
        } else {
          return INVALID_MOVE;
        }
      },
      resolution(G, ctx) {
        return GameLogic.resolution(G, ctx);
      },
    },
    flow: {
      startingPhase: 'config',
      turnOrder: TurnOrder.DEFAULT,
      endTurn: true,
      endPhase: true,
      endGame: true,
      phases: {
        config: {
          next: 'play',
          allowedMoves: ['config'],
          turnOrder: TurnOrder.ANY, // Allow any player to initialize the game play
        },
        play: {
          next: 'move',
          allowedMoves: ['skip','placement','action'],
          endPhaseIf: (G, ctx) => {
            return G.players[ctx.currentPlayer].actions === 0;
          },
        },
        move: {
          next: 'resolution',
          allowedMoves: ['movement','action'],
          endPhaseIf: (G, ctx) => {
            return G.players[ctx.currentPlayer].moves === 0;
          },
        },
        resolution: {
          next: 'play',
          allowedMoves: ['resolution']
        }
      }
    }
  });

  export default GameCore;