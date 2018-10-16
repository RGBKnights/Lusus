import { 
  UNIT_TYPES,
  CLASSIFICATIONS,
  MOVEMENT_TYPES,
  MOVEMENT_CONSTRAINTS,
  Movement,
  LOCATIONS,
} from './common';

const uuidv4 = require('uuid/v4');

export class Unit {
  constructor(type, name, slots, ownership, rank, file) {
      // unique identifier
      this.id = uuidv4();

      // own owns the cubit
      this.ownership = ownership;
      this.rank = rank;
      this.file = file;

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
      this.location = LOCATIONS.Unknown;
      this.position = null; // (x,y)
      this.movement = [];
      this.obstruction = true;

      // cubits and number of slots
      this.cubits = [];
      this.slots = slots;

      // Can this unit handle any more cubits
      this.isCondemned = false;
  }

}

export class KingUnit extends Unit {
  constructor(ownership, file) {
      super(UNIT_TYPES.King, "King", 2, ownership, UNIT_TYPES.Royal, file);

      this.classification.push(CLASSIFICATIONS.Unit);
      this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Agressive, 1));
      this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Passive, 1));
      this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Agressive, 1));
      this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Passive, 1));

      this.movement.push(new Movement(MOVEMENT_TYPES.Castle, MOVEMENT_CONSTRAINTS.Passive, 1));
  }
}

export class QueenUnit extends Unit {
  constructor( ownership, file) {
      super(UNIT_TYPES.Queen, "Queen", 3, ownership, UNIT_TYPES.Royal, file);

      this.classification.push(CLASSIFICATIONS.Unit);
      this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Agressive, 8));
      this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Passive, 8));
      this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Agressive, 8));
      this.movement.push(new Movement(MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Passive, 8));
  }
}

export class BishopUnit extends Unit {
  constructor(ownership, file) {
      super(UNIT_TYPES.Bishop, "Bishop", 3, ownership, UNIT_TYPES.Royal, file);

      this.classification.push(CLASSIFICATIONS.Unit);
      this.movement.push(new Movement( MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Agressive, 8));
      this.movement.push(new Movement( MOVEMENT_TYPES.Diagonal, MOVEMENT_CONSTRAINTS.Passive, 8));
  }
}

export class RookUnit extends Unit {
  constructor(ownership, file) {
      super(UNIT_TYPES.Rook, "Rook", 3,  ownership, UNIT_TYPES.Royal, file);

      this.classification.push(CLASSIFICATIONS.Unit);
      this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Agressive, 8));
      this.movement.push(new Movement(MOVEMENT_TYPES.Orthogonal, MOVEMENT_CONSTRAINTS.Passive, 8));
  }
}

export class KnightUnit extends Unit {
  constructor(ownership, file) {
      super(UNIT_TYPES.Knight, "Knight", 4, ownership, UNIT_TYPES.Royal, file);

      this.classification.push(CLASSIFICATIONS.Unit);
      this.movement.push(new Movement(MOVEMENT_TYPES.Jump, MOVEMENT_CONSTRAINTS.Agressive, null, [2,1]));
      this.movement.push(new Movement(MOVEMENT_TYPES.Jump, MOVEMENT_CONSTRAINTS.Passive, null, [2,1]));
  }
}

export class PawnUnit extends Unit {
  constructor(ownership, file) {
      super(UNIT_TYPES.Pawn, "Pawn", 2, ownership, UNIT_TYPES.Common, file);

      this.classification.push(CLASSIFICATIONS.Unit);
      this.movement.push(new Movement(MOVEMENT_TYPES.Forward, MOVEMENT_CONSTRAINTS.Passive, 1));
      this.movement.push(new Movement(MOVEMENT_TYPES.Forward, MOVEMENT_CONSTRAINTS.Passive, 2));
      this.movement.push(new Movement(MOVEMENT_TYPES.Fork, MOVEMENT_CONSTRAINTS.Agressive, 1));
  }
}
