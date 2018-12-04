import { Game, TurnOrder } from 'boardgame.io/core';
import { GameLogic } from '../game/logic'

const GameCore = Game({
    name: 'Lusus',
    setup: GameLogic.setup,
    moves: {
      config(G, ctx, data) {
        return GameLogic.config(G, ctx, data);
      },
      skip(G, ctx) {
        return GameLogic.skip(G, ctx);
      },
      placement(G, ctx, source, destination) {
        return GameLogic.placement(G, ctx, source, destination);
      },
      movement(G, ctx, source, destination) {
        return GameLogic.movement(G, ctx, source, destination);
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
          allowedMoves: ['skip','placement'],
          endPhaseIf: (G, ctx) => {
            return GameLogic.isEndOfPlacement(G, ctx);
          },
        },
        move: {
          next: 'resolution',
          allowedMoves: ['movement'],
          endPhaseIf: (G, ctx) => {
            return GameLogic.isEndOfMovement(G, ctx);
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