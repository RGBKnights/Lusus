const uuidv4 = require('uuid/v4');

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

/*
export const TARGETS = {
    Invalid: 0,
    Passive: 1,
    Enemy: 2,
    Ally: 3,
    Self: 4,
};
*/

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
    KingOfHill: '99d4a12e-e368-7700-5cd0-46548040fced'
};

export class CubitLocation {

    constructor(where = null, player = null, x = null, y = null, hidden = null) {
        this.key = uuidv4();
        this.where = where == null ? LOCATIONS.Unknown : where;
        this.player = player;
        this.x = x;
        this.y = y;
        this.hidden = hidden;
    }

    at(where, player = null, x = null, y = null) {
        // This might not work...!
        return (this.where == LOCATIONS.Unknown || this.where === where) &&
            (player == null || this.player === player) &&
            (x == null || this.x === x) &&
            (y == null || this.y === y);
    }

    same(loc, ignore = false) {
        return (this.where == LOCATIONS.Unknown || loc.where == LOCATIONS.Unknown || this.where === loc.where) &&
            (ignore === true || this.player == null || loc.player == null || this.player === loc.player) &&
            (this.x == null || loc.x == null || this.x === loc.x) &&
            (this.y == null || loc.y == null || this.y === loc.y);
    }
}

export class BaseCubit {
    constructor(key, name, alias, desc) {
        // Static
        this.key = key;
        this.name = name;
        this.alias = alias;
        this.description = desc;
        this.color = null;
        this.types = [];
        this.rarity = RARITY_TYPES.Unknown;
        
        // Dyanmic
        this.id = uuidv4();
        // own owns the Cubit
        this.ownership = null;
        // Take moves and turns
        this.moves = 0;
        this.turns = 0;
        // movement options
        this.movement = [];
        // duration options (Automatic Removal)
        this.duration = { type: DURATION_TYPES.Unknown, amount: null };
        // which boards and the location dose the cubit show up
        this.locations = [];
        // number of childern the cubit is allowed to have
        this.slots = 0;
    }

    isType(type) {
        return this.types.includes(type);
    }

    at(where, player = null, x = null, y = null) {
        return this.locations.filter(l => l.at(where, player, x, y)).length > 0;
    }

    interecpts(cubit, ignore = false) {
        cubit.locations.forEach(function(loc) {
            let results = this.locations.filter(l => l.same(loc, ignore)).length > 0;
            if(results === true) {
                return true;
            }
        });
        return false;
    }

    onMoved(g, ctx) {
        this.moves++;

        // Find children...?
    }

    onTurnEnd(g, ctx) {
        this.turns++;

        // Find children...?
    }

    onSelected(g, ctx) {
        if(g.selection === this.id) {
            g.selection = null;
        } else {
            g.selection = this.id;
        }
    }

    onActivated(g, ctx) {
        // Overrides...
    }

    onPlayed(g, ctx)  {
        // Overrides...
    }
}

export class KingUnit extends BaseCubit {
    constructor() {
        super(CUBITS.UnitKing, "King", "King", "");

        this.types.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 1, });
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 1, });
        this.movement.push({ type: MOVEMENT_TYPES.Castle });
        this.slots = 4;
    }

    onSelected(g, ctx) {
        super.onSelected(g, ctx);
        
        //TODO: stuff...!
    }

    onMoved = (g, ctx) => {
        super.onMoved(g, ctx);

        // Remove Castle from the movement when moved.
        this.movement = this.movement.filter(m => (m.type === MOVEMENT_TYPES.Castle) === false);
    }
}

export class QueenUnit extends BaseCubit {
    constructor() {
        super(CUBITS.UnitQueen, "Queen", "Queen", "");

        this.types.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
        this.slots = 4;
    }
}

export class BishopUnit extends BaseCubit {
    constructor() {
        super(CUBITS.UnitBishop, "Bishop", "Bishop", "");

        this.types.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
        this.slots = 4;
    }
}

export class RookUnit extends BaseCubit {
    constructor() {
        super(CUBITS.UnitRook, "Rook", "Rook", "");

        this.types.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
        this.slots = 4;
    }
}

export class KnightUnit extends BaseCubit {
    constructor() {
        super(CUBITS.UnitKnight, "Knight", "Knight", "");

        this.types.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Jump, step: [2,1] });
        this.slots = 4;
    }
}

export class PawnUnit extends BaseCubit {
    constructor() {
        super(CUBITS.UnitPawn, "Pawn", "Pawn", "");

        this.types.push(CLASSIFICATIONS.Unit);
        this.movement.push({ type: MOVEMENT_TYPES.Forward, distance: 1 });
        this.movement.push({ type: MOVEMENT_TYPES.Forward, distance: 2 });
        this.movement.push({ type: MOVEMENT_TYPES.Fork, distance: 1 });
        this.slots = 4;
    }

