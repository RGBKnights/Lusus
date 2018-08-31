export const MOVEMENT_TYPES = {
    Unknown: 0,
    Orthogonal: 1,  // King, Queen, Rooks
    Diagonal: 2,    // King Queen, Bishop
    Jump: 3,        // Knights
    Fork: 4,        // Pawn
    Forward: 6,     // Pawn
    Backwards: 7,   // [NEW]
    Sidestep: 8,    // [NEW]
    Castle: 9,      // King
};

export const DURATION_TYPES = {
    Unknown: 0,
    Turn: 1,
    Move: 2,
};

export const RARITY_TYPES = {
    Unknown: 0,
    Turn: 1,
    Move: 2,
};

export const CLASSIFICATIONS = {
    Unknown: 0,
    Unit: 1,
    Movement: 2,
    Trap: 2,
};

export const LOCATIONS = {
    Unknown: 0,
    Bag: 1,
    Hand: 2,
    Player: 3,
    Units: 4,
    Field: 5,
    Arena: 6,
    Afterlife: 7,
    Exile: 8,
    Reinforcements: 9,
};

export const TARGETS = {
    Invalid: 0,
    Passive: 1,
    Enemy: 2,
    Ally: 3,
    Self: 4,
};

export const CUBITS = {
    Unknown: '',
    UnitKing: '0f94f609-f9bf-4006-a5ff-aa2cd6070e43',
    UnitQueen: '13c91e23-2ae0-41c7-a054-6d0165af76bb',
    UnitBishop: 'd0952339-98a0-4730-b774-79730dcce86f',
    UnitRook: '321a0734-862a-4507-bff2-6e656ab0e032',
    UnitKnight: 'b9cb40bf-8879-4f00-b8aa-a6428ff2c5bf',
    UnitPawn: 'b1f51714-f52e-415b-b77e-bfbad95d378a',
    MovementOrthogonal: '4ca1291d-5298-ea4a-8b6b-6ffbfdeefda1',
    MovementDiagonal: 'b1cc8951-61af-0cf3-9e71-d2db03885226',
    MovementCardinal: 'a39e2c74-0968-eb73-7ea8-c71b21608685',
    MovementPattern: '2ca5a85e-116a-7971-6bbb-693d17f6ce3f',
    MovementSideStep: 'd1f075a1-2d8c-8b2a-5776-b5c711134e67',
    MovementSwap: '0b6d75f8-a2c2-29dc-e32c-c53a0fb1aeea',
    DrawNegOne: '68308f8c-2087-b64d-7bd8-97b98488e5aa',
    DrawPlusOne: '1fa0d186-0237-e13e-7449-f54092211149',
    DoubleAction: '40617317-15e1-5aa3-8cdd-3d3d131e9b4f', 
    Knowledge: '0994b86a-4709-f096-63c9-07c6e1008bfd',
    Condemn: 'b0dca050-b7d4-f83a-554f-4cfc4f2c7854',
    KingOfHill: '99d4a12e-e368-7700-5cd0-46548040fced'
};

export class BaseCubit {
    constructor(key, name, desc) {
        this.key = key;
        this.name = name;
        this.description = desc;
        this.types = [];
        this.rarity = RARITY_TYPES.Unknown;
        // Which bag did the cubit come from
        this.ownership = null;
        // Who currently can perform actions on this cubit             
        this.controller = null;
        this.moves = 0,
        this.turns = 0,
        this.movement = [];
        this.duration = { type: DURATION_TYPES.Unknown, amount: null };
        this.locations = []; // { where: LOCATIONS.Unknown, x: 0, y: 0 }
        this.children = []
    }

    isType(type) {
        return this.types.includes(type);
    }

    isVisible(cubits, player, opponent) {
        if(this.at(LOCATIONS.Bag)) {
          return false;
        }

        if(this.at(LOCATIONS.Exile)) {
          return false;
        }

        if(this.controller === player) {
          return true;
        }
        
        if(this.controller === opponent) {
          if(this.at(LOCATIONS.Hand)) {
            let hasKnowledge = KnowledgeCubit.hasEffect(cubits, player, opponent);
            if(hasKnowledge) {
              return true;
            }

            return false;
          }
          if(this.at(LOCATIONS.Reinforcements)) {
            return false;
          }

          return true;
        }

        return false;
    }

