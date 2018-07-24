import { Game, PlayerView } from 'boardgame.io/core';

const ChessGame = Game({
  'name': 'chess',  
  'playerView': PlayerView.STRIP_SECRETS,
  'moves': {
    'RollDice': function(G, ctx) {
      // Clone G
      const g = { ...G };
  
      // Update copy
      let value = ctx.random.D20();
      g.players[ctx.currentPlayer].moves.push(value);

      // Move to next player
      ctx.events.endTurn();
  
      // Return copy
      return g;
    }
  },
  'setup': function(ctx) {
    return {
      'secret': {},
      'players': {
        '0':  { 'moves': [] },
        '1':  { 'moves': [] }
      }
    };
  }
});

export default ChessGame;