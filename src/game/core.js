import { Game, TurnOrder, PlayerView} from 'boardgame.io/core';
import { GameLogic } from '../game/logic'

const GameCore = Game({
    name: 'Lusus',
    playerView: PlayerView.STRIP_SECRETS,
    setup: GameLogic.setup,
    moves: {
      config: GameLogic.config,
      skip: GameLogic.skip,
      play: GameLogic.play,
      move: GameLogic.move,
    },
    flow: {
      startingPhase: 'init',
      turnOrder: TurnOrder.DEFAULT,
      endTurn: true,
      endPhase: true,
      endGame: true,
      phases: {
        init: {
          next: 'play',
          allowedMoves: ['initialize'],
          turnOrder: TurnOrder.ANY, // Allow any player to initialize the game play
        },
        play: {
          next: 'move',
          allowedMoves: ['skip','play'],
          endPhaseIf: GameLogic.hasNoActions,
        },
        move: {
          next: 'resolution',
          allowedMoves: ['move'],
          endPhaseIf: GameLogic.hasNoMoves,
        },
        resolution: {
          next: 'play',
          onPhaseBegin: GameLogic.resolution,
        }
      }
    }
  });

  export default GameCore;