import { Game, } from 'boardgame.io/core';
import { Logic } from './logic';

let gl = new Logic();

const ChessGame = Game({
  name: 'chess',
  // playerView: PlayerView.STRIP_SECRETS,
  moves: {
    playCubits: function(G, ctx, cubix, field, unitix) {
      /*
      // Set Defaults...
      cubix = 0
      field = '0'
      unitix = 0

      // Input Contacts
      if (cubix === undefined) {
        return
      }
      if (field === undefined) {
        return
      }
      if (unitix === undefined) {
        return
      }
      
      // Create Copy
      const g = { ...G };

      // remove source from hand 
      let cubit = g.players[ctx.currentPlayer].hand.splice(cubix, 1);
      
      // Get unit
      let unit = g.field[field][unitix];

      // if slots is not greater then limit
      if (unit.slots.length >= unit.limit) {
        return;
      }

      // add it slot of unit 
      unit.slots.push(cubit);

      // Move to next Phase
      ctx.events.endPhase();

      // Return Copy
      return g;
      */
    },
    moveUnit: function(G, ctx, source, destination) {
      /*
      // Set Defaults...
      source = {x:1,y:4};
      destination = {x:2,y:4};

      // Input Contacts
      if (source === undefined) {
        return;
      }
      if (destination === undefined) {
        return;
      }

      const g = { ...G };

      let unit = g.field[ctx.currentPlayer].find(function(u) { return u.x === source.x && u.y === source.y; });
      if(unit === undefined) {
        return;
      }

      unit.x = destination.x;
      unit.y = destination.y;

      // Move to next Phase
      ctx.events.endPhase();

      return g;
      */
    },
    discardCubits: function(G, ctx) {
      /*
      // The amount of is controlled by the game flow, Cubits can reduce the default amount

      const g = { ...G };
      
      // Get hand
      let hand = g.players[ctx.currentPlayer].hand.slice();

      // Remove hand
      g.players[ctx.currentPlayer].hand = [];

      // Add hand back to bag
      g.players[ctx.currentPlayer].bag =  g.players[ctx.currentPlayer].bag.concat(hand);

      // Move to next Phase
      ctx.events.endPhase();

      return g;
      */
    },
    drawCubits: function(G, ctx) {
      /*
      // The amount of is controlled by the game flow, Cubits can increase and decrease the default amount
      // If the amount is greater then the bag size then that player loses

      const g = { ...G };

      let total = g.players[ctx.currentPlayer].bag;
      let amount = g.limits[ctx.currentPlayer].draw;

      if(total < amount) {
        // Game Over
        ctx.events.endGame();
        // ctx.gameover

        return g;

      } else {
        g.players[ctx.currentPlayer].bag = ctx.random.Shuffle(g.players[ctx.currentPlayer].bag);

        for (let x = 0; x < amount; x++) {
          let cubit = g.players[ctx.currentPlayer].bag.pop();
          g.players[ctx.currentPlayer].hand.push(cubit);
        }
  
        // Move to next Phase
        ctx.events.endPhase();

        // Move to next Turn
        ctx.events.endTurn();
  
        return g;
      }

      */
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
    let data = gl.setup(ctx);
    return data;
  }
});

export default ChessGame;