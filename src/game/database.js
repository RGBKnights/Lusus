import { UNITS, CUBITS, LOCATIONS, PLACEMENT, TARGETS, DIRECTIONS } from './common';

function getUnits() {
  let data = {};
  data[UNITS.Bishop] = {
    key: UNITS.Pawn,
    name: 'Bishop',
    description: '',
    movements: [
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
    ],
  };
  data[UNITS.King] = {
    key: UNITS.Pawn,
    name: 'King',
    description: '',
    movements: [
      { directions: [DIRECTIONS.Forward], distance: 1, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back], distance: 1, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Left], distance: 1, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Right], distance: 1, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Left], distance: 1, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Right], distance: 1, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Left], distance: 1, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Right], distance: 1, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
    ],
  };
  data[UNITS.Queen] = {
    key: UNITS.Pawn,
    name: 'Queen',
    description: '',
    movements: [
      { directions: [DIRECTIONS.Forward], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
    ],
  };
  data[UNITS.Knight] = {
    key: UNITS.Pawn,
    name: 'Knight',
    description: '',
    movements: [
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Forward, DIRECTIONS.Left], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Forward, DIRECTIONS.Right], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Back, DIRECTIONS.Left], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Back, DIRECTIONS.Right], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Left, DIRECTIONS.Left, DIRECTIONS.Forward], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Left, DIRECTIONS.Left, DIRECTIONS.Back], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Right, DIRECTIONS.Right, DIRECTIONS.Forward], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Right, DIRECTIONS.Right, DIRECTIONS.Back], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
    ]
  };
  data[UNITS.Rook] = {
    key: UNITS.Pawn,
    name: 'Rook',
    description: '',
    movements: [
      { directions: [DIRECTIONS.Forward], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
    ],
  };
  data[UNITS.Pawn] = {
    key: UNITS.Pawn,
    name: 'Pawn',
    description: '',
    movements: [
      { directions: [DIRECTIONS.Forward], distance: 1, contiguous: true, targets: [TARGETS.Empty] },
      { directions: [DIRECTIONS.Forward], distance: 2, contiguous: true, consumable: true, targets: [TARGETS.Empty] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Left],  distance: 1, contiguous: true, targets: [TARGETS.Enemy] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Right], distance: 1, contiguous: true, targets: [TARGETS.Enemy] },
    ]
  };

  return data;
}

