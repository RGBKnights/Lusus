import { UNITS } from './commmon.js';

const uuidv4 = require('uuid/v4');

export class Unit {
  constructor(type, name, ownership, identifier) {
    // unique identifier
    this.id = uuidv4();

    // type of the cubit
    this.type = type;

    // the name of the type
    this.name = name;

    // own owns the cubit
    this.ownership = ownership;

    // unit identifier
    this.identifier = identifier;
  }
}

export class KingUnit extends Unit {
  constructor(ownership, identifier) {
      super(UNITS.King, "King", ownership, identifier);
  }
}

export class QueenUnit extends Unit {
  constructor(ownership, identifier) {
      super(UNITS.Queen, "Queen", ownership, identifier);
  }
}

export class BishopUnit extends Unit {
  constructor(ownership, identifier) {
      super(UNITS.Bishop, "Bishop", ownership, identifier);
  }
}

export class KnightUnit extends Unit {
  constructor(ownership, identifier) {
      super(UNITS.Knight, "Knight", ownership, identifier);
  }
}

export class RookUnit extends Unit {
  constructor(ownership, identifier) {
      super(UNITS.Rook, "Rook", ownership, identifier);
  }
}

export class PawnUnit extends Unit {
  constructor(ownership, identifier) {
      super(UNITS.Pawn, "Pawn", ownership, identifier);
  }
}

export function getStartingUnits(player) {
  return [
    // Royals
    new RookUnit(player, '#FF5733'),
    new KnightUnit(player, '#F9FF33'),
    new BishopUnit(player, '#008000'),
    new QueenUnit(player, '#33FFA8'),
    new KingUnit(player, '#33F6FF'),
    new BishopUnit(player, '#3346FF'),
    new KnightUnit(player, '#800080'),
    new RookUnit(player, '#FF0000'),
    // Commons
    new PawnUnit(player, '#FF5733'),
    new PawnUnit(player, '#F9FF33'),
    new PawnUnit(player, '#008000'),
    new PawnUnit(player, '#33FFA8'),
    new PawnUnit(player, '#33F6FF'),
    new PawnUnit(player,' #3346FF'),
    new PawnUnit(player, '#800080'),
    new PawnUnit(player, '#FF0000'),
  ];
}