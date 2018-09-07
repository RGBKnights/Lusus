const uuidv4 = require('uuid/v4');

export const UNIT_LOCATIONS = {
    Unknown: null,
    Field: 1,
    Afterlife: 2,
    Reinforcements: 3,
};

export const CUBIT_LOCATIONS = {
    Unknown: null,
    Bag: 4,
    Hand: 5,
    Player: 6,
    Unit: 7,
    Field: 8,
    Arena: 9,
    Exile: 10,
};

export const CLASSIFICATIONS = {
    Unknown: 0,
    Unit: 1,
    Royal: 2,
    Movement: 3,
    Trap: 4,
};

export const MOVEMENT_TYPES = {
    Unknown: 0,
    Orthogonal: 1,  // King, Queen, Rooks
    Diagonal: 2,    // King Queen, Bishop
    Jump: 3,        // Knights
    Fork: 4,        // Pawn
    Forward: 5,     // Pawn
    Castle: 6,      // King
    Swap: 7,        // [New]
    Backwards: 8,   // [NEW]
    Sidestep: 9,    // [NEW]
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
    MovementJump: '2ca5a85e-116a-7971-6bbb-693d17f6ce3f',
    MovementSideStep: 'd1f075a1-2d8c-8b2a-5776-b5c711134e67',
    MovementSwap: '0b6d75f8-a2c2-29dc-e32c-c53a0fb1aeea',
    DrawNegOne: '68308f8c-2087-b64d-7bd8-97b98488e5aa',
    DrawPlusOne: '1fa0d186-0237-e13e-7449-f54092211149',
    DoubleAction: '40617317-15e1-5aa3-8cdd-3d3d131e9b4f', 
    Knowledge: '0994b86a-4709-f096-63c9-07c6e1008bfd',
    Condemn: 'b0dca050-b7d4-f83a-554f-4cfc4f2c7854',
    KingOfHill: '99d4a12e-e368-7700-5cd0-46548040fced',
    Enrage: '765857db-7109-4b3a-b12f-2657ac4cc3cd',
    Passify: '93eeb236-e43a-4b72-9f1f-5fb3687474fe',
};

export class BaseCubit {
    constructor(player, key, name, alias, desc) {
        // Static
        this.key = key;
        this.name = name;
        this.alias = alias;
        this.description = desc;
        this.types = [];
        this.rarity = RARITY_TYPES.Unknown;
        
        // Dyanmic
        this.id = uuidv4();
        // own owns the Cubit
        this.ownership = player;
        // Take moves and turns
        this.moves = 0;
        this.turns = 0;
        // movement options
        this.movement = [];
        // duration options (Automatic Removal)
        this.duration = { type: DURATION_TYPES.Unknown, amount: null };
        // where is the cubit
        this.location = null;
    }
}

export class OrthogonalCubit extends BaseCubit {
    constructor(player) {
        super(player, CUBITS.MovementOrthogonal, "Orthogonal", "Or", "");

        this.types.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
    }
}

export class BaseUnit {
    constructor(key, name, alias, desc) {
        // Static
        this.key = key;
        this.name = name;
        this.alias = alias;
        this.description = desc;
        this.color = null;
        this.types = [];
        
        // Dyanmic
        this.id = uuidv4();
        // own owns the Cubit
        this.ownership = null;
        // Take moves and turns
        this.moves = 0;
        this.turns = 0;
        // movement options
        this.movement = [];
        // where is the unit
        this.location = null;
        // Slots for attached cubits
        this.cubits = [];
    }

    onMoved(g, ctx) {
        this.moves++;

        for (let i = 0; i < this.cubits.length; i++) {
            const cubit = this.cubits[i];
            cubit.onMoved(g, ctx);
        }
    }
}

export class KingUnit extends BaseUnit {
    constructor(color, player) {
        super(CUBITS.UnitKing, "King", "Kg", "");

        this.ownership = player;
        this.color = color;
        this.types.push(CLASSIFICATIONS.Unit);
        this.types.push(CLASSIFICATIONS.Royal);

        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 1, });
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 1, });
        this.movement.push({ type: MOVEMENT_TYPES.Castle });
    }

    onMoved = (g, ctx) => {
        super.onMoved(g, ctx);

        this.movement = this.movement.filter(m => (m.type === MOVEMENT_TYPES.Castle) === false);
    }
}

