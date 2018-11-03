import { 
  CUBIT_TYPES,
  // UNIT_TYPES,
  KEYWORDS,
  MOVEMENT_TYPES,
  MOVEMENT_CONSTRAINTS,
  LOCATIONS,
  TARGETING_TYPE,
  TARGETING_CONSTRAINTS,
  DURATION_TYPES,
} from './common';

const uuidv4 = require('uuid/v4');

export class Cubit {
  constructor(type, name, ownership) {
      // unique identifier
      this.id = uuidv4();

      // for the transient and the unknown
      this.data = {};

      // own owns the cubit
      this.ownership = ownership;
      this.controller = ownership;

      // type of the cubit
      this.type = type;

      // the name of the type
      this.name = name;

      // english words for the Help (convert to translations keys later)
      this.description = "";

      // for filtering
      this.keywords = [];  

      // isTrap?
      this.hidden = false;

      // track moves and turns
      this.moves = 0;
      this.turns = 0;

      // targeting paramter for playing cubits
      this.targeting = [];

      // additional movement options
      this.location = LOCATIONS.Unknown;
      this.position = null; // (x,y) or Self/Opponent
      this.movement = [];
      this.obstruction = true;

      // automatic removal duration options
      this.duration = null;

      // The parent if there is one...
      this.unit = null;

      // Cubits that create other cubits are children...
      this.children = [];

      this.activation = false;
      this.consumed = false;
  }
}

export class OrthogonalCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementOrthogonal, "Orthogonal", ownership);

      this.description = "(Rook)Piece can move 7 spaces horizontally or vertically";

      this.keywords.push(KEYWORDS.Movement);

      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Aggressive,
        distance: 8
      });

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class DiagonalCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementDiagonal, "Diagonal", ownership);

      this.description = "(Bishop)Piece can move 7 spaces diagonally";

      this.keywords.push(KEYWORDS.Movement);

      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Aggressive,
        distance: 8
      });

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class CardinalCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementCardinal, "Cardinal", ownership);

      this.description = "(Queen)Piece can move 7 spaces in any direction";

      this.keywords.push(KEYWORDS.Movement);

      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Aggressive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Aggressive,
        distance: 8
      });

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class JumpCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementJump, "Jump", ownership);

      this.description = "(Knight) Pattern movement, move piece directly to the end of the pattern. 2 spaces horizontal or vertical and 1 space the remaining option";

      this.keywords.push(KEYWORDS.Movement);

      this.movement.push({
        type: MOVEMENT_TYPES.Jump,
        constraint: MOVEMENT_CONSTRAINTS.Aggressive,
        distance: 1,
        steps: [2,1],
        jump: true
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Jump,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 1,
        steps: [2,1],
        jump: true
      });

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class SideStepCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementSideStep, "Side Step", ownership);

      this.description = "Piece can move 1 space horizontally";

      this.keywords.push(KEYWORDS.Movement);

      this.movement.push({
        type: MOVEMENT_TYPES.Sidestep,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 1
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Sidestep,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 1
      });

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class SwapCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementSwap, "Swap", ownership);

      this.description = "Swap any adjacent piece as this piece move";

      this.keywords.push(KEYWORDS.Movement);

      this.movement.push({
        type: MOVEMENT_TYPES.Swap,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 1
      });

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class DrawNegOneCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.DrawNegOne, "Draw -1", ownership);

      this.description = "Decreases the amount you draw by 1";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Player,
        constraint: TARGETING_CONSTRAINTS.Opponent
      });
  }
}

export class DrawPlusOneCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.DrawPlusOne, "Draw +1", ownership);

      this.description = "Increases the amount you draw by 1";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Player,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class DoubleActionCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.DoubleAction, "Double Action", ownership);

      this.description = "Increases the amount actions you can perform by 1 (adds one on play)";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Player,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class KnowledgeCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Knowledge, "Knowledge", ownership);

      this.description = "Your opponents hand is revealed at all times";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Player,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class CondemnCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Condemn, "Condemn", ownership);

      this.description = "No additional cubits can be placed on this piece";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Opponent
      });
  }
}

export class KingOfHillCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.KingOfHill, "King Of Hill", ownership);

      this.description = "Marks a space in the middle of the board as The Hill.  If your King piece is on this space at end of your turn you win the game";

      this.keywords.push(KEYWORDS.Arena);

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Arena,
      });
      
      this.duration = {
        type: DURATION_TYPES.Turn,
        amount: 1,
      };
  }
}

export class KingsFlagCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.KingsFlag, "Flag", ownership);

      this.description = "Flag for king of the hill";

      this.data.positions = {
        '1': {x: 3, y: 3},
        '2': {x: 3, y: 4},
        '3': {x: 4, y: 3},
        '4': {x: 4, y: 4},
      };

      this.location = LOCATIONS.Board;

      this.obstruction = false;
  }
}