    onMoved = (g, ctx) => {
        super.onMoved(g, ctx);

        // Remove Dash from the movement when moved.
        this.movement = this.movement.filter(m => (m.type === MOVEMENT_TYPES.Forward && m.distance === 2) === false);
    }
}

export class OrthogonalCubit extends BaseCubit {
    constructor() {
        super(CUBITS.MovementOrthogonal, "Orthogonal", "Or", "");

        this.types.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
    }
}

export class DiagonalCubit extends BaseCubit {
    constructor() {
        super(CUBITS.MovementDiagonal, "Diagonal", "Di", "");

        this.types.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
    }
}

export class CardinalCubit extends BaseCubit {
    constructor() {
        super(CUBITS.MovementCardinal, "Cardinal", "Ca", "");

        this.types.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
    }
}

export class JumpCubit extends BaseCubit {
    constructor() {
        super(CUBITS.MovementJump, "Jump", "Jump", "");

        this.types.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Jump, steps: [2,1] });
    }
}

export class SideStepCubit extends BaseCubit {
    constructor() {
        super(CUBITS.MovementSideStep, "Side Step", "SS", "");

        this.types.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Sidestep, distance: 1 });
    }
}

export class SwapCubit extends BaseCubit {
    constructor() {
        super(CUBITS.MovementSwap, "Swap", "Sw", "");

        this.types.push(CLASSIFICATIONS.Movement);
    }
}

export class DrawNegOneCubit extends BaseCubit {
    constructor() {
        super(CUBITS.DrawNegOne, "Draw -1", "D-1", "");

        this.types.push(CLASSIFICATIONS.Unknown);
    }

    /*
    static isActive(g, ctx) {
        let cubits = getCubits(g);
        let player = ctx.currentPlayer;

        return cubits.filter(c => c.key === CUBITS.DrawNegOne && c.controller === player && c.at(LOCATIONS.Player)).length > 0;
    }
    */
}

export class DrawPlusOneCubit extends BaseCubit {
    constructor() {
        super(CUBITS.DrawPlusOne, "Draw +1", "D+1", "");

        this.types.push(CLASSIFICATIONS.Unknown);
    }

    /*
    static isActive(g, ctx) {
        let cubits = getCubits(g);
        let player = ctx.currentPlayer;

        return cubits.filter(c => c.key === CUBITS.DrawPlusOne && c.controller === player && c.at(LOCATIONS.Player)).length > 0;
    }
    */
}

export class DoubleActionCubit extends BaseCubit {
    constructor() {
        super(CUBITS.DoubleAction, "Double Action", "Da", "");

        this.types.push(CLASSIFICATIONS.Unknown);
    }

    static isActive(g, ctx) {
        let cubits = getCubits(g);
        let player = ctx.currentPlayer;

        return cubits.filter(c => c.key === CUBITS.DoubleAction && c.controller === player && c.at(LOCATIONS.Player)).length > 0;
    }
}

export class KnowledgeCubit extends BaseCubit {
    constructor() {
        super(CUBITS.Knowledge, "Knowledge", "Kn", "");
    }
  
    /*
    static isActive(g, ctx) {
        let cubits = getCubits(g);
        let player = ctx.currentPlayer;
        return cubits.filter(c => c.key === CUBITS.Knowledge && c.controller === player && c.at(LOCATIONS.Player)).length > 0;
    }
    */
}

export class CondemnCubit extends BaseCubit {
    constructor() {
        super(CUBITS.Condemn, "Condemn", "Co", "");
    }
}

export class KingOfHillCubit extends BaseCubit {
    constructor() {
        super(CUBITS.KingOfHill, "KingOfHill", "KoH", "");
    }

    onPlayed(g, ctx)  {
        let options = [
            new CubitLocation(LOCATIONS.Field, this.ownership, 3, 3),
            new CubitLocation(LOCATIONS.Field, this.ownership, 3, 4),
            new CubitLocation(LOCATIONS.Field, this.ownership, 4, 3),
            new CubitLocation(LOCATIONS.Field, this.ownership, 4, 4),
        ];
        let index = ctx.random.D4() - 1;
        let location = options[index];

        this.locations.push(location);
    }

    /*
    static isActive(g, ctx) {
        let cubits = getCubits(g);
        let player = ctx.currentPlayer;

        let cubits = cubits.filter(c => c.key === CUBITS.KingOfHill && c.at(LOCATIONS.Arena));
        cubits.forEach(function(cubit) {
            let result = cubits.filter(c => c.key === CUBITS.KingUnit && c.controller === player && c.interecpts(cubit, true)).length > 0;
            if(result ===  true) {
                return true;
            }
        });

        return false;
    }
    */
}

export function getCubits(g) {
    return g.cubits;
}

export function getCubit(g, id) {
    return g.cubits.find(c => c.id === id);
}

