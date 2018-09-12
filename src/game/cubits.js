import { 
    // UNIT_TYPES,
    CUBIT_TYPES,
    CLASSIFICATIONS,
    MOVEMENT_TYPES,
    MOVEMENT_CONSTRAINTS,
    DURATION_TYPES,
    LOCATIONS,
    TARGETING,
    Movement,
    Target,
    Entity,
} from './common';

export class Cubit extends Entity {
    constructor(type, name, ownership) {
        super(type, name, ownership);

        // automatic removal duration options
        this.duration = { type: DURATION_TYPES.Unknown, amount: null };

        this.activatable = false;
    }
}

export class OrthogonalCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.MovementOrthogonal, "Orthogonal", ownership);

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Either, 8));
        this.targets.push(new Target(LOCATIONS.Units, TARGETING.Self));
    }
}

export class DiagonalCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.MovementDiagonal, "Diagonal", ownership);

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Either, 8));
        this.targets.push(new Target(LOCATIONS.Units, TARGETING.Self));
    }
}

export class CardinalCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.MovementCardinal, "Cardinal", ownership);

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Either, 8));
        this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Either, 8));
        this.targets.push(new Target(LOCATIONS.Units, TARGETING.Self));
    }
}

export class JumpCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.MovementJump, "Jump", ownership);

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push(new Movement(MOVEMENT_TYPES.Jump, MOVEMENT_CONSTRAINTS.Either, null, [2,1]));
        this.targets.push(new Target(LOCATIONS.Units, TARGETING.Self));
    }
}

export class SideStepCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.MovementSideStep, "Side Step", ownership);

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push(new Movement(MOVEMENT_TYPES.Sidestep, MOVEMENT_CONSTRAINTS.Either, 1));
        this.targets.push(new Target(LOCATIONS.Units, TARGETING.Self));
    }
}

export class SwapCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.MovementSwap, "Swap", ownership);

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push(new Movement(MOVEMENT_TYPES.Swap, MOVEMENT_CONSTRAINTS.Passive, 1));
        this.targets.push(new Target(LOCATIONS.Units, TARGETING.Self));
    }
}

export class DrawNegOneCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.DrawNegOne, "Draw -1", ownership);

        this.classification.push(CLASSIFICATIONS.Unknown);
        this.targets.push(new Target(LOCATIONS.Avatar, TARGETING.Opponent));
    }
}

export class DrawPlusOneCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.DrawPlusOne, "Draw +1", ownership);

        this.classification.push(CLASSIFICATIONS.Unknown);
        this.targets.push(new Target(LOCATIONS.Avatar, TARGETING.Self));
    }
}

export class DoubleActionCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.DoubleAction, "Double Action", ownership);

        this.classification.push(CLASSIFICATIONS.Unknown);
        this.targets.push(new Target(LOCATIONS.Avatar, TARGETING.Self));
    }
}

export class KnowledgeCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.Knowledge, "Knowledge", ownership);
        this.targets.push(new Target(LOCATIONS.Avatar, TARGETING.Self));
    }
}

export class CondemnCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.Condemn, "Condemn", ownership);
        this.targets.push(new Target(LOCATIONS.Units, TARGETING.Opponent));
    }
}

export class KingOfHillCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.KingOfHill, "KingOfHill", ownership);

        this.obstruction = false;

        this.targets.push(new Target(LOCATIONS.Arena, TARGETING.Any));
    }
}