function getCubits() {
  let data = {};

  data[CUBITS.Orthogonal] = {
    key: CUBITS.Orthogonal,
    enabled: true,
    name: 'Orthogonal',
    description: 'This piece can move 7 spaces horizontally or vertically (like a Rook)',
    type: 'Attachment',
    subordinate: 'Contiguous Movement',
    placement: [
      { where: LOCATIONS.MyField, condition: PLACEMENT.Empty },
    ],
    movements: [
      { directions: [DIRECTIONS.Forward], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
    ],
  };
  data[CUBITS.Diagonal] = {
    key: CUBITS.Diagonal,
    enabled: true,
    name: 'Diagonal',
    description: 'This piece can move 7 spaces diagonally (like a Bishop)',
    type: 'Attachment',
    subordinate: 'Contiguous Movement',
    placement: [
      { where: LOCATIONS.MyField, condition: PLACEMENT.Empty },
    ],
    movements: [
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
    ],
  };
  data[CUBITS.Cardinal] = {
    key: CUBITS.Cardinal,
    enabled: true,
    name: 'Cardinal',
    description: 'This piece can move 7 spaces in any direction (like a Queen)',
    type: 'Attachment',
    subordinate: 'Contiguous Movement',
    placement: [
      { where: LOCATIONS.MyField, condition: PLACEMENT.Empty },
    ],
    movements: [
      { directions: [DIRECTIONS.Forward], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
    ],
  };
  data[CUBITS.Jump] = {
    key: CUBITS.Jump,
    enabled: true,
    name: 'Jump',
    description: 'This piece can move 2 spaces horizontal or vertical and then 1 the option direction (like a Knight)',
    type: 'Attachment',
    subordinate: 'Pattern Movement',
    placement: [
      { where: LOCATIONS.MyField, condition: PLACEMENT.Empty },
    ],
    movements: [
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Forward, DIRECTIONS.Left], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Forward, DIRECTIONS.Right], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Back, DIRECTIONS.Left], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Back, DIRECTIONS.Right], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Left, DIRECTIONS.Left, DIRECTIONS.Forward], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Left, DIRECTIONS.Left, DIRECTIONS.Back], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Right, DIRECTIONS.Right, DIRECTIONS.Forward], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Right, DIRECTIONS.Right, DIRECTIONS.Back], distance: 1, contiguous: false, targets: [TARGETS.Empty, TARGETS.Enemy] },
    ],
  };
  data[CUBITS.SideStep] = {
    key: CUBITS.SideStep,
    enabled: true,
    name: 'SideStep',
    description: 'This piece can passively move 1 space horizontally',
    type: 'Attachment',
    subordinate: 'Contiguous Movement',
    placement: [
      { where: LOCATIONS.MyField, condition: PLACEMENT.Empty },
    ],
    movements: [
      { directions: [DIRECTIONS.Left], distance: 1, contiguous: true, targets: [TARGETS.Empty] },
      { directions: [DIRECTIONS.Right], distance: 1, contiguous: true, targets: [TARGETS.Empty] },
    ],
  };
  data[CUBITS.Swap] = {
    key: CUBITS.Swap,
    enabled: true,
    name: 'Swap',
    description: 'This piece can Swap any adjacent piece as its move',
    type: 'Attachment',
    subordinate: 'Pattern Movement',
    placement: [
      { where: LOCATIONS.MyField, condition: PLACEMENT.Empty },
    ],
    movements: [
      { directions: [DIRECTIONS.Forward], distance: 7, contiguous: true, targets: [TARGETS.Friendly] },
      { directions: [DIRECTIONS.Back], distance: 7, contiguous: true, targets: [TARGETS.Friendly] },
      { directions: [DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Friendly] },
      { directions: [DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Friendly] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Friendly] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Friendly] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Friendly] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Friendly] },
    ],
  };

  data[CUBITS.Enrage] = {
    key: CUBITS.Enrage,
    enabled: true,
    hidden: false,
    name: 'Enrage',
    description: "The piece can only make Capture movements.",
    type: 'Attachment',
    subordinate: 'Movement Modifier',
    placement: [
      { where: LOCATIONS.OpponentsField, condition: PLACEMENT.Empty },
    ]
  };
  data[CUBITS.Passify] = {
    key: CUBITS.Passify,
    enabled: true,
    hidden: false,
    name: 'Passify',
    description: "The piece can only make Passive movements",
    type: 'Attachment',
    subordinate: 'Movement Modifier',
    placement: [
      { where: LOCATIONS.OpponentsField, condition: PLACEMENT.Empty },
    ]
  };
  data[CUBITS.Encumber] = {
    key: CUBITS.Encumber,
    enabled: true,
    hidden: false,
    name: 'Encumber',
    description: "",
    type: 'Attachment',
    subordinate: 'Movement Modifier',
    placement: [
      { where: LOCATIONS.OpponentsField, condition: PLACEMENT.Empty },
    ]
  };
  data[CUBITS.StickyFeet] = {
    key: CUBITS.StickyFeet,
    enabled: true,
    hidden: false,
    name: 'Sticky Feet',
    description: "",
    type: 'Attachment',
    subordinate: 'Movement Modifier',
    placement: [
      { where: LOCATIONS.OpponentsField, condition: PLACEMENT.Empty },
    ]
  };

  data[CUBITS.Condemn] = {
    key: CUBITS.Condemn,
    enabled: true,
    hidden: false,
    name: 'Condemn',
    description: "Replace a cubie on an opppent's piece with this one",
    type: 'Attachment',
    subordinate: '',
    placement: [
      { where: LOCATIONS.OpponentsField, condition: PLACEMENT.Cubit },
    ]
  };
  data[CUBITS.Immunity] = {
    key: CUBITS.Immunity,
    enabled: true,
    hidden: false,
    name: 'Immunity',
    description: "Attached piece slot's can not be targeted",
    type: 'Attachment',
    subordinate: '',
    placement: [
      { where: LOCATIONS.MyField, condition: PLACEMENT.Empty },
      { where: LOCATIONS.OpponentsField, condition: PLACEMENT.Empty },
    ]
  };
  data[CUBITS.Poisoned] = {
    key: CUBITS.Poisoned,
    enabled: true,
    hidden: false,
    name: 'Poisoned',
    description: "After this piece makes 3 moves it is sent to the afterlife",
    type: 'Attachment',
    subordinate: '',
    placement: [
      { where: LOCATIONS.OpponentsField, condition: PLACEMENT.Empty },
    ]
  };
  data[CUBITS.Bleed] = {
    key: CUBITS.Bleed,
    enabled: true,
    hidden: false,
    name: 'Bleed',
    description: "After moving, remove a random cubie from this piece; if this is only cubit then send the piece to the afterlife",
    type: 'Attachment',
    subordinate: '',
    placement: [
      { where: LOCATIONS.OpponentsField, condition: PLACEMENT.Empty },
    ]
  };

  data[CUBITS.Looter] = {
    key: CUBITS.Looter,
    enabled: true,
    hidden: false,
    name: 'Looter',
    description: "On Capture before the captured piece is sent to the afterlife, a random cubit attached to it is sent to your bag",
    type: 'Attachment',
    subordinate: 'Capture',
    placement: [
      { where: LOCATIONS.MyField, condition: PLACEMENT.Empty },
    ]
  };

  data[CUBITS.BlinkDodge] = {
    key: CUBITS.BlinkDodge,
    enabled: true,
    hidden: true,
    name: 'Blink Dodge',
    description: "When Captured, move the unit to a random unoccupied adjacent space. If no space is avaible it is captured.",
    type: 'Attachment',
    subordinate: 'Trap',
    placement: [
      { where: LOCATIONS.MyField, condition: PLACEMENT.Empty },
    ]
  };
  data[CUBITS.Recover] = {
    key: CUBITS.Recover,
    enabled: true,
    hidden: true,
    name: 'Recover',
    description: "When Captured put the cubies attached to the piece into the bag.",
    type: 'Attachment',
    subordinate: 'Trap',
    placement: [
      { where: LOCATIONS.MyField, condition: PLACEMENT.Empty },
    ]
  };

  data[CUBITS.Destroy] = {
    key: CUBITS.Destroy,
    enabled: true,
    hidden: false,
    name: 'Destroy',
    description: "Remove a Cubie from a unit",
    type: 'Consumable',
    subordinate: 'Removal',
    placement: [
      { where: LOCATIONS.MyField, condition: PLACEMENT.Cubit },
      { where: LOCATIONS.OpponentsField, condition: PLACEMENT.Cubit },
    ]
  };
  data[CUBITS.Eliminate] = {
    key: CUBITS.Eliminate,
    enabled: true,
    hidden: false,
    name: 'Eliminate',
    description: "Remove all Cubies from a unit",
    type: 'Consumable',
    subordinate: 'Removal',
    placement: [
      { where: LOCATIONS.MyField, condition: PLACEMENT.Unit },
      { where: LOCATIONS.OpponentsField, condition: PLACEMENT.Unit },
    ]
  };

  return data;
}

export const Database = {
  units: getUnits(),
  cubits: getCubits(),
};