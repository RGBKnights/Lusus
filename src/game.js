import { Game, PlayerView } from 'boardgame.io/core';
import { Logic } from './logic';

// 'playerView': PlayerView.STRIP_SECRETS,

const ChessGame = Game({
  name: 'chess',  
  moves: {
    playCubits: function(G, ctx, cubitId, unitId) {
      // Source must be the id of a Cubit
      // Target must be the id of a Unit
      
      // Move to next player
      // ctx.events.endTurn();

      const g = { ...G };
      return g;
    },
    moveUnit: function(G, ctx, source, destination) {
      // Source must be the coordinates of the board, the Unit will be inferred from the source
      // Destination must be the coordinates of the board

      const g = { ...G };
      return g;
    },
    discardCubits: function(G, ctx) {
      // The amount of is controlled by the game flow, Cubits can reduce the default amount

      const g = { ...G };
      return g;
    },
    drawCubits: function(G, ctx) {
      // The amount of is controlled by the game flow, Cubits can increase and decrease the default amount
      // If the amount is greater then the bag size then that player loses

      const g = { ...G };
      return g;
    }
  },
  flow: {
    phases: [
      {
        name: 'Play',
        allowedMoves: ['playCubits'],
      },
      {
        name: 'Move',
        allowedMoves: ['moveUnit'],
      },
      {
        name: 'Discard',
        allowedMoves: ['discardCubits'],
      },
      {
        name: 'Draw',
        allowedMoves: ['drawCubits'],
      },
    ],
  },
  setup: function(ctx) {
    return {
      players: {
        '0': { 
          bag: [],
          hand: [],
          moves: [],
          units: []
        },
        '1': {
          bag: [],
          hand: [],
          moves: [],
          units: []
        }
      }
    };
  }
});

export default ChessGame;