export function getDatabase() {
    let collection = [];

    collection.push(new OrthogonalCubit());
    collection.push(new DiagonalCubit());
    collection.push(new CardinalCubit());
    collection.push(new JumpCubit());
    collection.push(new SideStepCubit());
    collection.push(new DrawNegOneCubit());
    collection.push(new DrawPlusOneCubit());
    collection.push(new DoubleActionCubit());
    collection.push(new KnowledgeCubit());
    collection.push(new CondemnCubit());
    collection.push(new KingOfHillCubit());

    return collection;
}

export function getStartingCubits(ctx) {
    let collection = [];

    let players = ["0", "1"];

    let main = [
        {player: "0", offset: 0},
        {player: "1", offset: 7},
    ];
    let support = [
        {player: "0", offset: 1},
        {player: "1", offset: 6},
    ];

    players.forEach(function(p) {
        let cubits = getDatabase();
        cubits.forEach(function(cubit) {
            cubit.ownership = p;
            cubit.locations.push(new CubitLocation(LOCATIONS.Bag))
            collection.push(cubit);
        });
    });

    main.forEach(function(_) {
        {
            let cubit = new RookUnit();
            cubit.index = 
            cubit.color = "#FF5733";
            cubit.ownership = _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field, _.player, _.offset, 0));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player, 0, 0));
            collection.push(cubit);
        }
        {
            let cubit = new KnightUnit();
            cubit.color = "#F9FF33";
            cubit.ownership = _.player;
            cubit.locations.push(new CubitLocation( LOCATIONS.Field, _.player, _.offset, 1 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player, 0, 1 ));
            collection.push(cubit);
        }
        {
            let cubit = new BishopUnit();
            cubit.color = "#008000";
            cubit.ownership = _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field, _.player, _.offset, 2 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player,0, 2 ));
            collection.push(cubit);
        }
        {
            let cubit = new QueenUnit();
            cubit.color = "#33FFA8";
            cubit.ownership = _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field, _.player, _.offset, 3 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player,0, 3 ));
            collection.push(cubit);
        }
        {
            let cubit = new KingUnit();
            cubit.color = "#33F6FF";
            cubit.ownership = _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field, _.player, _.offset, 4 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player,0, 4 ));
            collection.push(cubit);
        }
        {
            let cubit = new BishopUnit();
            cubit.color = "#3346FF";
            cubit.ownership =  _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field, _.player, _.offset, 5 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player, 0, 5 ));
            collection.push(cubit);
        }
        {
            let cubit = new KnightUnit();
            cubit.color = "#800080";
            cubit.ownership = _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field,  _.player, _.offset, 6 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units,  _.player, 0, 6 ));
            collection.push(cubit);
        }
        {
            let cubit = new RookUnit();
            cubit.color = "#FF0000";
            cubit.ownership =  _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field, _.player, _.offset, 7 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player, 0, 7 ));
            collection.push(cubit);
        }
    });
    support.forEach(function(_) {
        {
            let cubit = new PawnUnit();
            cubit.color = "#FF5733";
            cubit.ownership =  _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field, _.player, _.offset, 0 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player, 0, 8 ));
            collection.push(cubit);
        }
        {
            let cubit = new PawnUnit();
            cubit.color = "#F9FF33";
            cubit.ownership = _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field, _.player, _.offset, 1 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player, 0, 9 ));
            collection.push(cubit);
        }
        {
            let cubit = new PawnUnit();
            cubit.color = "#008000";
            cubit.ownership = _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field, _.player, _.offset, 2 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player, 0, 10 ));
            collection.push(cubit);
        }
        {
            let cubit = new PawnUnit();
            cubit.color = "#33FFA8";
            cubit.ownership = _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field, _.player, _.offset, 3 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player, 0, 11 ));
            collection.push(cubit);
        }
        {
            let cubit = new PawnUnit();
            cubit.color = "#33F6FF";
            cubit.ownership = _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field, _.player, _.offset, 4 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player, 0, 12 ));
            collection.push(cubit);
        }
        {
            let cubit = new PawnUnit();
            cubit.color = "#3346FF";
            cubit.ownership = _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field, _.player, _.offset, 5 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player, 0, 13 ));
            collection.push(cubit);
        }
        {
            let cubit = new PawnUnit();
            cubit.color = "#800080";
            cubit.ownership = _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field, _.player, _.offset, 6 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player, 0, 14 ));
            collection.push(cubit);
        }
        {
            let cubit = new PawnUnit();
            cubit.color = "#FF0000";
            cubit.ownership = _.player;
            cubit.locations.push(new CubitLocation(LOCATIONS.Field, _.player, _.offset, 7 ));
            cubit.locations.push(new CubitLocation(LOCATIONS.Units, _.player, 0, 15 ));
            collection.push(cubit);
        }
    });
    
    return collection;
}