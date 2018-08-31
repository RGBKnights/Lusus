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

export class BaseCubit {
    constructor(key, name, desc) {
        this.key = key;
        this.name = name;
        this.description = desc;
        this.color = null;
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
        
        //this.children = [];
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
            if(KnowledgeCubit.isActive(cubits, player, opponent)) {
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

    isAt(where, x, y) {
        return this.locations.filter(l => l.where === where && l.x === x && l.y === y).length > 0;
    }

    hasOverlap(locations) {       
        locations.forEach(function(loc) {
            let results = this.locations.filter(l => l.where === loc.where && l.x === loc.x && l.y === loc.y).length > 0
            if(results == true) {
                return true;
            }
        });

        return false;
    }

    onMoved(g, ctx) {
        this.moves++;

        // Find Childern...?
    }

    onTurnEnd(g, ctx) {
        this.turns++;

        // Find Childern...?
    }

    onSelected(g, ctx) {
        // Return targets...
        return [];
    }

    onActivated(g, ctx) {
        // Overrides...
    }

    onPlayed(g, ctx)  {
        // Overrides...
    }

    static isActive(g, ctx) {
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

    onMoved = (g, ctx) => {
        super.onMoved(g, ctx);

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

    onMoved = (g, ctx) => {
        super.onMoved(g, ctx);

        // Remove Dash from the movement when moved.
        this.movement = this.movement.filter(m => (m.type === MOVEMENT_TYPES.Forward && m.distance === 2) === false);
    }
}

export class OrthogonalCubit extends BaseCubit {
    constructor() {
        super(CUBITS.MovementOrthogonal, "Orthogonal", "");

        this.types.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
    }
}

export class DiagonalCubit extends BaseCubit {
    constructor() {
        super(CUBITS.MovementDiagonal, "Diagonal", "");

        this.types.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
    }
}

export class DiagonalCubit extends BaseCubit {
    constructor() {
        super(CUBITS.MovementDiagonal, "Diagonal", "");

        this.types.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
    }
}

export class CardinalCubit extends BaseCubit {
    constructor() {
        super(CUBITS.MovementCardinal, "Cardinal", "");

        this.types.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Diagonal, distance: 8, });
        this.movement.push({ type: MOVEMENT_TYPES.Orthogonal, distance: 8, });
    }
}

export class JumpCubit extends BaseCubit {
    constructor() {
        super(CUBITS.MovementJump, "Jump", "");

        this.types.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Jump, steps: [2,1] });
    }
}

export class SideStepCubit extends BaseCubit {
    constructor() {
        super(CUBITS.MovementSideStep, "Side Step", "");

        this.types.push(CLASSIFICATIONS.Movement);
        this.movement.push({ type: MOVEMENT_TYPES.Sidestep, distance: 1 });
    }
}

export class SwapCubit extends BaseCubit {
    constructor() {
        super(CUBITS.MovementSwap, "Swap", "");

        this.types.push(CLASSIFICATIONS.Movement);
    }
}

export class DrawNegOneCubit extends BaseCubit {
    constructor() {
        super(CUBITS.DrawNegOne, "Draw -1", "");

        this.types.push(CLASSIFICATIONS.Unknown);
    }

    static isActive(g, ctx) {
        let cubits = getCubitsFromGameState(g);
        let player = ctx.currentPlayer;

        return cubits.filter(c => c.key === CUBITS.DrawNegOne && c.controller === player && c.at(LOCATIONS.Player)).length > 0;
    }
}

export class DrawPlusOneCubit extends BaseCubit {
    constructor() {
        super(CUBITS.DrawPlusOne, "Draw +1", "");

        this.types.push(CLASSIFICATIONS.Unknown);
    }

    static isActive(g, ctx) {
        let cubits = getCubitsFromGameState(g);
        let player = ctx.currentPlayer;

        return cubits.filter(c => c.key === CUBITS.DrawPlusOne && c.controller === player && c.at(LOCATIONS.Player)).length > 0;
    }
}

export class DoubleActionCubit extends BaseCubit {
    constructor() {
        super(CUBITS.DoubleAction, "Double Action", "");

        this.types.push(CLASSIFICATIONS.Unknown);
    }

    static isActive(g, ctx) {
        let cubits = getCubitsFromGameState(g);
        let player = ctx.currentPlayer;

        return cubits.filter(c => c.key === CUBITS.DoubleAction && c.controller === player && c.at(LOCATIONS.Player)).length > 0;
    }
}

export class KnowledgeCubit extends BaseCubit {
    constructor() {
        super(CUBITS.Knowledge, "Knowledge", "");
    }
  
