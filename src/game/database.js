import { UNITS, CUBITS, LOCATIONS, PLACEMENT, TARGETS, DIRECTIONS } from './common';

function getUnits() {
  let data = {};
  data[UNITS.Bishop] = {
    name: 'Bishop',
    movements: [
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Forward, DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back, DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
    ],
  };
  data[UNITS.King] = {
    name: 'King',
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
    name: 'Queen',
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
    name: 'Knight',
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
    name: 'Rook',
    movements: [
      { directions: [DIRECTIONS.Forward], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Back], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Left], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
      { directions: [DIRECTIONS.Right], distance: 7, contiguous: true, targets: [TARGETS.Empty, TARGETS.Enemy] },
    ],
  };
  data[UNITS.Pawn] = {
    name: 'Pawn',
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

  return data;
}

export const Database = {
  units: getUnits(),
  cubits: getCubits(),
};