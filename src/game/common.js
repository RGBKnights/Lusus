export const GAME_FLOW = {
  Unknown: '',
  Lobby: 'Start',
  Occurring: 'Occurring',
  GameOver: 'End',
};

export const GAME_PHASES = {
  Unknown: '',
  Play: 'Play',
  Move: 'Move',
  Draw: 'Draw',
};

// https://docs.google.com/spreadsheets/d/1zCMueghs-PBdr3HhSXKGGcOPpCqyDbhRKm_A3itCUCg/edit#gid=0
export const CUBIT_TYPES = {
  Unknown: '',
  MovementOrthogonal: '4ca1291d-5298-ea4a-8b6b-6ffbfdeefda1',
  // adds orthogonal movement to unit
  MovementDiagonal: 'b1cc8951-61af-0cf3-9e71-d2db03885226',
  // adds diagonal movement to unit
  MovementCardinal: 'a39e2c74-0968-eb73-7ea8-c71b21608685',
  // adds cardinal movement to unit
  MovementJump: '2ca5a85e-116a-7971-6bbb-693d17f6ce3f',
  // adds jump [2,1] movement to unit
  MovementSideStep: 'd1f075a1-2d8c-8b2a-5776-b5c711134e67',
  // adds side step 1 movement to unit
  MovementSwap: '0b6d75f8-a2c2-29dc-e32c-c53a0fb1aeea',
  // adds swap to unit
  DrawNegOne: '68308f8c-2087-b64d-7bd8-97b98488e5aa',
  // -1 to draw to opppents draw
  DrawPlusOne: '1fa0d186-0237-e13e-7449-f54092211149',
  // +1 to draw to players draw
  DoubleAction: '40617317-15e1-5aa3-8cdd-3d3d131e9b4f', 
  // +1 action to the player
  Knowledge: '0994b86a-4709-f096-63c9-07c6e1008bfd',
  // Reveral the oppents hand
  Condemn: 'b0dca050-b7d4-f83a-554f-4cfc4f2c7854',
  // Attach
  KingOfHill: '99d4a12e-e368-7700-5cd0-46548040fced',
  // When King moves on to this cubit on the field then that play wins the game
  Enrage: '765857db-7109-4b3a-b12f-2657ac4cc3cd',
  // This unit can not make capture moves
  Passify: '93eeb236-e43a-4b72-9f1f-5fb3687474fe',
  // This unit can not make passive moves
  StickyFeet: 'c74980b0-c356-4990-92fa-3b1a202770d0',
  // This piece cannot move more than one space
  Encumber: '35fb4558-7f55-46bb-afd8-78bee2d71d66',
  // The unit gets -1 move for ever cubie on that unit
  Immunity: '8faf8b97-5e47-4ac2-a5f2-0616120a4adb',
  // This piece cannot be targeted by opponents, other cubies on this piece cannot be targeted by opponnents


  BacktoBasics: '3b9d5f24-daaa-485c-810d-7efc969024de',
  // Aerna
  // All other cubies have no effect
  // onPlay() => set g.effects.basics = true; 
  // TODO: update all checks for this value when testing for Cubit affects
  AncientRevival: '10e38ff2-2954-43f5-9a06-b11fcc06fad9', 
  // Trap
  // When this piece is captured, return it to the board to an unoccupied space, of your choice, in your back line after your opponnets next turn
  // onCapture() => encapsulate Unit in Cubit (Revival); add Duration(turns, 0/1); move to Avator (if there is space in the []);
  // onActivate() w / target => reveal Unit in Cubit and move to target exile Cubit
  BlinkDodge: 'a80cd286-9e00-4ea1-9356-744d663b9098',     
  // Trap
  // When this piece would be taken instead move it to a random unoccupied adjacent space. If none, it is taken
  // onCapture() => Move to random unoccupied adjacent space; if none move to afterlife
  CostofPower: '55168e9e-06f6-4cfe-bbdc-149a86173b5e',
  // *NEEDS WORK*  
  // Avatar
  // Each player draws an additional card and loses a random cubie from the bag
  // onDraw() => find Cubit; if exists remove random cubie;
  // HOW: loses a random cubie from the bag...?
  DarkMagic: '19c2696e-d456-482c-bb5b-d2abd8c80486',  
  // *NEEDS WORK*  
  // Trap 
  // On capture, you may take (select) a cubie from the afterlife and put it on this piece
  // onCapture() => g.players[].reaction = true; 
  // HOW: onReaction() /w target => move cubit from unit in afterlife to this unit (if able);
  ForgottenPast: '269a550a-ea97-46a4-890f-395f45d3c440',  
  // Avatar 
  // Exile everything in the afterlife
  // onPlay() => find all cubits in the afterlife move them to exile
  Heirloom: '5f510368-b76e-4a9b-9f29-96ca821ba26b',       
  // Trap
  // When captured, put your cubies into bag instead of attached to piece in afterlife.
  // onCapture() => move cubits from unit to bag
  ArenaHole: '7ee25860-b996-442d-95da-9bd0a447cff3',   
  // *NEEDS WORK*   
  // Arena
  // Randomly select X unoccupied spaces not on the back lines, those are now Hole spaces.
  // onPlay() => add this cubits X times to field at random locations;
  // HOW:  You can move over but not land on a hole
  ArenaRock: 'e281b0bd-8a1f-4e9a-9db0-b1cdfe978151', 
  // *NEEDS WORK*  
  // Arena
  // Randomly select X unoccupied spaces not on the back lines, those are now Rock spaces. 
  // onPlay() => add this cubits X times to field at random locations;
  // HOW: Blocks movement, cannot land on rock
  ArenaIce: '88f8c963-c40e-4205-b10d-a540d2186177',  
  // *NEEDS WORK* 
  // Arena
  // Randomly select X spaces not on the back lines, those are now Ice spaces.
  // onPlay() => add this cubits X times to field at random locations;
  // HOW: Ice froces continus movement
  Jumper: '99d14233-f9c8-40d2-b4c6-6e3fe025829f',
  // *NEEDS WORK*
  // Units
  // Cardinal patern movement; distance = 2;
  // Passive - Movement
  // HOW: CardinalMovement + Movement.phased = true;
  Looter: '9a226a0f-4d19-41e7-852e-856275875f89',
  // Units   
  // On capture, put a random cubit into your bag instead of attached to piece in afterlife.
  // onCapture() => move cubits from this unit to bag
  Mulligan: '664882e5-df52-4396-b90c-77b84956342e',     
  // Avatar
  // You shuffle your hand back in and draw a new one, you get one additional action this turn
  // onPlay() => move cubits from hand to bag; move cubits from bag to hand; g.players[].actions.count--;
  Nab: 'e07970c5-a967-4c4a-903a-4b2502b2a9b1',
  // *NEEDS WORK*          
  // Avatar
  // Look at your opponents hand, you may play one of their cubies
  // onActivate() /w target => move from there hand to yours
  // HOW: update board if target location isHidden() then override to true
  Poisoned: 'abbc5454-2714-4e80-aa2e-674a4a19cc99',
  // Units
  // After this piece makes 3 moves it is removed
  // onMove() => unit.moves > 3 then move unit to afterlife
  Poof: '319017f3-f943-4c41-b465-15ceea4b9059',           
  // Board - Unit
  // Remove a piece from the board marking its location. It is gone until your next turn;
  // onPlay() => unit is marked as obustrtion = false, locked = true; (can't move)
  // onReturn() => remove any unit at target location
  Reckless: '6b6b78fa-d42c-4713-ad1d-e3672786005e',       
  // Arena
  // Once placed the player that reachs 2d6 pieces in the afterlife you win
  // [Proxy] onCapture() => check afterlife for number of units if > 2d6 then you win the game
  Resourceful: '517c0bc3-1ed3-462e-ba23-018e61366005',   
  // Avatar 
  // Draw a new hand with one less card
  // onActivated() => moves cubits in hand to bag; draws new hand; Consumable
  Revert: 'c647e8f2-3d4c-42cc-af90-9b0053617151',     
  // *NEEDS WORK*   
  // Units 
  // If unit is captured the move is reverted; Consumable
  // onCapature() => remove this cubit from unit; [ShortCurit]
  RockThrow: '18301f0f-05e3-41f9-9f66-052a5485f0e1',    
  // *NEEDS WORK*   
  // Field
  // Select 3 unoccupid spaces. Those spaces act as if they are occupied by a peice
  // onPlay() => add 3 cubits to field based on the 3 targets
  // HOW: to select mulitple targets...?
  Sacrifice: 'b01a5d36-0f89-4264-a89a-a46554a1700a', 
  // *NEEDS WORK*     
  // Field
  // The unit must remove a Cubit to move away from this space
  // HOW: 
  Taunt: 'c2b27e7d-343e-416d-bac3-149fe48da9eb',   
  // *NEEDS WORK*       
  // Units
  // If the opposing team can take this piece as their move, they must do so, single target only
  // Passive
  // HOW: update getTarget() to focus movement
  ThunderDome: 'dea9abe7-230f-4448-a1c0-ecd37fb393aa',    
  // *NEEDS WORK* 
  // Arena
  // You cannot make passive moves if a capture is available
  // Passive
  // HOW: update getTarget() to focus movement
  Timebomb: '259d4841-a8a9-483b-ab78-bfb024184400',      
  // Fields
  // Start a 3 turn timer, count it down at end of each turn; at 0 detonate it destroying all pieces on that, and the sourrounding spaces
  // onPlay() => turns++; turns > 3; remove all units at location and sourrounding spaces
};

