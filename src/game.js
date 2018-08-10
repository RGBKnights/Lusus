import { Game, } from 'boardgame.io/core';
import { Logic, } from './logic';
import { MOVEMENT, TARGET_WHERE, TARGET_WHAT } from './cubits';

let clone = require('clone');

let gl = new Logic();

const ChessGame = Game({
  name: 'chess',
  moves: {
    playCubitOnUnit: function(G, ctx, handId, playerId, unitId) {
      // Input Contracts
      if (handId === undefined) {
        return;
      }
      if (playerId === undefined) {
        return;
      }
      if (unitId === undefined) {
        return;
      }

      // Create Copy
      const g = clone(G);

      // remove source from hand 
      let cubitix = g.players[ctx.currentPlayer].hand.splice(handId, 1).shift();

      // Get unit
      let unit = g.players[playerId].units[unitId];

      // if slots is not greater then limit
      if (unit.slots.length >= unit.limit) {
        return;
      }

      // confirm that cubit is allow to make this move
      let cubit = gl.getCubit(cubitix);
      if(cubit.targetWhere !== TARGET_WHERE.units) {
        return;
      }

      // confirm that cubit is allow to make this move
      if(cubit.targetWhat === TARGET_WHAT.self && playerId !== ctx.currentPlayer) {
        return;
      } else if(cubit.targetWhat === TARGET_WHAT.opponent && playerId === ctx.currentPlayer) {
        return;
      } else if(cubit.targetWhat === TARGET_WHAT.pawn && unit.type !== 'P') {
        return;
      } else if(cubit.targetWhat === TARGET_WHAT.king && unit.type !== 'K') {
        return;
      } else if(cubit.targetWhat === TARGET_WHAT.queen && unit.type !== 'Q' ) {
        return;
      } else if(cubit.targetWhat === TARGET_WHAT.bishop && unit.type !== 'B' ) {
        return;
      } else if(cubit.targetWhat === TARGET_WHAT.knight && unit.type !== 'N' ) {
        return;
      } else if(cubit.targetWhat === TARGET_WHAT.rook && unit.type !== 'R') {
        return;
      }

      // Data
      let data = {
        cubit: cubitix,
        controller: ctx.currentPlayer,
      }

      // add it slot of unit 
      unit.slots.push(data);

      // Move to next Phase
      ctx.events.endPhase();

      // Return Copy
      return g;
    },
    playCubitOnPlayer: function(G, ctx, handId, playerId) {
      // Input Contracts
      if (handId === undefined) {
        return;
      }
      if (playerId === undefined) {
        return;
      }

      const PLAYER_SLOT_LIMIT = 5;

      // Create Copy
      let g = clone(G);

      // Remove source from hand 
      let cubitix = g.players[ctx.currentPlayer].hand.splice(handId, 1).shift();

      // confirm that cubit is allow to make this move
      let cubit = gl.getCubit(cubitix);
      if(cubit.targetWhere !== TARGET_WHERE.player) {
        return;
      }

      // If slots is not greater then limit
      if (g.players[playerId].slots.length >= PLAYER_SLOT_LIMIT) {
        return;
      }

      // Data
      let data = {
        cubit: cubitix,
        controller: ctx.currentPlayer,
      }

      // Add it slot of unit 
      g.players[playerId].slots.push(data);

      // Move to next Phase
      ctx.events.endPhase();

      // Return Copy
      return g;
    },
    playCubitOnField: function(G, ctx, cubitId, x, y) {
      // Input Contracts
      if (cubitId === undefined) {
        return;
      }
      if (x === undefined) {
        return;
      }
      if (y === undefined) {
        return;
      }

      // Create Copy
      let g = clone(G);

      // Remove source from hand 
      let cubitix = g.players[ctx.currentPlayer].hand.splice(cubitId, 1).shift();

      // confirm that cubit is allow to make this move
      let cubit = gl.getCubit(cubitix);
      if(cubit.targetWhere !== TARGET_WHERE.field) {
        return;
      }

      // Create data to store cubit location on field
      let data = {
        cubit: cubitix,
        x: x, 
        y: y
      };

      // Add data to field
      g.players[ctx.currentPlayer].field.push(data);

      // Return Copy
      return g;
    },
    playCubitOnArena: function(G, ctx, cubitId) {
      // Input Contracts
      if (cubitId === undefined) {
        return;
      }

      // Create Copy
      let g = clone(G);

      // Remove source from hand 
      let cubitix = g.players[ctx.currentPlayer].hand.splice(cubitId, 1).shift();

      // confirm that cubit is allow to make this move
      let cubit = gl.getCubit(cubitix);
      if(cubit.targetWhere !== TARGET_WHERE.arena) {
        return;
      }

      // Add cubit to arena
      for (let i = 0; i < ctx.numPlayers; i++) {
        g.players[i.toString()].arena = null;
      }
      g.players[ctx.currentPlayer].arena = cubitix;

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

      let opponentId = ctx.currentPlayer === '0' ? '1' : '0';
      let source = {x: sx, y: sy};
      let destination = {x: dx, y: dy};

      let g = clone(G);

      let move = gl.getMoveForLocation(g, ctx.currentPlayer, source, destination);
      if(move.type === MOVEMENT.invalid) {
        return;
      }

      if(move.type === MOVEMENT.capture) {
        let index = g.players[opponentId].units.findIndex(function(u) { return u.x === destination.x && u.y === destination.y; });
        let enemy = g.players[opponentId].units.splice(index, 1).shift();
        if(enemy.type === 'K') {
          // TODO: make sure it is the only kind left on the opponents team
          ctx.events.endGame(ctx.currentPlayer);
          return g;
        }

        g.players[opponentId].afterlife.push(enemy);
      }

      let ally = g.players[ctx.currentPlayer].units.find(function(u) { return u.x === source.x && u.y === source.y; });
      ally.x = move.x;
      ally.y = move.y;
      ally.moved = true;

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

          let opponentId = ctx.currentPlayer === '0' ? '1' : '0';
          
          let g = clone(G);

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
           
            ctx.events.endGame(opponentId);  // End the Game

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