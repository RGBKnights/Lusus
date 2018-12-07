
export const UNITS = {
  Unknown: '',
  Pawn: 'P',
  Rook: 'R',
  Knight: 'N',
  Bishop: 'B',
  Queen: 'Q',
  King: 'K',
};

export const CUBITS = {
  Unknown: 0,
  // Contiguous Movement
  Orthogonal: 1001,
  Diagonal: 1002,
  Cardinal: 1003,
  SideStep: 1004,
  // Pattern Movement
  Swap: 1005,
  Jump: 1006,
  // Movement Modifiers
  Enrage: 1007,
  Passify: 1008,
  Encumber: 1009,
  StickyFeet: 1010,
  Poisoned: 1013,
  Bleed: 1014,
  // Capture
  Looter: 1016,
  // Traps
  BlinkDodge: 1017,
  Recover: 1018,
  // Removal
  Replacement: 1015,
  Destroy: 1019,
  Eliminate: 1020,
  // Targeting
  Condemn: 1011,
  Immunity: 1012,

  // Testing
  NoLeftTurn: 1021,
  Monster: 1022,
  Telaporter: 1023,
};

export const CUBIT_TYPES = {
  Unknown: 0,
  // Primary Types [~100]
  Attachment: 101,
  Consumable: 102,
  // Sub Types [~800]
  ContiguousMovement: 201,
  PatternMovement: 202,
  MovementModifer: 203,
  Capture: 204,
  Trap: 205,
  Removal: 206,
};

export const SPACE_TYPES = {
  Unknown: 0,
  Normal: 1,
  Empty: 2,
  Obstacle: 3
};

export const LOCATIONS = {
  Unknown: 0,
  Board: 1,
  MyField: 2,
  OpponentsField: 3
};

export const PLACEMENT = {
  Unknown: 0,
  Empty: 1,
  Cubit: 2,
  Unit: 3
};

export const DIRECTIONS = {
  Unknown: 0,
  Forward: 1,
  Back: 2,
  Left: 3,
  Right: 4,
};

export const TARGETS = {
  Unknown: 0,
  Empty: 1,
  Enemy: 2,
  Friendly: 3,
};

export function unitHasCubits(unit, type) {
  return unit.cubits.filter(_ => _ != null).filter(_ => _.type === type).length > 0;
}