export const UNIT_TYPES = {
  Unknown: 0,
  All: 1,
  Common: 2,
  Royal: 3,
  King: 4,
  Queen: 5,
  Bishop: 6,
  Rook: 7,
  Knight: 8,
  Pawn: 9
};

export const CLASSIFICATIONS = {
  Unknown: 0,
  Movement: 1,
  Encumbered: 2,
  Immunity: 3,
};

export const MOVEMENT_TYPES = {
  Unknown: 0,
  Orthogonal: 1,  // King, Queen, Rooks
  Diagonal: 2,    // King Queen, Bishop
  Jump: 3,        // Knights
  Fork: 4,        // Pawn
  Forward: 5,     // Pawn
  Castle: 6,      // King
  Swap: 7,        // [New]
  Backwards: 8,   // [NEW]
  Sidestep: 9,    // [NEW]
};

export const MOVEMENT_ACTIONS = {
  Unknown: 0,
  Passive: 1,
  Capture: 2,
  Swap: 3,
  Castle: 4,
};

export const MOVEMENT_CONSTRAINTS = {
  Unknown: 0,
  Passive: 2,
  Agressive: 3,
};

export class Movement {
  constructor(type, constraint, distance = 0, steps = [], phased = false) {
    this.type = type;
    this.constraint = constraint;
    this.distance = distance;
    this.steps = steps;
    this.phased = phased;
  }
}