export class EnrageCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Enrage, "Enrage", ownership);

      this.description = "The piece cannot move unless it will capture another piece";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Opponent
      });
  }
}

export class PassifyCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Passify, "Passify", ownership);

      this.description = "The piece cannot make a move that will capture another piece";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Opponent
      });
  }
}


export class AncientRevivalCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.AncientRevival, "Ancient Revival", ownership);

      this.description = "";

      this.hidden = true;

      this.keywords.push(KEYWORDS.Trap);

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class BacktoBasicsCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.BacktoBasics, "Back to Basics", ownership);

      this.description = "All attachment cubies have no effect";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Arena,
      });

      this.duration = {
        type: DURATION_TYPES.Turn,
        amount: 10,
      };
  }
}

export class BlinkDodgeCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.BlinkDodge, "Blink Dodge", ownership);

      this.description = "When this piece would be taken instead move it to a random unoccupied adjacent space. If none, it is taken";

      this.hidden = true;

      this.keywords.push(KEYWORDS.Trap);

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class CostofPowerCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.CostofPower, "Cost of Power", ownership);

      this.description = "Each player draws an additional card and loses a random cubie from the bag";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Player,
        constraint: TARGETING_CONSTRAINTS.Self
      });

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Player,
        constraint: TARGETING_CONSTRAINTS.Opponent
      });
  }
}

export class DarkMagicCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.DarkMagic, "Dark Magic", ownership);
      
      this.description = "On capture place a random cubie from the afterlife on this piece (must be a valid target)";

      this.hidden = true;

      this.keywords.push(KEYWORDS.Trap);

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class EncumberCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Encumber, "Encumber", ownership);

      this.description = "The piece gets -1 move for ever cubie on that piece";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Opponent
      });
  }
}

export class WeakRemovalCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.RemovalWeak, "Weak Removal", ownership);

      this.description = "Remove a cubie on the board";

      this.targeting.push({
        type: TARGETING_TYPE.TargetCubitAtLocation,
        location: LOCATIONS.Arena
      });
      this.targeting.push({
        type: TARGETING_TYPE.TargetCubitAtLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Opponent,
      });
      this.targeting.push({
        type: TARGETING_TYPE.TargetCubitAtLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self,
      });
      this.targeting.push({
        type: TARGETING_TYPE.TargetCubitAtLocation,
        location: LOCATIONS.Player,
        constraint: TARGETING_CONSTRAINTS.Opponent,
      });
      this.targeting.push({
        type: TARGETING_TYPE.TargetCubitAtLocation,
        location: LOCATIONS.Player,
        constraint: TARGETING_CONSTRAINTS.Self,
      });
  }
}


export class StrongRemovalCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.RemovalStrong, "Strong Removal", ownership);

      this.description = "Remove a cubie on the board, pierces immunity";

      this.targeting.push({
        type: TARGETING_TYPE.TargetCubitAtLocation,
        location: LOCATIONS.Arena
      });
      this.targeting.push({
        type: TARGETING_TYPE.TargetCubitAtLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Opponent,
        pierces: true,
      });
      this.targeting.push({
        type: TARGETING_TYPE.TargetCubitAtLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self,
        pierces: true,
      });
      this.targeting.push({
        type: TARGETING_TYPE.TargetCubitAtLocation,
        location: LOCATIONS.Player,
        constraint: TARGETING_CONSTRAINTS.Opponent,
      });
      this.targeting.push({
        type: TARGETING_TYPE.TargetCubitAtLocation,
        location: LOCATIONS.Player,
        constraint: TARGETING_CONSTRAINTS.Self,
      });
  }
}

export class ForgottenPastCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.ForgottenPast, "Forgotten Past", ownership);

      this.description = "Exile everything in the afterlife";

      this.targeting.push({
        type: TARGETING_TYPE.TargetLocation,
        location: LOCATIONS.Player,
        constraint: TARGETING_CONSTRAINTS.Self
      });
      
      // TODO: Add Afterlife as a target; this will invole moving the aferlife from the menu to the table and combie into single row...
  }
}

export class HeirloomPastCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Heirloom, "Heirloom", ownership);

      this.description = "When captured, put your cubies attached the piece into the bag";
      
      this.hidden = true;

      this.keywords.push(KEYWORDS.Trap);

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class ArenaHoleCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.ArenaHole, "Arena Hole", ownership);

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Arena,
      });

      this.duration = {
        type: DURATION_TYPES.Turn,
        amount: 10,
      };
  }
}

