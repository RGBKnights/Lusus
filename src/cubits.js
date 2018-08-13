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
  ActionNegOne: '1009',
  ActionPlusOne: '1010',
  Knowledge: '1011',
  Guard: '1012',
  Condemn: '1013',
  Revert: '1014',
  Sacrifice: '1015',
  KingOfHill: '1016'
};

export function getCubitsDatabase() {
  let collection = {};
  collection[CUBITS.Orthogonal] = {
    key: CUBITS.Orthogonal,
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
    key: CUBITS.Diagonal,
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
    key: CUBITS.Cardinal,
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
    key: CUBITS.Pattern,
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
    key: CUBITS.SideStep,
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
    key: CUBITS.Swap,
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
    key: CUBITS.HitAndRun,
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
    key: CUBITS.DrawNegOne,
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
    key: CUBITS.DrawPlusOne,
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

  collection[CUBITS.ActionNegOne] = {
    key: CUBITS.ActionNegOne,
    name: "Action -1", 
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

  collection[CUBITS.ActionPlusOne] = {
    key: CUBITS.ActionPlusOne,
    name: "Action +1", 
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
    key: CUBITS.Guard,
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
    key: CUBITS.Condemn,
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
    key: CUBITS.Revert,
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
    key: CUBITS.Sacrifice,
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
    key: CUBITS.KingOfHill,
    name: "King of Hill",
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

  return collection;
}