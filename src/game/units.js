import { 
    UNIT_TYPES,
    CLASSIFICATIONS,
    MOVEMENT_TYPES,
    Entity
 } from './common';

export class Unit  extends Entity {
    constructor(type, name, ownership, color) {
        super(type, name, ownership);
    
        // file (row) color
        this.color = color;

        // cubits and number of slots
        this.cubits = [];
        this.slots = 3;
    }
}

export class KingUnit extends Unit {
    constructor(ownership, color) {
        super(UNIT_TYPES.King, "King", ownership, color);

        this.classification.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 1, });
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 1, });
        this.movement.push({ type: MOVEMENT_TYPES.Castle });
        this.slots = 4;
    }
}

export class QueenUnit extends Unit {
    constructor(ownership, color) {
        super(UNIT_TYPES.Queen, "Queen", ownership, color);

        this.classification.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
        this.slots = 4;
    }
}

export class BishopUnit extends Unit {
    constructor(ownership, color) {
        super(UNIT_TYPES.Bishop, "Bishop", ownership, color);

        this.classification.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
        this.slots = 4;
    }
}

export class RookUnit extends Unit {
    constructor(ownership, color) {
        super(UNIT_TYPES.Rook, "Rook", ownership, color);

        this.classification.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
        this.slots = 4;
    }
}

export class KnightUnit extends Unit {
    constructor(ownership, color) {
        super(UNIT_TYPES.Knight, "Knight", ownership, color);

        this.classification.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Jump, steps: [2,1] });
        this.slots = 4;
    }
}

export class PawnUnit extends Unit {
    constructor(ownership, color) {
        super(UNIT_TYPES.Pawn, "Pawn", ownership, color);

        this.classification.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Forward, distance: 1 });
        this.movement.push({ type: MOVEMENT_TYPES.Forward, distance: 2 });
        this.movement.push({ type: MOVEMENT_TYPES.Fork, distance: 1 });
        this.slots = 4;
    }
}
