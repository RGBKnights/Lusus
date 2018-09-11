import { 
    // UNIT_TYPES,
    CUBIT_TYPES,
    CLASSIFICATIONS,
    MOVEMENT_TYPES,
    DURATION_TYPES,
    LOCATIONS,
    TARGETING,
    Target,
    Entity
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
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
        this.targets.push(new Target(LOCATIONS.Field, TARGETING.Self, CLASSIFICATIONS.Unit));
        this.targets.push(new Target(LOCATIONS.Units, TARGETING.Self, CLASSIFICATIONS.Unit));
    }
}

export class DiagonalCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.MovementDiagonal, "Diagonal", ownership);

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
        this.targets.push(new Target(LOCATIONS.Field, TARGETING.Self, CLASSIFICATIONS.Unit));
        this.targets.push(new Target(LOCATIONS.Units, TARGETING.Self, CLASSIFICATIONS.Unit));
    }
}

export class CardinalCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.MovementCardinal, "Cardinal", ownership);

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
        this.targets.push(new Target(LOCATIONS.Field, TARGETING.Self, CLASSIFICATIONS.Unit));
        this.targets.push(new Target(LOCATIONS.Units, TARGETING.Self, CLASSIFICATIONS.Unit));
    }
}

export class JumpCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.MovementJump, "Jump", ownership);

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Jump, steps: [2,1] });
        this.targets.push(new Target(LOCATIONS.Field, TARGETING.Self, CLASSIFICATIONS.Unit));
        this.targets.push(new Target(LOCATIONS.Units, TARGETING.Self, CLASSIFICATIONS.Unit));
    }
}

export class SideStepCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.MovementSideStep, "Side Step", ownership);

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Sidestep, distance: 1 });
        this.targets.push(new Target(LOCATIONS.Field, TARGETING.Self, CLASSIFICATIONS.Unit));
        this.targets.push(new Target(LOCATIONS.Units, TARGETING.Self, CLASSIFICATIONS.Unit));
    }
}

export class SwapCubit extends Cubit {
    constructor(ownership) {
        super(CUBIT_TYPES.MovementSwap, "Swap", ownership);

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Swap, distance: 1, });
        this.targets.push(new Target(LOCATIONS.Field, TARGETING.Self, CLASSIFICATIONS.Unit));
        this.targets.push(new Target(LOCATIONS.Units, TARGETING.Self, CLASSIFICATIONS.Unit));
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
        this.targets.push(new Target(LOCATIONS.Arena, TARGETING.Any));
    }
}