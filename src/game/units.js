import { 
    UNIT_TYPES,
    CLASSIFICATIONS,
    MOVEMENT_TYPES,
    MOVEMENT_CONSTRAINTS,
    Movement,
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
        this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Either, 1));
        this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Either, 1));
        this.movement.push(new Movement(MOVEMENT_TYPES.Castle, MOVEMENT_CONSTRAINTS.Passive, 1));
        this.slots = 4;
    }
}

export class QueenUnit extends Unit {
    constructor(ownership, color) {
        super(UNIT_TYPES.Queen, "Queen", ownership, color);

        this.classification.push(CLASSIFICATIONS.Unit);
        this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Either, 8));
        this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Either, 8));
        this.slots = 4;
    }
}

export class BishopUnit extends Unit {
    constructor(ownership, color) {
        super(UNIT_TYPES.Bishop, "Bishop", ownership, color);

        this.classification.push(CLASSIFICATIONS.Unit);
        this.movement.push(new Movement( MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Either, 8));
        this.slots = 4;
    }
}

export class RookUnit extends Unit {
    constructor(ownership, color) {
        super(UNIT_TYPES.Rook, "Rook", ownership, color);

        this.classification.push(CLASSIFICATIONS.Unit);
        this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Either, 8));
        this.slots = 4;
    }
}

export class KnightUnit extends Unit {
    constructor(ownership, color) {
        super(UNIT_TYPES.Knight, "Knight", ownership, color);

        this.classification.push(CLASSIFICATIONS.Unit);
        this.movement.push(new Movement(MOVEMENT_TYPES.Jump, MOVEMENT_CONSTRAINTS.Either, null, [2,1]));
        this.slots = 4;
    }
}

export class PawnUnit extends Unit {
    constructor(ownership, color) {
        super(UNIT_TYPES.Pawn, "Pawn", ownership, color);

        this.classification.push(CLASSIFICATIONS.Unit);
        this.movement.push(new Movement(MOVEMENT_TYPES.Forward, MOVEMENT_CONSTRAINTS.Passive, 1));
        this.movement.push(new Movement(MOVEMENT_TYPES.Forward, MOVEMENT_CONSTRAINTS.Passive, 2));
        this.movement.push(new Movement(MOVEMENT_TYPES.Fork, MOVEMENT_CONSTRAINTS.Agressive, 1));
        this.slots = 4;
    }
}
