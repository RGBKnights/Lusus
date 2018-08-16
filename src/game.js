import { Game } from 'boardgame.io/core';
let clone = require('clone');

const GameLogic = Game({
    name: 'Lusus',
    setup: (ctx) => {
        console.log("Setup()", ctx.currentPlayer);
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
        },
        maintenance: (G, ctx) => {
            const g = clone(G);
            g.counter = 0;
            return g;
        },
    },
    flow: {
        endTurn: true,
        endPhase: true,
        endGame: true,
        phases: [
          {
            name: 'Action',
            allowedMoves: ['playCubit', 'activateCubit'],
            onPhaseBegin: (G, ctx) => {
                const g = clone(G);
                console.log("Action:onPhaseBegin()", ctx.currentPlayer);
                return g;
            },
            onPhaseEnd: (G, ctx) => {
                const g = clone(G);
                console.log("Action:onPhaseEnd()", ctx.currentPlayer);
                return g;
            },
            onTurnBegin: (G, ctx) => {
                const g = clone(G);
                console.log("Action:onTurnBegin()", ctx.currentPlayer);
                return g;
            },
            onTurnEnd: (G, ctx) => {
                const g = clone(G);
                console.log("Action:onTurnEnd()", ctx.currentPlayer);
                return g;
            },
            onMove: (G, ctx) => {
                const g = clone(G);
                console.log("Action:onMove()", ctx.currentPlayer);
                return g;
            },
          },
          {
            name: 'Movement',
            allowedMoves: ['moveUnit'],
            onPhaseBegin: (G, ctx) => {
                const g = clone(G);
                console.log("Movement:onPhaseBegin()", ctx.currentPlayer);
                return g;
            },
            onPhaseEnd: (G, ctx) => {
                const g = clone(G);
                console.log("Movement:onPhaseEnd()", ctx.currentPlayer);
                return g;
            },
            onTurnBegin: (G, ctx) => {
                const g = clone(G);
                console.log("Movement:onTurnBegin()", ctx.currentPlayer);
                return g;
            },
            onTurnEnd: (G, ctx) => {
                const g = clone(G);
                console.log("Movement:onTurnEnd()", ctx.currentPlayer);
                return g;
            },
            onMove: (G, ctx) => {
                const g = clone(G);
                console.log("Movement:onMove()", ctx.currentPlayer);
                return g;
            },
          },
          {
            name: 'Reaction',
            allowedMoves: ['activateCubit', 'moveUnit'],
            onPhaseBegin: (G, ctx) => {
                const g = clone(G);
                console.log("Reaction:onPhaseBegin()", ctx.currentPlayer);
                return g;
            },
            onPhaseEnd: (G, ctx) => {
                const g = clone(G);
                console.log("Reaction:onPhaseEnd()", ctx.currentPlayer);
                return g;
            },
            onTurnBegin: (G, ctx) => {
                const g = clone(G);
                console.log("Reaction: onTurnBegin()", ctx.currentPlayer);
                return g;
            },
            onTurnEnd: (G, ctx) => {
                const g = clone(G);
                console.log("Reaction:onTurnEnd()", ctx.currentPlayer);
                return g;
            },
            onMove: (G, ctx) => {
                const g = clone(G);
                console.log("Reaction:onMove()", ctx.currentPlayer);
                return g;
            },
          },
          {
            name: 'Maintenance',
            onPhaseBegin: (G, ctx) => {
                const g = clone(G);
                console.log("Maintenance:onPhaseBegin()", ctx.currentPlayer);
                return g;
            },
            onPhaseEnd: (G, ctx) => {
                const g = clone(G);
                console.log("Maintenance:onPhaseEnd()", ctx.currentPlayer);
                return g;
            },
            onTurnBegin: (G, ctx) => {
                const g = clone(G);
                console.log("Maintenance:onTurnBegin()", ctx.currentPlayer);
                return g;
            },
            onTurnEnd: (G, ctx) => {
                const g = clone(G);
                console.log("Maintenance:onTurnEnd()", ctx.currentPlayer);
                return g;
            },
            onMove: (G, ctx) => {
                const g = clone(G);
                console.log("Maintenance:onMove()", ctx.currentPlayer);
                return g;
            },
          },
        ],
      },
  });

  export default GameLogic;