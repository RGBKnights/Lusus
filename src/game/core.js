import { Game } from 'boardgame.io/core';
import { 
    GAME_PHASES,
    LOCATIONS,
    TARGET_TYPES
} from './common';
import { findLocation } from './locations';
import { GameLogic } from './logic';

var clone = require('clone');

let logic = new GameLogic();

/*
ctx: {
    "numPlayers": 2,
    "turn": 0,
    "currentPlayer": "0",
    "currentPlayerMoves": 0,
    "playOrder": [
        "0",
        "1"
    ],
    "playOrderPos": 0,
    "stats": {
        "turn": {
            "numMoves": {},
            "allPlayed": false
        },
        "phase": {
            "numMoves": {},
            "allPlayed": false
        }
    },
    "allPlayed": false,
    "phase": "Action",
    "actionPlayers": [
        "0"
    ],
    "allowedMoves": null
}
*/

const GameCore = Game({
    name: 'Lusus',
    setup: (ctx) => {
        let data = {};
        logic.initialize(data, ctx);
        return data;
    },
    moves: {
        draw: (G, ctx) => {
            const g = clone(G);
            if(logic.onPlay(g, ctx) === false) {
                return;
            }
            return g;
        },
        activateCubit: (G, ctx) => {
            const g = clone(G);
            return g;
        },
        playCubit: (G, ctx, source, destination) => {
            // Clone
            const g = clone(G);
            
            // Get Source &  Destination Location
            let sl = findLocation(source.l);
            let dl = findLocation(destination.l);

            // Get Cubit at Source
            let cubit = sl.removeItem(g, ctx, source.c, source.x, source.y);

            // Set Cubit at Destination
            if( dl.setItem(g, ctx, destination.c, cubit, destination.x, destination.y) === false) {
                return; // invalid Destination
            }

            // Cubit logic
            if(logic.onPlay(g, ctx, source, destination, cubit) === false) {
                return; // invalid Action
            }

            // Return game state
            return g;

        },
        moveUnit: (G, ctx, source, destination) => {
            // Clone
            const g = clone(G);

            // Get Location
            let board = findLocation(LOCATIONS.Board);
            let afterlife = findLocation(LOCATIONS.Afterlife);

            // Remove unit at location
            let sourceUnit = board.removeItem(g, ctx, null, source.x, source.y);

            // Get Cubit at Source
            let destinationUnit = board.removeItem(g, ctx, null, destination.x, destination.y);
            if(destinationUnit) {
                if(destination.t === TARGET_TYPES.Agressive) {
                    // Capture Oponent
                    if(board.setItem(g, ctx, null, sourceUnit, destination.x, destination.y) === false) {
                        return; // invalid Destination
                    }

                    if(logic.onMove(g, ctx, source, destination, sourceUnit) === false) {
                        return; // invalid Action
                    }

                     // Move destination to afterlife
                     if(afterlife.setItem(g, ctx, destinationUnit.ownership, destinationUnit) === false) {
                        return; // invalid Destination
                    }

                    if(logic.onCapture(g, ctx, source, destination, sourceUnit, destinationUnit) === false) {
                        return; // invalid Action
                    }

                } else if(destination.t === TARGET_TYPES.Passive) {
                    // Swap
                    if(board.setItem(g, ctx, null, sourceUnit, destination.x, destination.y) === false) {
                        return; // invalid Destination
                    }

                    if(logic.onMove(g, ctx, source, destination, sourceUnit) === false) {
                        return; // invalid Action
                    }

                    if(board.setItem(g, ctx, null, destinationUnit, source.x, source.y) === false) {
                        return; // invalid Destination
                    }

                    if(logic.onMove(g, ctx, source, source, destinationUnit) === false) {
                        return; // invalid Action
                    }
                }
            } else {
                // Move Unit to target
                if(board.setItem(g, ctx, null, sourceUnit, destination.x, destination.y) === false) {
                    return; // invalid Destination
                }

                if(logic.onMove(g, ctx, source, destination, sourceUnit) === false) {
                    return; // invalid Action
                }
    
            }

            return g;
        }
    },
    flow: {
        /*
        // End the turn automatically after a certain number of moves 
        // (default: undefined, i.e. the turn does not automatically end after a certain number of moves).
        movesPerTurn: undefined,

        // The turn automatically ends if this returns a truthy value (checked after each move). 
        // If the return value is a playerID, that player is the next player (instead of following the turn order).
        endTurnIf: (G, ctx) => false,

        // The game automatically ends if this function returns anything (checked after each move).
        // The return value is available at ctx.gameover.
        endGameIf: (G, ctx) => {},

        // Any code to run when a turn begins.
        onTurnBegin: (G, ctx) => G,

        // Any code to run when a turn ends.
        onTurnEnd: (G, ctx) => G,

        // Any code to run at the end of a move.
        onMove: (G, ctx, { type: 'moveName', args: [] }) => G,

        // Customize the turn order (see turn-order.js).
        turnOrder: TurnOrder.DEFAULT,

        // Set to false to disable the `endTurn` event.
        endTurn: true,

        // Set to false to disable the `endPhase` event.
        endPhase: true,

        // Set to true to enable the `endGame` event.
        endGame: true,

        // Set to true to enable the `setActionPlayers` event.
        setActionPlayers: true,

        // List of moves that are allowed.
        // This can be either a list of move names or a function with the signature (G, ctx) => [].
        // (default: null, i.e. all moves are allowed).
        allowedMoves: (G, ctx) => [],

        // List of moves that are undoable, (default: null, i.e. all moves are undoable).
        undoableMoves: null,

        // Control whether a move should be executed optimistically on
        // the client while waiting for the result of execution from the server.
        optimisticUpdate: (G, ctx, move) => false,

        // A list of phases in the game
        phases: [],
        */

        endTurn: true,
        endPhase: true,
        endGame: true,
        phases: [
            /*
            {
                // Phase name
                name: 'phase_name',
            
                // Any setup code to run before the phase begins.
                onPhaseBegin: (G, ctx) => G,
            
                // Any cleanup code to run after the phase ends.
                onPhaseEnd: (G, ctx) => G,
            
                // The phase ends if this function returns a truthy value.
                // If the return value is the name of another phase,
                // that will be chosen as the next phase (as opposed
                // to the next one in round-robin order).
                endPhaseIf: (G, ctx) => false,
        
                // A phase-specific endTurnIf.
                endTurnIf: (G, ctx) => false,
            
                // A phase-specific endGameIf.
                endGameIf: (G, ctx) => {},
            
                // A phase-specific onTurnBegin
                onTurnBegin: (G, ctx) => G,
            
                // A phase-specific onTurnEnd.
                onTurnEnd: (G, ctx) => G,
            
                // A phase-specific onMove.
                onMove:(G, ctx) => G,
            
                // A phase-specific turnOrder.
                turnOrder: TurnOrder.DEFAULT,
            
                // A phase-specific movesPerTurn.
                movesPerTurn: undefined,
            
                // List of moves or a function that returns a list of moves
                // that are allowed in this phase.
                allowedMoves: (G, ctx) => [],
            
                // List of moves that are undoable.
                undoableMoves: [],
            },
            */
            {
                name: GAME_PHASES.Action,
            },
            {
                name: GAME_PHASES.Move,
            },
            {
                name: GAME_PHASES.Draw,
            },
        ],
        optimisticUpdate: (G, ctx, move) => false,
    }
  });

  export default GameCore;