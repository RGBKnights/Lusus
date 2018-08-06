import { Game, } from 'boardgame.io/core';
import { Logic } from './logic';

// playerView: PlayerView.STRIP_SECRETS,

let gl = new Logic();

const ChessGame = Game({
  name: 'chess',
  moves: {
    playCubitOnUnit: function(G, ctx, cubitix, player, unitix) {
      // Input Contracts
      if (cubitix === undefined) {
        return;
      }
      if (player === undefined) {
        return;
      }
      if (unitix === undefined) {
        return;
      }

      // Create Copy
      const g = { ...G };

      // remove source from hand 
      let cubit = g.players[ctx.currentPlayer].hand.splice(cubitix, 1).shift();

      // confirm that cubit is allow to make this move
      
      // Get unit
      let unit = g.players[player].units[unitix];

      // if slots is not greater then limit
      if (unit.slots.length >= unit.limit) {
        return;
      }

      // Data
      let data = {
        cubit: cubit,
        controller: ctx.currentPlayer,
      }

      // add it slot of unit 
      unit.slots.push(data);

      // Move to next Phase
      ctx.events.endPhase();

      // Return Copy
      return g;
    },
    playCubitOnPlayer: function(G, ctx, cubitix, player) {
      // Input Contracts
      if (cubitix === undefined) {
        return;
      }
      if (player === undefined) {
        return;
      }

      const PLAYER_SLOT_LIMIT = 5;

      // Create Copy
      const g = { ...G };

      // Remove source from hand 
      let cubit = g.players[ctx.currentPlayer].hand.splice(cubitix, 1).shift();

      // confirm that cubit is allow to make this move

      // If slots is not greater then limit
      if (g.players[player].slots.length >= PLAYER_SLOT_LIMIT) {
        return;
      }

      // Data
      let data = {
        cubit: cubit,
        controller: ctx.currentPlayer,
      }

      // Add it slot of unit 
      g.players[player].slots.push(data);

      // Move to next Phase
      ctx.events.endPhase();

      // Return Copy
      return g;
    },
    playCubitOnField: function(G, ctx, cubitix, destination) {
      // Input Contracts
      if (cubitix === undefined) {
        return;
      }
      if (destination === undefined) {
        return;
      }

      // Create Copy
      const g = { ...G };

      // Remove source from hand 
      let cubit = g.players[ctx.currentPlayer].hand.splice(cubitix, 1).shift();

      // confirm that cubit is allow to make this move

      // Create data to store cubit location on field
      let data = {
        cubit: cubit, 
        x: destination.x, 
        y: destination.y
      };

      // Add data to field
      g.players[ctx.currentPlayer].field.push(data);

      // Return Copy
      return g;
    },
    playCubitOnArena: function(G, ctx, cubitix) {
      // Input Contracts
      if (cubitix === undefined) {
        return;
      }

      // Create Copy
      const g = { ...G };

      // Remove source from hand 
      let cubit = g.players[ctx.currentPlayer].hand.splice(cubitix, 1).shift();

      // TODO: confirm that cubit is allow to make this move

      // Add cubit to arena
      for (let i = 0; i < ctx.numPlayers; i++) {
        g.players[i.toString()].arena = null;
      }
      g.players[ctx.currentPlayer].arena = cubit;

      // Move to next Phase
      ctx.events.endPhase();

      // Return Copy
      return g;
    },
    moveUnit: function(G, ctx, sx, sy, dx, dy) {
      // Input Contacts
      if (sx === undefined) {
        return;
      }
      if (sy === undefined) {
        return;
      }
      if (dx === undefined) {
        return;
      }
      if (dy === undefined) {
        return;
      }

      const g = { ...G };

      let unit = g.players[ctx.currentPlayer].units.find(function(u) { return u.x === sx && u.y === sy; });
      if(unit === undefined) {
        return;
      }

      unit.x = dx;
      unit.y = dy;

      // Move to next Phase
      ctx.events.endPhase();

      return g;
    },
  },
  flow: {
    phases: [  
      {
        name: 'Action',
        allowedMoves: ['playCubitOnUnit', 'playCubitOnPlayer', 'playCubitOnField', 'playCubitOnArena'],
      },
      {
        name: 'Movement',
        allowedMoves: ['moveUnit'],
      },
      {
        name: 'Maintenance',
        allowedMoves: [],
        onPhaseBegin: function(G, ctx) {
          // NOTE: Happens on the server...
          
          const g = { ...G };

          // Get hand
          let hand = g.players[ctx.currentPlayer].hand.slice();

          // Remove hand
          g.players[ctx.currentPlayer].hand = [];

          // Add hand back to bag
          g.players[ctx.currentPlayer].bag =  g.players[ctx.currentPlayer].bag.concat(hand);

          // Check for end of game
          let total = g.players[ctx.currentPlayer].bag;
          let amount = g.players[ctx.currentPlayer].draw;
          if(total < amount) {
            // End the Game
            ctx.events.endGame();

          } else {
            g.players[ctx.currentPlayer].bag = ctx.random.Shuffle(g.players[ctx.currentPlayer].bag);

            for (let x = 0; x < amount; x++) {
              let cubit = g.players[ctx.currentPlayer].bag.pop();
              g.players[ctx.currentPlayer].hand.push(cubit);
            }
            
            // Move to next Player & Phase
            ctx.events.endPhase();
            ctx.events.endTurn();
          }

          return g;
        }
      },
    ],
  },
  setup: function(ctx) {
    let data = gl.setup(ctx);
    return data;
  }
});

export default ChessGame;