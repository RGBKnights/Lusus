import { Game } from 'boardgame.io/core';
let clone = require('clone');

const GameLogic = Game({
    name: 'Lusus',
    setup: (ctx) => {
        return { counter: 0 }
     },
    moves: {
        playCubit: (G, ctx) => {
            const g = clone(G);
            g.counter++;
            return g;
        },
        activateCubit: (G, ctx) => {
            const g = clone(G);
            g.counter++;
            return g;
        },
        moveUnit: (G, ctx) => {
            const g = clone(G);
            g.counter++;
            return g;
        }
    },
    flow: {
        endTurn: true,
        endPhase: true,
        endGame: true,
        phases: [
        {
            name: 'Upkeep'
        },
        {
            name: 'Action',
            allowedMoves: ['playCubit', 'activateCubit'],
            onPhaseBegin: (G, ctx) => {
                const g = clone(G);
                console.log("Action:onPhaseBegin(" + ctx.turn + ")", ctx.currentPlayer);
                return g;
            },
            onPhaseEnd: (G, ctx) => {
                const g = clone(G);
                console.log("Action:onPhaseEnd(" + ctx.turn + ")", ctx.currentPlayer);
                return g;
            },
            onMove: (G, ctx) => {
                const g = clone(G);
                console.log("Action:onMove(" + ctx.turn + ")", ctx.currentPlayer);
                return g;
            },
          },
          {
            name: 'Movement',
            allowedMoves: ['moveUnit'],
            onPhaseBegin: (G, ctx) => {
                const g = clone(G);
                console.log("Movement:onPhaseBegin(" + ctx.turn + ")", ctx.currentPlayer);
                return g;
            },
            onPhaseEnd: (G, ctx) => {
                const g = clone(G);
                console.log("Movement:onPhaseEnd(" + ctx.turn + ")", ctx.currentPlayer);
                return g;
            },
            onMove: (G, ctx) => {
                const g = clone(G);
                console.log("Movement:onMove(" + ctx.turn + ")", ctx.currentPlayer);
                return g;
            },
          },
          {
            name: 'Reaction',
            allowedMoves: ['activateCubit', 'moveUnit'],
            onPhaseBegin: (G, ctx) => {
                const g = clone(G);
                console.log("Reaction:onPhaseBegin(" + ctx.turn + ")", ctx.currentPlayer);
                return g;
            },
            onPhaseEnd: (G, ctx) => {
                const g = clone(G);
                console.log("Reaction:onPhaseEnd(" + ctx.turn + ")", ctx.currentPlayer);
                return g;
            },
            onMove: (G, ctx) => {
                const g = clone(G);
                console.log("Reaction:onMove(" + ctx.turn + ")", ctx.currentPlayer);
                return g;
            },
          },
          {
            name: 'Maintenance',
            onPhaseBegin: (G, ctx) => {
                const g = clone(G);
                console.log("Maintenance:onPhaseBegin(" + ctx.turn + ")", ctx.currentPlayer);
                return g;
            },
            onPhaseEnd: (G, ctx) => {
                const g = clone(G);
                console.log("Maintenance:onPhaseEnd(" + ctx.turn + ")", ctx.currentPlayer);
                return g;
            },
            onMove: (G, ctx) => {
                const g = clone(G);
                console.log("Maintenance:onMove(" + ctx.turn + ")", ctx.currentPlayer);
                return g;
            },
          },
        ],
      },
  });

  export default GameLogic;