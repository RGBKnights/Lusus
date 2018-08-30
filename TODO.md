# Lussus

##  Players

How players are indenitied within the system...

* NUll - Spectators
* "0" - Player 1
* "1" - Player 2

##  Board

The diferent type of boards in the system...

* ID: Number
* Name: String      // Display name for UI
* Size: (w/h)       // Width,Height
* Owner: String     // Player ~ "0" or "1"

##  Targets

* Locations: [{ Player: Number, Board: Number, X: Number, Y: Number }]
* Type: Passive / Capture / Activate (Self)

## Phases / Moves

These are the moves break up to which phases they are aviable in...

### Armory

* Select Bag

### Lobby

* Ready Up

### Play

* Select Cubit
* Play Cubit
* Activate Cubit
* Move Cubit

### Gameover

* Offer Rematch
* Accept Rematch

## Cubits

### Static
* Id: UUID
* Name: String
* Description: String
* Types: [String, String, String]
* Rarity: 0,1,2,3,4,5
* Movement: { Distance: Number, Steps: [Number, Number] }
* Hidden: Bool
* Durration: { type: Move/Turn, amount: Number }

### Dynamic
* Locations: [{ Player: Number, Board: Number, X: Number, Y: Number }] // yes there can be many!
* Ownership: String
* Controller: String
* Moves: Number
* Turns: Number
* Childern: [Cubit, Cubits, Cubits]

### Functions
* OnSelected() -> update targets, set required number of targets (before action is submited)
* OnActivated() -> call on self and its childern
* OnPlayed() -> call on self and its childern
* OnMoved() -> call on self and its childern
* IsAlive() -> bool based on Location.Board
* IsHidden() -> bool based on Hidden flag and/or Knownedgle of hand
* HasChild(ID, depth) -> bool based Childern[].Id and childern of child