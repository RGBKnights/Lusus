import { Game } from 'boardgame.io/core';
import { 
    GAME_PHASES,
    LOCATIONS,
    UNIT_TYPES
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
      skipActions: (G, ctx) => {
        const g = clone(G);
        g.players[ctx.currentPlayer].actions = 0;
        return g;
      },
      // Movement
      skipMovement: (G, ctx) => {
        const g = clone(G);
        g.players[ctx.currentPlayer].moves = 0;
        return g;
      },
      // Attach Cubit to Location
      attachCubitToArena: (G, ctx, cubitId) => {
        const g = clone(G);

        let cubit = g.cubits.find(_ => _.id === cubitId);
        if(!cubit) {
          return undefined;
        }

        let orginal = g.cubits.find(_ => _.locations === LOCATIONS.Arena);
        if(orginal) {
          orginal.location = LOCATIONS.Afterlife;
        }

        cubit.location = LOCATIONS.Arena;

        g.players[ctx.currentPlayer].actions--;

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

        g.players[ctx.currentPlayer].actions--;

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
        cubit.position = unit.position;
        cubit.controller = unit.ownership;

        // Update Unit
        unit.cubits.push(cubit);

        g.players[ctx.currentPlayer].actions--;

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

        g.players[ctx.currentPlayer].actions--;

        return g;
      },
      movePassive(G, ctx, unitId, x, y) {
        const g = clone(G);

        let unit = g.units.find(_ => _.id === unitId);
        if(!unit) {
          return undefined;
        }

        logic.onMove(g, ctx, unit, x, y);

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

        if(destination.type === UNIT_TYPES.King) {
          // GameOver
          ctx.events.endGame(ctx.currentPlayer);
        } else {
          // Move Source to Destination
          source.position.x = destination.position.x;
          source.position.y = destination.position.y;
          source.moves++;

          for (const cubit of source.cubits) {
            cubit.position.x = source.position.x
            cubit.position.y = source.position.y;
            cubit.moves++;
          }

          // Move destination to Afterlife
          destination.location = LOCATIONS.Afterlife;

          for (const cubit of destination.cubits) {
            cubit.location = LOCATIONS.Afterlife;
          }

          g.players[ctx.currentPlayer].moves--;
        }

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
        
        let x = source.position.x;
        let y = source.position.y;

        source.position.x = destination.position.x;
        source.position.y = destination.position.y;
        source.moves++;

        for (const cubit of source.cubits) {
          cubit.position.x = source.position.x
          cubit.position.y = source.position.y;
          cubit.moves++;
        }

        destination.position.x = x;
        destination.position.y = y;
        destination.moves++;

        for (const cubit of destination.cubits) {
          cubit.position.x = destination.position.x
          cubit.position.y = destination.position.y;
          cubit.moves++;
        }

        g.players[ctx.currentPlayer].moves--;

        return g;
      },
      // Draw new Hand
      drawCubits: (G, ctx) => {
        const g = clone(G);

        // Draw
        let result = logic.onDraw(g, ctx);
        if(result) {
          // Reset Action Counter to Activity Count
          g.players[ctx.currentPlayer].actions = logic.getActivities(G, ctx, ctx.currentPlayer);
          g.players[ctx.currentPlayer].moves = 1;

          // End turn frist and end phase reseting to 'Play'
          ctx.events.endTurn();
          ctx.events.endPhase();
        } else {
          // GameOver
          let opponent = ctx.currentPlayer === "0" ? "1" : "0"
          ctx.events.endGame(opponent);
        }

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
            'skipActions',
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
          name: GAME_PHASES.Action,
          allowedMoves: (G, ctx) => ['skipActions'],
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