export class Move {
  constructor(action, x, y, unit = null) {
    this.action = action;
    this.x = x;
    this.y = y;
    this.unit = unit;
  }
}

export const UNIT_FILE = {
  Unknown: 0,
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
};

export const DURATION_TYPES = {
  Unknown: 0,
  Turn: 1,
  Move: 2,
};

export const LOCATIONS = {
  Unknown: 0,
  Arena: 1,
  Player: 2,
  Unit: 3,
  Board: 4,
  Afterlife: 5,
  Bag: 6,
  Exile: 7,
  Hand: 8,
};

export const TARGET_CONSTRAINTS = {
  Unknown: 0,
  Self: 1,
  Opponent: 2,
};

export class Targeting {
  constructor(location) {
    // LOCATIONS
    this.location = location;
  }
}

export class ArenaTargeting extends Targeting {
  constructor() {
     super(LOCATIONS.Arena);
  }
}

export class UnitTargeting extends Targeting {
  constructor(constraint, targets = 1, type = UNIT_TYPES.All, attachment = true) {
    super(LOCATIONS.Unit);

    this.constraint = constraint;
    this.targets = targets;
    this.type = type;
    this.attachment = attachment;
  }
}

export class HandTargeting extends Targeting {
  constructor(constraint) {
    super(LOCATIONS.Hand);

    this.constraint = constraint;
  }
}

export class PlayerTargeting extends Targeting {
  constructor(constraint, attachment = true) {
    super(LOCATIONS.Player);

    this.constraint = constraint;
    this.attachment = attachment;
  }
}

export class BoardTargeting extends Targeting {
  constructor(targets = 1, occupied = false) {
    super(LOCATIONS.Board);

    this.targets = targets;
    this.occupied = occupied;
  }
}

export class Target {
  constructor(location, targets = 1) {
    // LOCATIONS
    this.location = location;
    this.targets = targets;
  }
}

export class ArenaTarget extends Target {
  constructor() {
    super(LOCATIONS.Arena);
  }
}

export class UnitTarget extends Target {
  constructor(player, units, targets = 1) {
    super(LOCATIONS.Unit, targets);

    this.player = player; // "0" OR "1"
    this.units = units;
  }
}

export class HandTarget extends Targeting {
  constructor(player) {
    super(LOCATIONS.Hand);

    this.player = player; // "0" OR "1"
  }
}

export class PlayerTarget extends Target {
  constructor(player) {
    super(LOCATIONS.Player);

    this.player = player;  // "0" OR "1"
  }
}

export class BoardTarget extends Target {
  constructor(positions, targets = 1) {
    super(LOCATIONS.Board, targets);

    this.positions = positions;
  }
}