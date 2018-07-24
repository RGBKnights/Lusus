# Lusus

The orginal idea of [Lusus](https://slimwiki.com/venatio-studios/actual-lusus) is brain child of Kip Wieringa. Although through months of design with Jamie Webster we have create physical prototype that allowed us to define scope of Game, its rules, parts / peices, and how they interact.

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

We need the following cubits for each team. A player can currently only have one of each type of cubit. Cubits are also split into groups based on type.

**Movement**
* King - bearer gains the movement of a King
* Queen - bearer gains the movement of a Queen 
* Bishop - bearer gains the movement of a Bishop
* Knight - bearer gains the movement of a Knight
* Rook - bearer gains the movement of a Rook 
* Pawn - bearer gains the movement of a Pawn 
* Swap - bearer gains the ability to swap with an adjacent piece as its move 
* R&B - If bearer had rook gains bishop / if bearer had bishop gain rook.   If they have neither nothing happens 
* Sidestep - one orthogonal move

**Special**
* Immune - bearer gains immunity from special effects, and the other cubies it bears cannot be targeted
* Guard - bearer gains friendly pieces it could attack cannot be taken
* -1 Draw - bearer causes the player to draw one less cubie
* +1 Draw - bearer causes the player to draw one more cubie
* Sticky Feet - bearer's movement is restricted to one space
* Disarm - bearer cannot make moves that take pieces
* Enrage - bearer cannot make moves that do not take pieces
* Phase - bearer gains the ability to move through one piece when it moves
* Double Action
* Spring - this piece can continue diagonal movement bouncing off other pieces and walls.  as well another pieces can do the same, bouncing off this piece 
* Deadspace - uses up a slot
* Condemn - uses up 2 slots
* Wrap - bearer gains the ability to wrap around the left and right sides of the board
* Ghost - peieces around the ghost can not move
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

**One Time Use**
* Dispel - Remove 1 Any - send any cubie in a slot to the graveyard
* Knockout - Remove All - send all cubies on a piee to the graveyard
* Disenchant - Remove 1 Special - send any Special cubie in a slot to the graveyard
* Trip - Remove 1 Movement - send any Movement cubie in a slot to the graveyard
* Ensnare - Remove All Movement - send all Movement cubie in a slot to the graveyard
* Delay - Discard All to bag
* Backstab - Discard 2 at random to grave
* Life tap - Discard 2 at random to my bag
* Heal - Recover 3 from your gravyard
* Recycle - use a cubie in your graveyard instead of this one 
* Trade - Swap any two cubies

## Game Flow

## States

The following are states Units and Cubits can be in and must be in one of the following state. 
We broke up the states each type can be in.

**Chessmen**
* Board
* Exile

**Cubits**
* Bag
* Hand
* Field
* Graveyard
* Exile
* Board

## Transitions