# Lusus

The original idea of [Lusus](https://slimwiki.com/venatio-studios/actual-lusus) is brain child of Kip Wieringa.
Although through months of design with Jamie Webster we have create physical prototype that allowed us to define scope of Game, its rules, parts / pieces, and how they interact.

## Inventory

* 1 Chessboard (standard size 8x8)
* 32 Chessmen (16 for each team)
* 90 Cubits (45 for each team)

### Chessmen

We need the following units for each team.

* King
* Queen
* Bishop x2
* Knight x2
* Rook x2
* Pawn x8

### Cubits

We need the following Cubits for each team.
A player can currently only have one of each type of cubit.
Cubits are also split into groups based on type.

**Movement**
* King - bearer gains the movement of a King
* Queen - bearer gains the movement of a Queen 
* Bishop - bearer gains the movement of a Bishop
* Knight - bearer gains the movement of a Knight
* Rook - bearer gains the movement of a Rook 
* Pawn - bearer gains the movement of a Pawn 
* Swap - bearer gains the ability to swap with an adjacent piece as its move 
* R&B - If bearer had rook gains bishop / if bearer had bishop gain rook.
If they have neither nothing happens 
* Sidestep - one orthogonal move

**Special**
* Immune - bearer gains immunity from special effects, and the other Cubits it bears cannot be targeted
* Guard - bearer gains friendly pieces it could attack cannot be taken
* -1 Draw - bearer causes the player to draw one less Cubit
* +1 Draw - bearer causes the player to draw one more Cubit
* Sticky Feet - bearer's movement is restricted to one space
* Disarm - bearer cannot make moves that take pieces
* Enrage - bearer cannot make moves that do not take pieces
* Phase - bearer gains the ability to move through one piece when it moves
* Double Action - The host gains the ability to play an extra Cubit from there hand each turn.
* Spring - this piece can continue diagonal movement bouncing off other walls.
* Condemn - uses up the rest of the slots
* Wrap - bearer gains the ability to wrap around the left and right sides of the board
* Ghost - pieces around the ghost can not move
* Immobilized - cant move at all 
* Hit & Run - On Capture make a passive move
* Knowledge - Opponent hand revealed
* Boulder dash - for every contiguous unoccupied space moved, you may take an additional piece after the first
* Thief - On Capture put on of the captured pieces cubes on this piece

**Traps**
* Revenge - When this piece is taken capture the capturer
* No Draw - When this piece is taken the opposing player does not draw a new hand
* Revert (undo) - When this piece is taken revert the last move
* Dodge- instead of being captured move to one of the surrounding spaces
* Transfusion - put the captures pieces tiles into the bag 
* Bequeath - put a select tile from the captured piece into your hand

**Disposable**
* Dispel - Remove 1 Any - send any Cubit in a slot to the graveyard
* Knockout - Remove All - send all Cubits on a peace to the graveyard
* Disenchant - Remove 1 Special - send any Special Cubit in a slot to the graveyard
* Trip - Remove 1 Movement - send any Movement Cubit in a slot to the graveyard
* Ensnare - Remove All Movement - send all Movement Cubit in a slot to the graveyard
* Delay - Discard All to bag
* Backstab - Discard 2 at random to grave
* Life tap - Discard 2 at random to my bag
* Heal - Recover 3 from your graveyard
* Recycle - use a Cubit in your graveyard instead of this one 
* Trade - Swap any two Cubits

## Game Flow

### States

The following are states Units and Cubits can be in and must be in one of the following state. 
We broke up the states each type can be in. Setup is a special type that represents the initial state of the game.

**Chessmen**
* Setup
* Board
* Captured

**Cubits**
* Setup
* Bag
* Hand
* Field
* Graveyard
* Board - future use case

### Transitions

Chessmen and Cubits can only transitions between a few different states at one time based on the flow of the game. 
Although the specifics will be based on each Cubit.

**Chessmen**
* Setup => Board
* Board => Captured
* Board => Promoted => Board

**Cubits**
* Setup => Bag
* Bag => Hand
* Hand => Bag
* Hand => Field
* Hand => Graveyard
* Field => Hand
* Field => Graveyard
* Graveyard  => Hand
* Graveyard  => Field
* Graveyard  => Bag

### Moves
* PlayCubits - play a cube from hand to field. Playing a cube must have a valid target. 
The target may be a unit, an opponent, or self.
* MoveUnit - unit from a position to another position on the board. 
Moving a unit must of a source and destination.
* DiscardCubits - discard required number of Cubits from hand to bag.
* DrawCubits - draw the required number of Cubits from bag to hand.

### Phases

**Play**
* Move limits: [PlayCubits]
* The play phase should end after the PlayCubits() move and its side effects are resolved. 
It should also have a option to skip if there is not valid target.

**Move**
* Move limits: [MoveUnit]
* The move phase should end after MoveUnit() move.

**Discard**
* Move limits: [DiscardCubits]
* The discard phase should end after DiscardCubits() move.

**Draw**
* Move limits: [DrawCubits]
* The draw phase should automatically end after the DrawCubits() move. 
If the player can not draw the correct number of Cubits required that player loses the game. 
The draw step can not be skipped.

### Turns

Each player turns are a sequential collection of phases. These are as follows:

* Play
* Move
* Discard
* Draw

Each players Setup consist of the classical chessmen position on the board. 
As well as each player drawing the starting number of Cubits. 
Start Draw Amount for White and the Start Draw Amount for Black after which it returns to the default draw amount unless altered by a Cubit. 
As with standard chess (White) takes the 1st turn. 
In our case Player '0' is always (White) and Player '1' is always (Black).

### End Game

Winning the game is done by capturing the opponent's King unit. 

> NOTE: this different then classic checkmate!

There are also a Lose condition for players that can not draw the correct number of Cubits when they are required to draw. 
Under the current design a draw is not possible, a player will "Deck Out" before the other so the Draw result dose not need to be considered. 
With all things being equal (White) should lose if the players drag it to an empty bag.

### Setup Game

The initial game setup should have the following steps:
* populate bag with cubits
* shuffle bag
* add units to start positions on board
* add starting cubits to units
* draw starting hand

## Game Variables / Constants

Below are the list of game Variables & Constants with their values.

* Number of Players: 2
* Default Draw Amount: 3
* Bag Size: 45
