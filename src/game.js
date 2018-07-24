import { Game, PlayerView } from 'boardgame.io/core';

const ChessGame = Game({
  'name': 'chess',  
  'playerView': PlayerView.STRIP_SECRETS,
  'moves': {
    'RollDice': function(G, ctx) {
      // Clone G
      const g = { ...G };
  
      // Update copy
      let value = ctx.random.D6();
      g.players[ctx.currentPlayer].moves.push(value);

      // Move to next player
      ctx.events.endTurn();
  
      // Return copy
      return g;
    }
  },
  'setup': function(ctx) {
    let secretData = {};

    let data = {
      'moves': []
    };

    let collection = [];
    for (let i = 0; i < ctx.numPlayers; i++) {
      collection.push(data)
    }

    let playerData = Object.assign({}, collection);

    return {
      'secret': secretData,
      'players': playerData
    };
  }
});

export default ChessGame;