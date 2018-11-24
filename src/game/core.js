import { Game, TurnOrder, PlayerView} from 'boardgame.io/core';
import { GameLogic } from '../game/logic'

const GameCore = Game({
    name: 'Lusus',
    playerView: PlayerView.STRIP_SECRETS,
    setup: (ctx) => {
      return GameLogic.setup(ctx);
    },
    moves: {
      skip: (G, ctx) => {
        return GameLogic.skip(G, ctx);
      },
      play: (G, ctx) => {
        return GameLogic.play(G, ctx);
      },
      move: (G, ctx) => {
        return GameLogic.move(G, ctx);
      },
      draw: (G, ctx) => {
        return GameLogic.draw(G, ctx);
      }
    },
    flow: {
      // optimisticUpdate: (G, ctx, move) => false,
      // startingPhase: 'play',
      turnOrder: TurnOrder.DEFAULT,
      endTurn: true,
      endPhase: true,
      endGame: true,
      setActionPlayers: true,
      phases: {
        play: {
          next: 'move',
          allowedMoves: ['skip','play'],
          endPhaseIf: (G, ctx) => G.players[ctx.currentPlayer].actions === 0
        },
        move: {
          next: 'draw',
          allowedMoves: ['move'],
          endPhaseIf: (G, ctx) => G.players[ctx.currentPlayer].moves === 0
        },
        draw: {
          next: 'play',
          allowedMoves: ['draw'],
        }
      }
    }
  });

  export default GameCore;