    at(where) {
        return this.locations.filter(l => l.where === where).length > 0;
    }

    hasChild(key) {
        let result = false;

        this.children.forEach(function(cubit) {
            result = result || (cubit.key === key) || cubit.hasChild(key);
        });

        return result;
    }

    onMoved(cubits, player, opponent) {
        this.moves++;
        this.children.forEach(function(cubit) {
            cubit.onMoved(cubits);
        });
    }

    onTurnEnd() {
        this.turns++;
        this.children.forEach(function(cubit) {
            cubit.onTurnEnd(cubits);
        });
    }

    onSelected(cubits) {
        // Return targets...
        return [];
    }

    onActivated(cubits) {
        // Overrides...
    }

    onPlayed(cubits)  {
        // Overrides...
    }

    static hasEffect(cubits, player, opponent) {
      return false;
    }
}

export class KingUnit extends BaseCubit {
    constructor() {
        super(CUBITS.UnitKing, "King", "");

        this.types.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 1, });
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 1, });
        this.movement.push({ type: MOVEMENT_TYPES.Castle });
    }

    onMoved = (cubits, player, opponent) => {
        super.onMoved(cubits, player, opponent);

        // Remove Castle from the movement when moved.
        this.movement = this.movement.filter(m => (m.type === MOVEMENT_TYPES.Castle) === false);
    }
}

export class QueenUnit extends BaseCubit {
    constructor() {
        super(CUBITS.UnitQueen, "Queen", "");

        this.types.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
    }
}

export class BishopUnit extends BaseCubit {
    constructor() {
        super(CUBITS.UnitBishop, "Bishop", "");

        this.types.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
    }
}

export class RookUnit extends BaseCubit {
    constructor() {
        super(CUBITS.UnitRook, "Rook", "");

        this.types.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
    }
}

export class KnightUnit extends BaseCubit {
    constructor() {
        super(CUBITS.UnitKnight, "Knight", "");

        this.types.push(CLASSIFICATIONS.Unit);
        data.movement.push({ type: MOVEMENT_TYPES.Jump, step: [2,1] });
    }
}

export class PawnUnit extends BaseCubit {
    constructor() {
        super(CUBITS.UnitPawn, "Pawn", "");

        this.types.push(CLASSIFICATIONS.Unit);
        data.movement.push({ type: MOVEMENT_TYPES.Forward, distance: 1 });
        data.movement.push({ type: MOVEMENT_TYPES.Forward, distance: 2 });
        data.movement.push({ type: MOVEMENT_TYPES.Fork, distance: 1 });
    }

    onMoved = (cubits, player, opponent) => {
        super.onMoved(cubits, player, opponent);

        // Remove Dash from the movement when moved.
        this.movement = this.movement.filter(m => (m.type === MOVEMENT_TYPES.Forward && m.distance === 2) === false);
    }
}

export class KnowledgeCubit extends BaseCubit {
  constructor() {
      super(CUBITS.Knowledge, "Knowledge", "");
  }

  static hasEffect(cubits, player, opponent) {
    return cubits.filter(c => c.key === CUBITS.Knowledge && c.controller === player && c.at(LOCATIONS.Player)).length > 0;
  }
}

export function getCubitsDatabase() {
    let collection = [];

    // Units
    {
        collection.push(new KingUnit());
        collection.push(new QueenUnit());
        collection.push(new BishopUnit());
        collection.push(new RookUnit());
        collection.push(new KnightUnit());
        collection.push(new PawnUnit());
    }

    // Cubits - Movement
    {
        let data = new Cubit();
        data.key = CUBITS.Orthogonal;
        data.name = "Orthogonal Movement";
        data.description = "";
        data.types.push(CLASSIFICATIONS.Movement);
        data.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
        collection.push(data);
    }
    {
        let data = new Cubit();
        data.key = CUBITS.Diagonal;
        data.name = "Diagonal Movement";
        data.description = "";
        data.types.push(CLASSIFICATIONS.Movement);
        data.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
        collection.push(data);
    }


    return collection;
}