export class ArenaRockCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.ArenaRock, "Arena Rock", ownership);

      this.description = "3 random unoccupied spaces are rocks (they act as if they are occupied) with a new rock added every turn";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Arena,
      });

      this.duration = {
        type: DURATION_TYPES.Turn,
        amount: 10,
      };

      this.data.amount = 3;
  }
}

export class RockCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Rock, "Rock", ownership);

      this.location = LOCATIONS.Board;

      this.obstruction = true;
  }
}

export class ArenaIceCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.ArenaIce, "Arena Ice", ownership);

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Arena,
      });

      this.duration = {
        type: DURATION_TYPES.Turn,
        amount: 10,
      };
  }
}

export class ImmunityCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Immunity, "Immunity", ownership);

      //TODO: this cubit will have bugs forever because of the all the 
      // other checks that are needed for the 'targeted by opponent effects' 
      // for things like Traps. Currently Targeting (in the design of the game)
      // is limited to playing a cubit.

      // Option 1: Explore a effect flag placed on the unit (& all cubits or just lookup unit?)
      // that can be used to test for a units Immunity if the unit is Immunity then all 
      // trageting / reaction actions will have no effect (unless states)
      
      // Option 2: Get @Chicken to define options for valid targets in context of the games actions

      this.description = "This piece cannot be targeted by opponent effects, other cubies on this piece cannot be targeted by opponent effects";
      
      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class JumperCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Jumper, "Jumper", ownership);

      this.keywords.push(KEYWORDS.Movement);

      this.description = "Jump cardinal distance of 2";

      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Aggressive,
        distance: 2,
        jump: true,
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 2,
        jump: true,
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Aggressive,
        distance: 2,
        jump: true,
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 2,
        jump: true,
      });

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class LooterCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Looter, "Looter", ownership);

      this.description = "On capture, put a random cubit into your bag instead of attached to piece in afterlife";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class MulliganCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Mulligan, "Mulligan", ownership);

      this.description = "You shuffle your hand back in and draw a new one, you get one additional action this turn";

      this.targeting.push({
        type: TARGETING_TYPE.TargetLocation,
        location: LOCATIONS.Player,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class NabCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Nab, "Nab", ownership);

      this.description = "Look at your opponents hand, you may play one of their cubies";

      this.targeting.push({
        type: TARGETING_TYPE.TargetLocation,
        location: LOCATIONS.Hand,
        constraint: TARGETING_CONSTRAINTS.Opponent
      });
  }
}

export class PoisonedCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Poisoned, "Poisoned", ownership);

      this.description = "After this piece makes 3 moves it is sent to the afterlife";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Opponent
      });
  }
}

export class PoofCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Poof, "Poof", ownership);

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class RecklessCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Reckless, "Reckless", ownership);

      this.description = "Arena: Once placed 4d4 dice is rolled; after that attached player reaches that number of pieces in the afterlife you win";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Arena,
      });

      this.duration = {
        type: DURATION_TYPES.Turn,
        amount: 10,
      };
  }
}

export class ResourcefulCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Resourceful, "Resourceful", ownership);

      this.description = "Draw a new hand with one less card";

      this.keywords.push(KEYWORDS.Activation);

      this.activation = true;

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Player,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class RevertCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Revert, "Revert", ownership);

      this.description = "If piece is captured the move is reverted";
      
      this.hidden = true;

      this.keywords.push(KEYWORDS.Trap);

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Self
      });
  }
}

export class RockThrowCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.RockThrow, "RockThrow", ownership);

      this.description = "Select a unoccupied space. 3 random unoccupied adjacent spaces are rocks and act as if they are occupied";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Board
      });

      this.data.amount = 3;
  }
}

export class SacrificeCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Sacrifice, "Sacrifice", ownership);

      this.description = "After moving, remove a random cubit from this piece; if there are none then move piece to afterlife";

      this.obstruction = false;

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Board
      });
  }
}

export class StickyFeetCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.StickyFeet, "Sticky Feet", ownership);

      this.description = "This piece cannot move more than one space";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Opponent
      });
  }
}

export class TauntCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Taunt, "Taunt", ownership);

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Unit,
        constraint: TARGETING_CONSTRAINTS.Opponent
      });
  }
}

export class ThunderDomeCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.ThunderDome, "Thunder Dome", ownership);

      this.description = "You cannot make passive moves if a capture is available";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Arena,
      });

      this.duration = {
        type: DURATION_TYPES.Turn,
        amount: 10,
      };
  }
}

export class TimebombCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Timebomb, "Timebomb", ownership);

      this.description = "Start a 3 turn timer, count it down at end of each turn; at 0 detonate it destroying all pieces on that and surrounding spaces";

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Board
      });
  }
}