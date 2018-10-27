import { 
  UNIT_TYPES,
  MOVEMENT_TYPES,
  MOVEMENT_CONSTRAINTS,
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
      super(UNIT_TYPES.King, "King", 3, ownership, UNIT_TYPES.Royal, file);

      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Agressive,
        distance: 1
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 1
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Agressive,
        distance: 1
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 1
      });

      this.movement.push({
        type: MOVEMENT_TYPES.Castle,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        temporary: true,
      });
  }
}

export class QueenUnit extends Unit {
  constructor( ownership, file) {
      super(UNIT_TYPES.Queen, "Queen", 3, ownership, UNIT_TYPES.Royal, file);


      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Agressive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Agressive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 8
      });
  }
}

export class BishopUnit extends Unit {
  constructor(ownership, file) {
      super(UNIT_TYPES.Bishop, "Bishop", 3, ownership, UNIT_TYPES.Royal, file);

      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Agressive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Diagonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 8
      });
  }
}

export class RookUnit extends Unit {
  constructor(ownership, file) {
      super(UNIT_TYPES.Rook, "Rook", 3, ownership, UNIT_TYPES.Royal, file);

      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Agressive,
        distance: 8
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Orthogonal,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 8
      });
  }
}

export class KnightUnit extends Unit {
  constructor(ownership, file) {
      super(UNIT_TYPES.Knight, "Knight", 3, ownership, UNIT_TYPES.Royal, file);

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
  }
}

export class PawnUnit extends Unit {
  constructor(ownership, file) {
      super(UNIT_TYPES.Pawn, "Pawn", 2, ownership, UNIT_TYPES.Common, file);

      this.movement.push({
        type: MOVEMENT_TYPES.Forward,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 1
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Forward,
        constraint: MOVEMENT_CONSTRAINTS.Passive,
        distance: 2,
        temporary: true,
      });
      this.movement.push({
        type: MOVEMENT_TYPES.Fork,
        constraint: MOVEMENT_CONSTRAINTS.Agressive,
        distance: 1
      });
  }
}
