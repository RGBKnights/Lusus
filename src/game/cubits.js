import { 
  CUBIT_TYPES,
  UNIT_TYPES,
  CLASSIFICATIONS,
  MOVEMENT_TYPES,
  MOVEMENT_CONSTRAINTS,
  Movement,
  LOCATIONS,
  TARGET_CONSTRAINTS,
  ArenaTargeting,
  UnitTargeting,
  PlayerTargeting,
  BoardTargeting,
} from './common';

const uuidv4 = require('uuid/v4');

export class Cubit {
  constructor(type, name, ownership) {
      // unique identifier
      this.id = uuidv4();

      // own owns the cubit
      this.ownership = ownership;
      this.controller = null;

      // type of the cubit
      this.type = type;

      // the name of the type
      this.name = name;

      // english words for the Help (convert to transltions keys later)
      this.description = "";

      // for filtering
      this.classification = [];  

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

      // consumable
      this.activatable = false;
  }
}

export class OrthogonalCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementOrthogonal, "Orthogonal", ownership);

      this.classification.push(CLASSIFICATIONS.Movement);

      this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Passive, 8));
      this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Agressive, 8));

      this.targeting.push(new UnitTargeting(LOCATIONS.Unit, TARGET_CONSTRAINTS.Self));
  }
}

export class DiagonalCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementDiagonal, "Diagonal", ownership);

      this.classification.push(CLASSIFICATIONS.Movement);

      this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Passive, 8));
      this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Agressive, 8));

      this.targeting.push(new UnitTargeting(LOCATIONS.Unit, TARGET_CONSTRAINTS.Self));
  }
}

export class CardinalCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementCardinal, "Cardinal", ownership);

      this.classification.push(CLASSIFICATIONS.Movement);

      this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Passive, 8));
      this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Agressive, 8));
      this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Passive, 8));
      this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Agressive, 8));

      this.targeting.push(new UnitTargeting(LOCATIONS.Unit, TARGET_CONSTRAINTS.Self));
  }
}

export class JumpCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementJump, "Jump", ownership);

      this.classification.push(CLASSIFICATIONS.Movement);

      this.movement.push(new Movement(MOVEMENT_TYPES.Jump, MOVEMENT_CONSTRAINTS.Passive, null, [2,1], true));
      this.movement.push(new Movement(MOVEMENT_TYPES.Jump, MOVEMENT_CONSTRAINTS.Agressive, null, [2,1], true));

      this.targeting.push(new UnitTargeting(LOCATIONS.Unit, TARGET_CONSTRAINTS.Self));
  }
}

export class SideStepCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementSideStep, "Side Step", ownership);

      this.classification.push(CLASSIFICATIONS.Movement);

      this.movement.push(new Movement(MOVEMENT_TYPES.Sidestep, MOVEMENT_CONSTRAINTS.Passive, 1));
      this.movement.push(new Movement(MOVEMENT_TYPES.Sidestep, MOVEMENT_CONSTRAINTS.Agressive, 1));

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class SwapCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementSwap, "Swap", ownership);

      this.classification.push(CLASSIFICATIONS.Movement);

      this.movement.push(new Movement(MOVEMENT_TYPES.Swap, MOVEMENT_CONSTRAINTS.Passive, 1));

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class DrawNegOneCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.DrawNegOne, "Draw -1", ownership);

      this.targeting.push(new PlayerTargeting(TARGET_CONSTRAINTS.Opponent));
  }
}

export class DrawPlusOneCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.DrawPlusOne, "Draw +1", ownership);

      this.targeting.push(new PlayerTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class DoubleActionCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.DoubleAction, "Double Action", ownership);

      this.targeting.push(new PlayerTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class KnowledgeCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Knowledge, "Knowledge", ownership);

      this.targeting.push(new PlayerTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class CondemnCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Condemn, "Condemn", ownership);

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Opponent));
  }
}

export class KingOfHillCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.KingOfHill, "King Of Hill", ownership);

      this.targeting.push(new ArenaTargeting());
      this.obstruction = false;
  }
}

export class EnrageCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Enrage, "Enrage", ownership);

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Opponent));
  }
}

export class PassifyCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Passify, "Passify", ownership);

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Opponent));
  }
}


export class AncientRevivalCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.AncientRevival, "Ancient Revival", ownership);

      this.hidden = true;

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class BacktoBasicsCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.BacktoBasics, "Back to Basics", ownership);

      this.targeting.push(new ArenaTargeting());
  }
}

export class BlinkDodgeCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.BlinkDodge, "Blink Dodge", ownership);

      this.hidden = true;

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class CostofPowerCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.CostofPower, "Cost of Power", ownership);

      this.targeting.push(new PlayerTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class DarkMagicCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.DarkMagic, "Dark Magic", ownership);

      this.hidden = true;

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class EncumberCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Encumber, "Encumber", ownership);

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class ForgottenPastCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.ForgottenPast, "Forgotten Past", ownership);

      this.targeting.push(new PlayerTargeting(TARGET_CONSTRAINTS.Self, false));
  }
}

export class ArenaHoleCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.ArenaHole, "Arena Hole", ownership);

      this.targeting.push(new ArenaTargeting());
  }
}

export class ArenaRockCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.ArenaRock, "Arena Rock", ownership);

      this.targeting.push(new ArenaTargeting());
  }
}

export class ArenaIceCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.ArenaIce, "Arena Ice", ownership);

      this.targeting.push(new ArenaTargeting());
  }
}

export class ImmunityCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Immunity, "Immunity", ownership);

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class JumperCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Jumper, "Jumper", ownership);

      this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Agressive, 2, null, true));
      this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Passive, 2, null, true));
      this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Agressive, 2, null, true));
      this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Passive, 2, null, true));
  }
}

export class LooterCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Looter, "Looter", ownership);

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class MulliganCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Mulligan, "Mulligan", ownership);

      this.targeting.push(new PlayerTargeting(TARGET_CONSTRAINTS.Self, false));
  }
}

export class NabCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Nab, "Nab", ownership);

      this.targeting.push(new PlayerTargeting(TARGET_CONSTRAINTS.Opponent, false));
  }
}

export class PoisonedCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Poisoned, "Poisoned", ownership);

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class PoofCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Poof, "Poof", ownership);

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Self, 1, UNIT_TYPES.All, false));
  }
}

export class RecklessCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Reckless, "Reckless", ownership);

      this.targeting.push(new PlayerTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class ResourcefulCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Resourceful, "Resourceful", ownership);

      this.targeting.push(new PlayerTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class RevertCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Revert, "Revert", ownership);

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Self));
  }
}

export class RockThrowCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.RockThrow, "RockThrow", ownership);

      this.targeting.push(new BoardTargeting(3));
  }
}

export class SacrificeCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Sacrifice, "Sacrifice", ownership);

      this.targeting.push(new BoardTargeting());
  }
}

export class StickyFeetCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.StickyFeet, "Sticky Feet", ownership);

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Opponent));
  }
}

export class TauntCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Taunt, "Taunt", ownership);

      this.targeting.push(new UnitTargeting(TARGET_CONSTRAINTS.Opponent));
  }
}

export class ThunderDomeCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.ThunderDome, "Thunder Dome", ownership);

      this.targeting.push(new ArenaTargeting());
  }
}

export class TimebombCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Timebomb, "Timebomb", ownership);

      this.targeting.push(new BoardTargeting());
  }
}