export class ArenaLocation {
    constructor() {
        this.id = uuidv4();
        this.key = CUBIT_LOCATIONS.Arena;
        this.controller = null;
        this.cubit = null;
    }
}

export class BagLocation {
    constructor(player, cubits) {
        this.id = uuidv4();
        this.key = CUBIT_LOCATIONS.Bag;
        this.controller = player;
        this.cubits = cubits;
    }
}

export class ExileLocation {
    constructor() {
        this.id = uuidv4();
        this.key = CUBIT_LOCATIONS.Exile;
        this.controller = null;
        this.cubits = [];
    }
}

export class FieldLocation { 
    constructor() {
        this.id = uuidv4();
        this.key = CUBIT_LOCATIONS.Field;
        this.controller = null;
        this.field = [
            [[],[],[],[],[],[],[],[]], // 1
            [[],[],[],[],[],[],[],[]], // 2
            [[],[],[],[],[],[],[],[]], // 3
            [[],[],[],[],[],[],[],[]], // 4
            [[],[],[],[],[],[],[],[]], // 5
            [[],[],[],[],[],[],[],[]], // 6
            [[],[],[],[],[],[],[],[]], // 7
            [[],[],[],[],[],[],[],[]], // 8
        ];
    }

    at(x, y) {
        return this.field[x][y];
    }

    place(x,y,obj) {
        this.field[x][y].push(obj);
    }
}

export class HandLocation {
    constructor(player) {
        this.id = uuidv4();
        this.key = CUBIT_LOCATIONS.Hand;
        this.controller = player;
        this.cubits = [];
    }
}

export class PlayerLocation {
    constructor(player) {
        this.id = uuidv4();
        this.key = CUBIT_LOCATIONS.Player;
        this.controller = player;
        this.cubits = [];
    }
}

export class AfterlifeLocation {
    constructor(player) {
        this.id = uuidv4();
        this.key = CUBIT_LOCATIONS.Player;
        this.controller = player;
        this.units = [];
    }
}

export function getStartingCubits(ctx, player) {
    let cubits = [
        new OrthogonalCubit(player),
    ];
    return ctx.random.Shuffle(cubits);
}

export function getStartingState(ctx) {
    let data = {
        locations: []
    };

    // Field
    let options = [
        { player: "0", royal: 0, support: 1 },
        { player: "1", royal: 7, support: 6 }
    ];

    let field = new FieldLocation();
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        field.place(option.royal, 0, new RookUnit("#FF5733", option.player));
        field.place(option.royal, 1, new KnightUnit("#F9FF33", option.player));
        field.place(option.royal, 2, new BishopUnit("#008000", option.player));
        field.place(option.royal, 3, new QueenUnit("#33FFA8", option.player));
        field.place(option.royal, 4, new KingUnit("#33F6FF", option.player));
        field.place(option.royal, 5, new BishopUnit("#3346FF", option.player));
        field.place(option.royal, 6, new KnightUnit("#800080", option.player));
        field.place(option.royal, 7, new RookUnit("#FF0000", option.player));
    }
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        field.place(option.support, 0, new PawnUnit("#FF5733", option.player));
        field.place(option.support, 1, new PawnUnit("#F9FF33", option.player));
        field.place(option.support, 2, new PawnUnit("#008000", option.player));
        field.place(option.support, 3, new PawnUnit("#33FFA8", option.player));
        field.place(option.support, 4, new PawnUnit("#33F6FF", option.player));
        field.place(option.support, 5, new PawnUnit("#3346FF", option.player));
        field.place(option.support, 6, new PawnUnit("#800080", option.player));
        field.place(option.support, 7, new PawnUnit("#FF0000", option.player));
    }
    data.locations.push(field);

    // Arena
    data.locations.push(new ArenaLocation());

    // Player, Hand, Exile, & Afterlife
    for (let i = 0; i < options.length; i++) {
        const p = options[i].player;

        let cubits = getStartingCubits(ctx, p);
        let hand = cubits[p].split(0, 3);
        let bag = cubits[p].split(3);

        data.locations.push(new BagLocation(p, bag));
        data.locations.push(new HandLocation(p, hand));
        data.locations.push(new PlayerLocation(p));
        data.locations.push(new ExileLocation(p));
        data.locations.push(new AfterlifeLocation(p));
    }

    return data;
}