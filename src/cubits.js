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
  Unknown: '0',
  Orthogonal: '1000',
  Diagonal: '1001',
  Cardinal: '1002',
  Pattern: '1003',
  SideStep: '1004',
  Swap: '1005',
  HitAndRun: '1006',
  DrawNegOne: '1007',
  DrawPlusOne: '1008',
  Knowledge: '1009',
  Guard: '1010',
  Condemn: '1011',
  Revert: '1012',
  Sacrifice: '1013',
  KingOfHill: '1014'
};

export function getCubitsDatabase() {
  let collection = {};
  collection[CUBITS.Orthogonal] = { 
    name: "Orthogonal",
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
    name: "Diagonal", 
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
    name: "Cardinal", 
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
    name: "Pattern", 
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
    name: "Sidestep", 
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
    // Not implemented - Needs [Movement Activation]
    name: "Swap", 
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

  collection[CUBITS.HitAndRun] = {
    // Not implemented - Needs [Movement Activation]
    name: "Hit & Run", 
    types: [TYPES.movement], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.units,
    targetWhat: TARGET_WHAT.any,
    activatable: true,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {}
  };

  collection[CUBITS.DrawNegOne] = { 
    name: "Draw -1", 
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
    name: "Draw +1", 
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
    name: "Knowledge", 
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

  collection[CUBITS.Guard] = { 
    // Not implemented - Effects movement modifiers...?
    name: "Guard", 
    types: [TYPES.unknown], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.units,
    targetWhat: TARGET_WHAT.any,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {}
  };

  collection[CUBITS.Condemn] = {
    // Not implemented - effects ability to place cubit on unit
    name: "Condemn", 
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

  collection[CUBITS.Revert] = {
    // Not implemented - Needs [Traps]
    name: "Revert",
    types: [TYPES.traps], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.unit,
    targetWhat: TARGET_WHAT.self,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: true,
    data: {}
  };

  collection[CUBITS.Sacrifice] = {
    // Not implemented - Needs [Movement Trigger]
    name: "Sacrifice",
    types: [TYPES.unknown], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.field,
    targetWhat: TARGET_WHAT.all,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
    data: {}
  };

  collection[CUBITS.KingOfHill] = {
    name: "King of Hill", 
    types: [TYPES.victory], 
    rarity: RARITY.unknown, 
    targetWhere: TARGET_WHERE.arena,
    targetWhat: TARGET_WHAT.any,
    activatable: false,
    durationType: 0,
    durationAmount: 0,
    hidden: false,
  };

  return collection;
}