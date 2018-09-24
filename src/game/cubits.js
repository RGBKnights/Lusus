import { 
  CUBIT_TYPES,
  CLASSIFICATIONS,
  DURATION_TYPES,
  MOVEMENT_TYPES,
  MOVEMENT_CONSTRAINTS,
  Movement,
} from './common';

const uuidv4 = require('uuid/v4');

export class Cubit {
  constructor(type, name, ownership) {
      // unique identifier
      this.id = uuidv4();

      // own owns the cubit
      this.ownership = ownership;

      // type of the cubit
      this.type = type;

      // the name of the type
      this.name = name;

      // english words for the Help (convert to transltions keys later)
      this.description = "";

      // for filtering
      this.classification = [];  

      // track moves and turns
      this.moves = 0;
      this.turns = 0;

      // adictional movement options
      this.location = null;
      this.movement = [];
      this.obstruction = true;

      // targeting paramters
      this.targeting = [];

      // automatic removal duration options
      this.duration = { type: DURATION_TYPES.Unknown, amount: null };

      // consumable
      this.activatable = false;
  }
}

export class OrthogonalCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementOrthogonal, "Orthogonal", ownership);

      this.classification.push(CLASSIFICATIONS.Movement);
      this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Either, 8));
  }
}

export class DiagonalCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementDiagonal, "Diagonal", ownership);

      this.classification.push(CLASSIFICATIONS.Movement);
      this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Either, 8));
  }
}

export class CardinalCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementCardinal, "Cardinal", ownership);

      this.classification.push(CLASSIFICATIONS.Movement);
      this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Either, 8));
      this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Either, 8));
  }
}

export class JumpCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementJump, "Jump", ownership);

      this.classification.push(CLASSIFICATIONS.Movement);
      this.movement.push(new Movement(MOVEMENT_TYPES.Jump, MOVEMENT_CONSTRAINTS.Either, null, [2,1]));
  }
}

export class SideStepCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementSideStep, "Side Step", ownership);

      this.classification.push(CLASSIFICATIONS.Movement);
      this.movement.push(new Movement(MOVEMENT_TYPES.Sidestep, MOVEMENT_CONSTRAINTS.Either, 1));
  }
}

export class SwapCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.MovementSwap, "Swap", ownership);

      this.classification.push(CLASSIFICATIONS.Movement);
      this.movement.push(new Movement(MOVEMENT_TYPES.Swap, MOVEMENT_CONSTRAINTS.Passive, 1));
  }
}

export class DrawNegOneCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.DrawNegOne, "Draw -1", ownership);

      this.classification.push(CLASSIFICATIONS.Unknown);
  }
}

export class DrawPlusOneCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.DrawPlusOne, "Draw +1", ownership);

      this.classification.push(CLASSIFICATIONS.Unknown);
  }
}

export class DoubleActionCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.DoubleAction, "Double Action", ownership);

      this.classification.push(CLASSIFICATIONS.Unknown);
  }
}

export class KnowledgeCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Knowledge, "Knowledge", ownership);
  }
}

export class CondemnCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Condemn, "Condemn", ownership);
  }
}

export class KingOfHillCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.KingOfHill, "KingOfHill", ownership);

      this.obstruction = false;
  }
}

export class EnrageCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Enrage, "Enrage", ownership);
  }
}

export class PassifyCubit extends Cubit {
  constructor(ownership) {
      super(CUBIT_TYPES.Passify, "Passify", ownership);
  }
}