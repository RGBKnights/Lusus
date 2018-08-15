export const TYPES = {
  unknown: 0,
  movement: 1,
  traps: 2,
  victory: 3,
};

export const MOVEMENT = {
  invalid: 0,
  obstructed: 1,
  passive: 2,
  capture: 3,
  ally: 4,
};

export const RARITY = {
  unknown: 0,
  bronze: 1,
  silver: 2,
  gold: 3
};

export const TARGET_WHERE = {
  unknown: 0,
  player: 1,
  hand: 2,
  units: 3,
  board: 4,
  field: 5,
  arena: 6,
  afterlife: 7,
  reinforcements: 8,
};

export const TARGET_WHAT = {
  unknown: 0,
  self: 1,
  opponent: 2,
  pawn: 3,
  rook: 4,
  knight: 5,
  bishop: 6,
  queen: 7,
  king: 8,
  any: 9,
  all: 10
};

export const CUBITS = {
  Unknown: '',
  Orthogonal: '4ca1291d-5298-ea4a-8b6b-6ffbfdeefda1',
  Diagonal: 'b1cc8951-61af-0cf3-9e71-d2db03885226',
  Cardinal: 'a39e2c74-0968-eb73-7ea8-c71b21608685',
  Pattern: '2ca5a85e-116a-7971-6bbb-693d17f6ce3f',
  SideStep: 'd1f075a1-2d8c-8b2a-5776-b5c711134e67',
  Swap: '0b6d75f8-a2c2-29dc-e32c-c53a0fb1aeea',
  DrawNegOne: '68308f8c-2087-b64d-7bd8-97b98488e5aa',
  DrawPlusOne: '1fa0d186-0237-e13e-7449-f54092211149',
  DoubleAction: '40617317-15e1-5aa3-8cdd-3d3d131e9b4f', 
  Knowledge: '0994b86a-4709-f096-63c9-07c6e1008bfd',
  Condemn: 'b0dca050-b7d4-f83a-554f-4cfc4f2c7854',
  KingOfHill: '99d4a12e-e368-7700-5cd0-46548040fced', 
  HitRun: 'e3d77369-b78d-4236-bf53-b6f44b9fdfff', // Not Implemented - Working on it...
};

export function getCubitsDatabase() {
  let collection = {};
  collection[CUBITS.Orthogonal] = {
    key: CUBITS.Orthogonal,
    name: "Orthogonal",
    description: "Horizontal or Vertical movement of 8 spaces",
    types: [TYPES.movement],
    rarity: RARITY.unknown,
    targetWhere: TARGET_WHERE.units,
    targetWhat: TARGET_WHAT.any,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {
      distance: 8
    }
  };

  collection[CUBITS.Diagonal] = {
    key: CUBITS.Diagonal,
    name: "Diagonal", 
    description: "Diagonal movement of 8 spaces",
    types: [TYPES.movement], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.units,
    targetWhat: TARGET_WHAT.any,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {
      distance: 8
    }
  };

  collection[CUBITS.Cardinal] = {
    key: CUBITS.Cardinal,
    name: "Cardinal", 
    description: "Movement in any direction of 8 spaces",
    types: [TYPES.movement], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.units,
    targetWhat: TARGET_WHAT.any,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {
      distance: 8
    }
  };

  collection[CUBITS.Pattern] = {
    key: CUBITS.Pattern,
    name: "Pattern", 
    description: "You will move, unobstructed, to the end of 2/1 move pattern",
    types: [TYPES.movement], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.units,
    targetWhat: TARGET_WHAT.any,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {
      steps: [2,1]
    }
  };

  collection[CUBITS.SideStep] = {
    key: CUBITS.SideStep,
    name: "Sidestep", 
    description: "Move 1 space to the perpendicular of the forward direction of the unit",
    types: [TYPES.movement], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.units,
    targetWhat: TARGET_WHAT.any,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {
      distance: 1
    }
  };

  collection[CUBITS.Swap] = {   
    key: CUBITS.Swap,
    name: "Swap", 
    description: "Swap any adjacent unit as this units move",
    types: [TYPES.movement], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.units,
    targetWhat: TARGET_WHAT.pawn,
    activatable: true,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {}
  };

  collection[CUBITS.DrawNegOne] = {
    key: CUBITS.DrawNegOne,
    name: "Draw -1", 
    description: "Increases the amount the players draws by 1",
    types: [TYPES.unknown], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.player,
    targetWhat: TARGET_WHAT.opponent,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {
      amount: -1
    }
  };

  collection[CUBITS.DrawPlusOne] = {
    key: CUBITS.DrawPlusOne,
    name: "Draw +1", 
    description: "decreases the amount the players draws by 1",
    types: [TYPES.unknown], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.player,
    targetWhat: TARGET_WHAT.self,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {
      amount: 1
    }
  };

  collection[CUBITS.DoubleAction] = {
    key: CUBITS.DoubleAction,
    name: "Double Action", 
    description: "Increases the amount actions a player can preform by 1",
    types: [TYPES.unknown], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.player,
    targetWhat: TARGET_WHAT.self,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {
      amount: 1
    }
  };

  collection[CUBITS.Knowledge] = {
    key: CUBITS.Knowledge,
    name: "Knowledge", 
    description: "The opponents hand is revealed",
    types: [TYPES.unknown], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.player,
    targetWhat: TARGET_WHAT.self,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {}
  };

  collection[CUBITS.Condemn] = {
    
    key: CUBITS.Condemn,
    name: "Condemn", 
    description: "No additional cubits can be placed on this unit",
    types: [TYPES.unknown], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.units,
    targetWhat: TARGET_WHAT.opponent,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {}
  };

  collection[CUBITS.KingOfHill] = {
    key: CUBITS.KingOfHill,
    name: "King of Hill",
    description: "If your King unit is on this space at end of your turn you win the game",
    types: [TYPES.victory], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.arena,
    targetWhat: TARGET_WHAT.any,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {
      location: null
    }
  };

  collection[CUBITS.HitRun] = {
    key: CUBITS.HitRun,
    name: "Hit & Run",
    description: "After capturing a unit you may move the unit passively",
    types: [TYPES.unknown], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.units,
    targetWhat: TARGET_WHAT.self,
    activatable: true,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {}
  };

  return collection;
}