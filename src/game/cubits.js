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

      // own owns the cubit
      this.ownership = ownership;
      this.controller = ownership;

      // type of the cubit
      this.type = type;

      // the name of the type
      this.name = name;

      // english words for the Help (convert to transltions keys later)
      this.description = "";

      // for filtering
      this.keywords = [];  

      // isTrap?
      this.hidden = false;

      // track moves and turns
      this.moves = 0;
      this.turns = 0;

      // targeting paramters for playing cubits
      this.targeting = [];

      // adictional movement options
      this.location = LOCATIONS.Unknown;
      this.position = null; // (x,y) or Self/Opponent
      this.movement = [];
      this.obstruction = true;

      // automatic removal duration options
      this.duration = null;

      // The parrent if there is one...
      this.unit = null;

      // Cubits that create other cubits are childern...
      this.children = [];
  }
}

export class OrthogonalCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementOrthogonal, "Orthogonal", ownership);

      this.description = "adds orthogonal movement to unit";

      this.keywords.push(KEYWORDS.Movement);

      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Agressive,
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

      this.description = "adds diagonal movement to unit";

      this.keywords.push(KEYWORDS.Movement);

      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Agressive,
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

      this.description = "adds orthogonal & diagonal movement to unit";

      this.keywords.push(KEYWORDS.Movement);

      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Agressive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Agressive,
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

      this.description = "adds jump pattern (2,1) movement to unit";

      this.keywords.push(KEYWORDS.Movement);

      this.movement.push({
        type: MOVEMENT_TYPES.Jump,
        constraint: MOVEMENT_CONSTRAINTS.Agressive,
        steps: [2,1],
        jump: true
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Jump,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
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

      this.description = "adds side step 1 movement to unit";

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

      this.description = "adds swap movement to unit";

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

      this.description = "-1 to players's draw";

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

      this.description = "+1 to players's draw";

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

      this.description = "+1 action to the player";

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

      this.description = "Reveral the oppents hand";

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

      this.description = "No additional cubits can be placed on this unit";

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

      this.description = "Marks a space in the middle of the board as The Hill. When your King unit is on this space you win the game";

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

export class EnrageCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Enrage, "Enrage", ownership);

      this.description = "The unit cannot move unless it will capture another unit";

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

      this.description = "The unit cannot make a move that will capture another unit";

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

      this.description = "";

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

      this.description = "The unit gets -1 move for ever cubie on that unit";

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

      this.description = "When captured, put your cubies attached the unit into the bag";
      
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

      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Agressive,
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
        constraint: MOVEMENT_CONSTRAINTS.Agressive,
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

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Board
      });
  }
}

export class SacrificeCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Sacrifice, "Sacrifice", ownership);

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Board
      });
  }
}

export class StickyFeetCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.StickyFeet, "Sticky Feet", ownership);

      this.description = "";

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

      this.targeting.push({
        type: TARGETING_TYPE.AttachLocation,
        location: LOCATIONS.Board
      });
  }
}