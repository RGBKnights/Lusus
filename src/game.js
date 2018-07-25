import { Game, PlayerView } from 'boardgame.io/core';

// 'playerView': PlayerView.STRIP_SECRETS,

const ChessGame = Game({
  name: 'chess',  
  moves: {
    draw: function(G, ctx) {
      return undefined;
    },
    play: function(G, ctx) {
      return undefined;
    },
    move: function(G, ctx) {
      return undefined;
    }
  },
  flow: {
    phases: [
      {
        name: 'draw phase',
        allowedMoves: ['draw'],
        /*
        onPhaseBegin: function(G, ctx) {},
        onPhaseEnd: function(G, ctx) {}
        */
      },
      {
        name: 'play phase',
        allowedMoves: ['play'],
      },
      {
        name: 'move phase',
        allowedMoves: ['move'],
      },
    ],
  },
  setup: function(ctx) {
    return {
      secret: {},
      players: {
        '0':  { 'moves': [] },
        '1':  { 'moves': [] }
      }
    };
  }
});

export default ChessGame;