
export const UNITS = {
  Unknown: '',
  Pawn: 'P',
  Rook: 'R',
  Knight: 'N',
  Bishop: 'B',
  Queen: 'Q',
  King: 'K',
}

export const CUBITS = {
  Unknown: 0,
  // Attachments - Contiguous Movement
  Orthogonal: 1001,
  Diagonal: 1002,
  Cardinal: 1003,
  SideStep: 1004,
  // Attachments - Pattern Movement
  Swap: 1005,
  Jump: 1006,
  // Attachments - Movement Modifier
  Enrage: 1007,
  Passify: 1008,
  Encumber: 1009,
  StickyFeet: 1010,
  // Attachments - Basic
  Condemn: 1011,
  Immunity: 1012,
  Poisoned: 1013,
  Bleed: 1014,
  // Attachments - Capture
  DarkMagic: 1015,
  Looter: 1016,
  // Attachments - Traps
  BlinkDodge: 1017,
  Recover: 1018,
  // OTU - Removal
  Destroy: 1019,
  Eliminate: 1020,
}

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
}

export const TARGETS = {
  Unknown: 0,
  Empty: 1,
  Unit: 2,
  Cubit: 3,
}

export const SPACE_TYPES = {
  Unknown: 0,
  Normal: 1,
  Empty: 2,
  Obstacle: 3
};