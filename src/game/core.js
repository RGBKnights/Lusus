import { Game } from 'boardgame.io/core';
import { 
    GAME_PHASES,
    LOCATIONS,
    MOVEMENT_ACTIONS,
    UNIT_TYPES
} from './common';

import { GameLogic } from './logic';
import { getMovements } from '../game/movements';

var clone = require('clone');
let logic = new GameLogic();

const GameCore = Game({
    name: 'Lusus',
    // seed: 1010195894359804352,
    setup: (ctx) => {
      let data = {};
      logic.initialize(data, ctx);
      logic.setup(data, ctx);
      return data;
    },
    moves: {
      // Actions
      skipPlay: (G, ctx) => {
        const g = clone(G);

        if(g.players[ctx.currentPlayer].actions_used === 0) {
          let hand = g.cubits.filter(_ => _.location === LOCATIONS.Hand && _.ownership === ctx.currentPlayer);
          let dice = ctx.random.Die(hand.length) - 1;
          hand[dice].location = LOCATIONS.Afterlife;
        }

        ctx.events.endPhase(GAME_PHASES.Move);

        return g;
      },
      // Attach Cubit to Location
      attachCubitToArena: (G, ctx, cubitId) => {
        const g = clone(G);

        let cubit = g.cubits.find(_ => _.id === cubitId);
        if(!cubit) {
          return undefined;
        }

        let orginal = g.cubits.find(_ => _.location === LOCATIONS.Arena);
        if(orginal) {
          logic.killCubit(g, ctx, orginal);
        }

        cubit.location = LOCATIONS.Arena;

        logic.attachToLocation(g, ctx, cubit);

        g.players[ctx.currentPlayer].actions_left--;
        g.players[ctx.currentPlayer].actions_used++;

        return g;
      },
      attachCubitToPlayer: (G, ctx, cubitId, playerId) => {
        const g = clone(G);

        let cubit = g.cubits.find(_ => _.id === cubitId);
        if(!cubit) {
          return undefined;
        }

        cubit.location = LOCATIONS.Player;
        cubit.controller = playerId;

        logic.attachToLocation(g, ctx, cubit);

        g.players[ctx.currentPlayer].actions_left--;
        g.players[ctx.currentPlayer].actions_used++;

        return g;
      },
      attachCubitToUnit: (G, ctx, cubitId, unitId) => {
        const g = clone(G);

        let cubit = g.cubits.find(_ => _.id === cubitId);
        if(!cubit) {
          return undefined;
        }

        let unit = g.units.find(_ => _.id === unitId);
        if(!unit) {
          return undefined;
        }
        
        // Update Cubit
        cubit.location = LOCATIONS.Unit;
        cubit.unit = unit.id;

        // Add cuits to unit
        unit.cubits.push(cubit.id);

        logic.attachToLocation(g, ctx, cubit);

        g.players[ctx.currentPlayer].actions_left--;
        g.players[ctx.currentPlayer].actions_used++;

        return g;
      },
      attachCubitToBroad: (G, ctx, cubitId, x, y) => {
        const g = clone(G);

        let cubit = g.cubits.find(_ => _.id === cubitId);
        if(!cubit) {
          return undefined;
        }

        cubit.location = LOCATIONS.Board;
        cubit.position = {x,y};

        logic.attachToLocation(g, ctx, cubit);

        g.players[ctx.currentPlayer].actions_left--;
        g.players[ctx.currentPlayer].actions_used++;

        return g;
      },
      targetPlayer(G, ctx, sourceId, player) {
        const g = clone(G);

        let source = g.cubits.find(_ => _.id === sourceId);
        if(!source) {
          return undefined;
        }
  
        logic.targetPlayer(g, ctx, source, player);

        g.players[ctx.currentPlayer].actions_left--;
        g.players[ctx.currentPlayer].actions_used++;

        return g;
      },
      targetCubit(G, ctx, sourceId, targetId) {
        const g = clone(G);

        let source = g.cubits.find(_ => _.id === sourceId);
        if(!source) {
          return undefined;
        }

        let target = g.cubits.find(_ => _.id === targetId);
        if(!target) {
          return undefined;
        }
        
        logic.targetCubit(g, ctx, source, target);

        g.players[ctx.currentPlayer].actions_left--;
        g.players[ctx.currentPlayer].actions_used++;

        return g;
      },
      movePassive(G, ctx, unitId, x, y) {
        const g = clone(G);

        let unit = g.units.find(_ => _.id === unitId);
        if(!unit) {
          return undefined;
        }

        unit.position = {x,y};

        logic.movePassive(g, ctx, unit, x, y);
        
        g.players[ctx.currentPlayer].moves--;

        return g;
      },
      moveCapture(G, ctx, sourceId, destinationId) {
        const g = clone(G);

        let source = g.units.find(_ => _.id === sourceId);
        if(!source) {
          return undefined;
        }

        let destination = g.units.find(_ => _.id === destinationId);
        if(!destination) {
          return undefined;
        }
        
        logic.moveCapture(g, ctx, source, destination);

        if(destination.type === UNIT_TYPES.King) {
          ctx.events.endGame(ctx.currentPlayer); // GameOver
        }

        g.players[ctx.currentPlayer].moves--;

        return g;
      },
      moveSwap(G, ctx, sourceId, destinationId) {
        const g = clone(G);

        let source = g.units.find(_ => _.id === sourceId);
        if(!source) {
          return undefined;
        }

        let destination = g.units.find(_ => _.id === destinationId);
        if(!destination) {
          return undefined;
        }

        logic.moveSwap(g, ctx, source, destination);

        g.players[ctx.currentPlayer].moves--;

        return g;
      },
      moveCastle(G, ctx, sourceId, destinationId) {
        const g = clone(G);

        let source = g.units.find(_ => _.id === sourceId);
        if(!source) {
          return undefined;
        }

        let destination = g.units.find(_ => _.id === destinationId);
        if(!destination) {
          return undefined;
        }

        logic.moveCastle(g, ctx, source, destination);

        g.players[ctx.currentPlayer].moves--;

        return g;
      },
      // Draw new Hand
      drawCubits: (G, ctx) => {
        const g = clone(G);
        
        // Draw
        logic.draw(g, ctx);

        // Resovle End of Turn effects
        logic.resolveTurn(g, ctx);

        return g;
      }
    },
    flow: {
      // optimisticUpdate: (G, ctx, move) => false,
      endTurn: true,
      endPhase: true,
      endGame: true,
      phases: [
        {
          name: GAME_PHASES.Play,
          allowedMoves: (G, ctx) => 
          [
            'skipPlay',
            'attachCubitToArena',
            'attachCubitToPlayer',
            'attachCubitToUnit',
            'attachCubitToBroad',
            'targetPlayer',
            'targetCubit'
          ],
          endPhaseIf: (G, ctx) => {
            let actions = logic.getActions(G, ctx, ctx.currentPlayer);
            return actions === 0 ? GAME_PHASES.Move : false;
          }
        },
        {
          name: GAME_PHASES.Move,
          allowedMoves: (G, ctx) => [
            'movePassive',
            'moveCapture',
            'moveSwap',
            'moveCastle'
          ],
          onPhaseBegin: (G, ctx) => {
            const g = clone(G);
            g.players[ctx.currentPlayer].check = false;

            // Check for valid moves
            let validMoves = 0;
            let units = g.units.filter(_ => _.location === LOCATIONS.Board);
            for (const unit of units) {
              if(unit.ownership === ctx.currentPlayer)  {
                // Check for valid move and update counter
                let moves = getMovements(g, ctx, unit);
                validMoves += moves.length;
              } else {
                // Check for check
                let moves = getMovements(g, ctx, unit);
                for (const move of moves) {
                  if(move.action === MOVEMENT_ACTIONS.Capture) {
                    let u = g.units.find(_ => _.id === move.unit);
                    if(u.type === UNIT_TYPES.King) {
                      g.players[ctx.currentPlayer].check = true;
                    }
                  }
                }
              }
            }

            if(validMoves === 0) {
              // Game Over
              let opponent = ctx.currentPlayer === "0" ? "1" : "0";
              ctx.events.endGame(opponent);
            }
            
            return g;
          },
          endPhaseIf: (G, ctx) => {
            let moves = logic.getMoves(G, ctx, ctx.currentPlayer);
            return moves === 0 ? GAME_PHASES.Draw : false;
          }
        },
        { 
          name: GAME_PHASES.Draw,
          allowedMoves: (G, ctx) => ['drawCubits']
        }
      ]
    }
  });

  export default GameCore;