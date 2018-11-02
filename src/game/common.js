export const GAME_PHASES = {
  Unknown: '',
  Lobby: 'Lobby',
  Play: 'Play',
  Move: 'Move',
  Draw: 'Draw',
};

// https://docs.google.com/spreadsheets/d/1zCMueghs-PBdr3HhSXKGGcOPpCqyDbhRKm_A3itCUCg/edit#gid=0
export const CUBIT_TYPES = {
  Unknown: '',
  MovementOrthogonal: '4ca1291d-5298-ea4a-8b6b-6ffbfdeefda1',
  MovementDiagonal: 'b1cc8951-61af-0cf3-9e71-d2db03885226',
  MovementCardinal: 'a39e2c74-0968-eb73-7ea8-c71b21608685',
  MovementJump: '2ca5a85e-116a-7971-6bbb-693d17f6ce3f',
  MovementSideStep: 'd1f075a1-2d8c-8b2a-5776-b5c711134e67',
  MovementSwap: '0b6d75f8-a2c2-29dc-e32c-c53a0fb1aeea',
  DrawNegOne: '68308f8c-2087-b64d-7bd8-97b98488e5aa',
  DrawPlusOne: '1fa0d186-0237-e13e-7449-f54092211149',
  DoubleAction: '40617317-15e1-5aa3-8cdd-3d3d131e9b4f', 
  Knowledge: '0994b86a-4709-f096-63c9-07c6e1008bfd',
  Condemn: 'b0dca050-b7d4-f83a-554f-4cfc4f2c7854',
  KingOfHill: '99d4a12e-e368-7700-5cd0-46548040fced',
  KingsFlag: '73c8a893-d9a9-4416-9c6e-4316052a9f68',
  Enrage: '765857db-7109-4b3a-b12f-2657ac4cc3cd',
  Passify: '93eeb236-e43a-4b72-9f1f-5fb3687474fe',
  StickyFeet: 'c74980b0-c356-4990-92fa-3b1a202770d0',
  Encumber: '35fb4558-7f55-46bb-afd8-78bee2d71d66',
  Immunity: '8faf8b97-5e47-4ac2-a5f2-0616120a4adb',
  RemovalWeak: 'e3698666-2839-4167-b91a-14502bae30f7',
  RemovalStrong: '9cb33198-6a84-4d8b-b532-349ce948c2a7',
  BlinkDodge: 'a80cd286-9e00-4ea1-9356-744d663b9098',
  CostofPower: '55168e9e-06f6-4cfe-bbdc-149a86173b5e',
  ForgottenPast: '269a550a-ea97-46a4-890f-395f45d3c440',
  Heirloom: '5f510368-b76e-4a9b-9f29-96ca821ba26b',
  Looter: '9a226a0f-4d19-41e7-852e-856275875f89',
  Mulligan: '664882e5-df52-4396-b90c-77b84956342e',     
  Nab: 'e07970c5-a967-4c4a-903a-4b2502b2a9b1',
  Poisoned: 'abbc5454-2714-4e80-aa2e-674a4a19cc99',
  Reckless: '6b6b78fa-d42c-4713-ad1d-e3672786005e',       
  Resourceful: '517c0bc3-1ed3-462e-ba23-018e61366005',   
  Revert: 'c647e8f2-3d4c-42cc-af90-9b0053617151',     
  Sacrifice: 'b01a5d36-0f89-4264-a89a-a46554a1700a',  
  ThunderDome: 'dea9abe7-230f-4448-a1c0-ecd37fb393aa',    
  DarkMagic: '19c2696e-d456-482c-bb5b-d2abd8c80486',
  Jumper: '99d14233-f9c8-40d2-b4c6-6e3fe025829f',
  BacktoBasics: '3b9d5f24-daaa-485c-810d-7efc969024de',
  RockThrow: '18301f0f-05e3-41f9-9f66-052a5485f0e1',
  Rock: '8e458a17-4be1-4284-95b7-52d031a5d6eb',
  ArenaRock: 'e281b0bd-8a1f-4e9a-9db0-b1cdfe978151',
  Timebomb: '259d4841-a8a9-483b-ab78-bfb024184400',
  // TODO ############################################
  ArenaHole: '7ee25860-b996-442d-95da-9bd0a447cff3',
  // Randomly select [X] unoccupied spaces not on the back lines, those are now Hole spaces.
  // Hole: can't land on it, but can move over it
  ArenaIce: '88f8c963-c40e-4205-b10d-a540d2186177',
  // Randomly select [X] spaces not on the back lines, those are now Ice spaces.
  // Ice: if you land on it as a pattern, nothing. If you land on it otherwise keep moving the same direct until off the ice   
  Taunt: 'c2b27e7d-343e-416d-bac3-149fe48da9eb',
  // ? Cubits that limit movement like this could/will trigger the movement win condition
  // If the opposing team can take this piece as their move, they must do so, single target only 
  AncientRevival: '10e38ff2-2954-43f5-9a06-b11fcc06fad9',
  // ? How to bring back unit
  // When this piece is captured, move it Exile for duration (1);
  // after your opponents next turn return it to the board to an unoccupied space in your back line; 
  Poof: '319017f3-f943-4c41-b465-15ceea4b9059',
  // ? How to bring back unit
  // Remove a piece from the board marking its location. Duration 1; onDurrtionEnd() => [];
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

export const KEYWORDS = {
  Unknown: 0,
  Movement: 1,
  Arena: 2,
  Trap: 3,
  Activation: 4,
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
  Passive: 1,
  Aggressive: 2,
};

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

export const TARGETING_TYPE = {
  Unknown: 0,
  AttachLocation: 1,
  TargetLocation: 2,
  TargetCubitAtLocation: 3,
  TargetUnitAtLocation: 4,
};

export const TARGETING_CONSTRAINTS = {
  Unknown: 0,
  Self: 1,
  Opponent: 2,
};