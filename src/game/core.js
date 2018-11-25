import { Game, TurnOrder} from 'boardgame.io/core';
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
      play(G, ctx) {
        return GameLogic.play(G, ctx);
      },
      move(G, ctx) {
        return GameLogic.move(G, ctx);
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
          allowedMoves: ['skip','play'],
          endPhaseIf: (G, ctx) => {
            return GameLogic.hasNoActions(G, ctx);
          },
        },
        move: {
          next: 'resolution',
          allowedMoves: ['move'],
          endPhaseIf: (G, ctx) => {
            return GameLogic.hasNoMoves(G, ctx);
          },
        },
        resolution: {
          next: 'play',
          onPhaseBegin: (G, ctx) => { 
            GameLogic.resolution(G, ctx);
          },
        }
      }
    }
  });

  export default GameCore;