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
  HitAndRun: '0d4db427-b342-d587-e5ce-3a2f83183c6d',
  DrawNegOne: '68308f8c-2087-b64d-7bd8-97b98488e5aa',
  DrawPlusOne: '1fa0d186-0237-e13e-7449-f54092211149',
  DoubleAction: '40617317-15e1-5aa3-8cdd-3d3d131e9b4f',
  Knowledge: '0994b86a-4709-f096-63c9-07c6e1008bfd',
  Guard: '14f7ba84-92ba-d5b7-e468-d799eb0ed724',
  Condemn: 'b0dca050-b7d4-f83a-554f-4cfc4f2c7854',
  Revert: 'ff4ec85e-c8ad-858c-b97b-5338742bdc8e',
  Sacrifice: 'b7eb543b-31b8-87da-9e6c-d5d1056070e5',
  KingOfHill: '99d4a12e-e368-7700-5cd0-46548040fced'
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

  collection[CUBITS.DoubleAction] = {
    key: CUBITS.DoubleAction,
    name: "Double Action", 
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