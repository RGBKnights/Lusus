## TODO

### vNext Steps

FEATURES:

1. Check
a. OnMove() => reslove effects AND set player.check = true; THEN at OnBeginPhase of 'Move' set player.check = true 
2. Move - Castle
a. simulate moves? or just jump it forward check for check & that each units move counter is 0
3. More Cubits: 

### Components of Framework

Context
```
// Number of players 
numPlayers: 2,

// Which turn is it
turn: 0,

// Which players turn is it
currentPlayer: '0',

// Number of moves the current player has completed
currentPlayerMoves: 0,

// The order of turns - default round robin 
playOrder: ['0','1'],

// Whos turn is it
playOrderPos: 0,

// all moved are exhusted
allPlayed: false,

// Which phase of the turn is the player in
phase: Action,

// Which players can preform actions currently
actionPlayers: ['0'],

// Allow moves for this phase
allowedMoves: null

// Gameover
gameover: {}
```

Flow

```
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
phases: []
```

Phase

```
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
```