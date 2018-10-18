import { Game } from 'boardgame.io/core';
import { 
    GAME_PHASES,
    LOCATIONS,
    // UNIT_TYPES
} from './common';

import { GameLogic } from './logic';

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
      // Movement
      skipMovement: (G, ctx) => {
        const g = clone(G);
        
        ctx.events.endPhase(GAME_PHASES.Draw);

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
          orginal.location = LOCATIONS.Afterlife;
          logic.onRemoved(g, ctx, orginal);
        }

        cubit.location = LOCATIONS.Arena;

        g.players[ctx.currentPlayer].actions_left--;
        g.players[ctx.currentPlayer].actions_used++;

        logic.onPlay(g, ctx, cubit);

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
        cubit.controller = unit.ownership;
        cubit.location = LOCATIONS.Unit;

        // Add cuits to unit
        unit.cubits.push(cubit.id);

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

        g.players[ctx.currentPlayer].actions_left--;
        g.players[ctx.currentPlayer].actions_used++;

        return g;
      },
      movePassive(G, ctx, unitId, x, y) {
        const g = clone(G);

        let result = logic.onMove(g, ctx, unitId, x, y);
        if(result) {
          return g;
        } else {
          return undefined;
        }
      },
      moveCapture(G, ctx, sourceId, destinationId) {
        const g = clone(G);

        let result = logic.onCapture(g, ctx, sourceId, destinationId);
        if(result) {
          return g;
        } else {
          return undefined;
        }
      },
      moveSwap(G, ctx, sourceId, destinationId) {
        const g = clone(G);

        let result = logic.onSwap(g, ctx, sourceId, destinationId);
        if(result) {
          return g;
        } else {
          return undefined;
        }
      },
      // Draw new Hand
      drawCubits: (G, ctx) => {
        const g = clone(G);

        // Draw
        let result = logic.onDraw(g, ctx);
        if(result) {
          return g;
        } else {
          return undefined;
        }
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
            'attachCubitToBroad'
          ],
          endPhaseIf: (G, ctx) => {
            let actions = logic.getActions(G, ctx, ctx.currentPlayer);
            return actions === 0 ? GAME_PHASES.Move : false;
          }
        },
        {
          name: GAME_PHASES.Move,
          allowedMoves: (G, ctx) => [
            'skipMovement',
            'movePassive',
            'moveCapture',
            'moveSwap'
          ],
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