    static isActive(g, ctx) {
        let cubits = getCubitsFromGameState(g);
        let player = ctx.currentPlayer;
        return cubits.filter(c => c.key === CUBITS.Knowledge && c.controller === player && c.at(LOCATIONS.Player)).length > 0;
    }
}

export class CondemnCubit extends BaseCubit {
    constructor() {
        super(CUBITS.Condemn, "Condemn", "");
    }
}

export class KingOfHillCubit extends BaseCubit {
    constructor() {
        super(CUBITS.KingOfHill, "KingOfHill", "");
    }

    onPlayed(g, ctx)  {
        let die = ctx.random.D4();
        let options = {
            '1': {where: LOCATIONS.Field, x: 3, y: 3},
            '2': {where: LOCATIONS.Field, x: 3, y: 4},
            '3': {where: LOCATIONS.Field, x: 4, y: 3},
            '4': {where: LOCATIONS.Field, x: 4, y: 4},
        };
        let location = options[die];

        this.ownership = ctx.currentPlayer;
        this.controller = null;
        this.locations.push(location);
    }

    static isActive(g, ctx) {
        let cubits = getCubitsFromGameState(g);
        let player = ctx.currentPlayer;

        let flags = cubits.filter(c => c.key === CUBITS.KingOfHill && c.at(LOCATIONS.Arena));
        flags.forEach(function(flag) {
            let result = cubits.filter(c => c.key === CUBITS.KingUnit && c.ownership === player && c.hasOverlap(flag.locations)).length > 0;
            if(result ===  true) {
                return true;
            }
        });

        return false;
    }
}

export function getCubitsFromGameState(g) {
    return g.cubits;
}

export function getCubitsDatabase() {
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
    let player1 = ctx.random.Shuffle(getCubitsDatabase());
    player1.forEach(function(cubit) {
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Bag });
    });

    {
        let cubit = new UnitRook();
        cubit.color = "#FF5733";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 0, y: 0 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 0 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitKnight();
        cubit.color = "#F9FF33";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 0, y: 1 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 1 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitBishop();
        cubit.color = "#008000";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 0, y: 2 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 2 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitQueen();
        cubit.color = "#33FFA8";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 0, y: 3 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 3 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitKing();
        cubit.color = "#33F6FF";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 0, y: 4 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 4 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitBishop();
        cubit.color = "#3346FF";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 0, y: 5 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 5 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitKnight();
        cubit.color = "#800080";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 0, y: 6 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 6 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitRook();
        cubit.color = "#FF0000";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 0, y: 7 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 7 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#FF5733";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 1, y: 0 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 8 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#F9FF33";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 1, y: 1 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 9 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#008000";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 1, y: 2 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 10 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#33FFA8";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 1, y: 3 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 11 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#33F6FF";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 1, y: 4 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 12 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#3346FF";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 1, y: 5 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 13 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#800080";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 1, y: 6 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 14 });
        player1.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#FF0000";
        cubit.ownership = "0";
        cubit.locations.push({where: LOCATIONS.Field, x: 1, y: 7 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 15 });
        player1.push(cubit);
    }

    let player2 = ctx.random.Shuffle(getCubitsDatabase());
    player2.forEach(function(cubit) {
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Bag })
    });

    {
        let cubit = new UnitRook();
        cubit.color = "#FF5733";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 7, y: 0 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 0 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitKnight();
        cubit.color = "#F9FF33";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 7, y: 1 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 1 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitBishop();
        cubit.color = "#008000";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 7, y: 2 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 2 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitQueen();
        cubit.color = "#33FFA8";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 7, y: 3 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 3 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitKing();
        cubit.color = "#33F6FF";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 7, y: 4 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 4 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitBishop();
        cubit.color = "#3346FF";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 7, y: 5 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 5 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitKnight();
        cubit.color = "#800080";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 7, y: 6 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 6 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitRook();
        cubit.color = "#FF0000";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 7, y: 7 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 7 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#FF5733";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 6, y: 0 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 8 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#F9FF33";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 6, y: 1 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 9 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#008000";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 6, y: 2 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 10 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#33FFA8";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 6, y: 3 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 11 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#33F6FF";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 6, y: 4 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 12 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#3346FF";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 6, y: 5 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 13 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#800080";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 6, y: 6 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 14 });
        player2.push(cubit);
    }
    {
        let cubit = new UnitPawn();
        cubit.color = "#FF0000";
        cubit.ownership = "1";
        cubit.locations.push({where: LOCATIONS.Field, x: 6, y: 7 });
        cubit.locations.push({where: LOCATIONS.Units, x: 0, y: 15 });
        player2.push(cubit);
    }

    return [].concat(player1).concat(player2);
}