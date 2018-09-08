import { 
    CUBIT_TYPES,
    CLASSIFICATIONS,
    MOVEMENT_TYPES,
    DURATION_TYPES,
    Entity
} from './common';

export class Cubit extends Entity {
    constructor(type, name) {
        super(type, name);

        // automatic removal duration options
        this.duration = { type: DURATION_TYPES.Unknown, amount: null };
    }
}

export class OrthogonalCubit extends Cubit {
    constructor() {
        super(CUBIT_TYPES.MovementOrthogonal, "Orthogonal");

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
    }
}

export class DiagonalCubit extends Cubit {
    constructor() {
        super(CUBIT_TYPES.MovementDiagonal, "Diagonal");

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
    }
}

export class CardinalCubit extends Cubit {
    constructor() {
        super(CUBIT_TYPES.MovementCardinal, "Cardinal");

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
    }
}

export class JumpCubit extends Cubit {
    constructor() {
        super(CUBIT_TYPES.MovementJump, "Jump");

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Jump, steps: [2,1] });
    }
}

export class SideStepCubit extends Cubit {
    constructor() {
        super(CUBIT_TYPES.MovementSideStep, "Side Step");

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Sidestep, distance: 1 });
    }
}

export class SwapCubit extends Cubit {
    constructor() {
        super(CUBIT_TYPES.MovementSwap, "Swap");

        this.classification.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Swap, distance: 1, });
    }
}

export class DrawNegOneCubit extends Cubit {
    constructor() {
        super(CUBIT_TYPES.DrawNegOne, "Draw -1");

        this.classification.push(CLASSIFICATIONS.Unknown);
    }
}

export class DrawPlusOneCubit extends Cubit {
    constructor() {
        super(CUBIT_TYPES.DrawPlusOne, "Draw +1");

        this.classification.push(CLASSIFICATIONS.Unknown);
    }
}

export class DoubleActionCubit extends Cubit {
    constructor() {
        super(CUBIT_TYPES.DoubleAction, "Double Action");

        this.classification.push(CLASSIFICATIONS.Unknown);
    }
}

export class KnowledgeCubit extends Cubit {
    constructor() {
        super(CUBIT_TYPES.Knowledge, "Knowledge");
    }
}

export class CondemnCubit extends Cubit {
    constructor() {
        super(CUBIT_TYPES.Condemn, "Condemn");
    }
}

export class KingOfHillCubit extends Cubit {
    constructor() {
        super(CUBIT_TYPES.KingOfHill, "KingOfHill");
    }
}