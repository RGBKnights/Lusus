const uuidv4 = require('uuid/v4');

//#region Lookups

export const CLASSIFICATIONS = {
    Unknown: 0,
    Unit: 1,
    Royal: 2,
    Cubit: 3,
    Movement: 4,
    Trap: 5,
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

export const DURATION_TYPES = {
    Unknown: 0,
    Turn: 1,
    Move: 2,
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

//#endregion

//#region Cubits

export class BaseEntity {
    constructor(ownership, type, name) {
        // unique identifier
        this.id = uuidv4();
        // own owns the cubit
        this.ownership = ownership;
        // type of the cubit
        this.type = type;
        // the name of the type
        this.name = name;
        // english words for the Help (convert to transltions keys later)
        this.description = "";
        // for filtering
        this.classification = [];

        // track moves and turns
        this.moves = 0;
        this.turns = 0;

        // adictional movement options
        this.movement = [];
    }

    isType(type) {
        return this.type === type;
    }

    hasClassification(type) {
        return this.classification.includes(type);
    }
    
    onMoved(g, ctx) {
        this.moves++;
    }

    onTurnEnd(g, ctx) {
        this.turns++;
    }
}

export class BaseCubit extends BaseEntity {
    constructor(ownership, type, name) {
        super(ownership, type, name);

        // automatic removal duration options
        this.duration = { type: DURATION_TYPES.Unknown, amount: null };
    }
}

//#endregion

//#region Units

export class BaseUnit  extends BaseEntity {
    constructor(type, name, ownership, color) {
        super(type, name, ownership);
    
        this.color = color;

        this.cubits = [];
        this.slots = 3;
    }

    onMoved(g, ctx) {
        this.moves++;

        for (let i = 0; i < this.cubits.length; i++) {
            const id = this.cubits[i];
            let cubit = g.cubits.find(c => c.id === id);
            cubit.onMoved(g, ctx);
        }
    }

    onTurnEnd(g, ctx) {
        this.turns++;

        for (let i = 0; i < this.cubits.length; i++) {
            const id = this.cubits[i];
            let cubit = g.cubits.find(c => c.id === id);
            cubit.onTurnEnd(g, ctx);
        }
    }
}

//#endregion

//#region Locations

export class BaseLocation { 
    constructor(game, player = null, size = 0) {
        this.id = uuidv4();
        this.game = game;
        this.controller = player;
        this.collection = [];
        this.SIZE = size;
    }

    getSize() {
        return { width: this.SIZE , height: this.SIZE  };
    }

    getPositon(id) {
        return null;
    }

    getItem(x, y) {
        return null;
    }

    // REMOVE setItem() and have each super() have there own methods of actions() interface into the location...
    // example: Field.place(unit, x, y), Field.move(unit, x, y), Hand.draw(), Hand.***()
    // Field.play(cubit x, y), Units.play(cubit, y), Player.play(cubit), Arena.play(cubit),
    // Location.remove(id) [Cubit] => Location.****(Cubit)
    
    // TODO: move these usecases to the GameState
    

    // If we are taking the object then it needs to be removed from the source...
    setItem(obj, x = null, y = null) {
        return false;
    }
    
    getUnits(controller = null) {
        return [];
    }

    getCubits(controller = null) {
        return [];
    }
}

export class FieldLocation extends BaseLocation { 
    constructor(game) {
        super(game, null, 8);

        for (let x = 0; x < this.SIZE; x++) {
            let row = [];
            for (let y = 0; y < this.SIZE; y++) {
                row.push([]);
            }
            this.collection.push(row);
        }
    }

    getSize() {
        return { width: this.SIZE, height: this.SIZE };
    }

    getPositon(id) {
        for (let x = 0; x < this.SIZE; x++) {
            for (let y = 0; y < this.SIZE; y++) {
                let result = this.collection[x][y].findIndex(i => i.id === id);
                if(result !== -1) {
                    return {x: x, y: y};
                }
            }
        }
    }

    getItem(x,y) {
        return this.collection[x][y];
    }

    setItem(obj, x, y) {
        if(x < 0 || x > this.SIZE) {
            return false;
        }

        if(y < 0 || y > this.SIZE) {
            return false;
        }

        this.collection[x][y].push(obj);
        return true;
    }

    getUnits(controller = null) {
        let units = [];
        for (let x = 0; x < this.SIZE; x++) {
            for (let y = 0; y < this.SIZE; y++) {
                let objects = this.collection[x][y];
                let filtered = objects
                    .filter(o => controller == null || o.ownership === controller)
                    .filter(o => o.hasClassification(CLASSIFICATIONS.Unit));

                units = units.concat(filtered);
            }
        }
        units.sort(function(lhs, rhs) { return lhs.name.localeCompare(rhs.name); });
        return units;
    }

    getCubits(controller = null) {
        let cubits = [];
        let units = this.getUnits(controller);
        for (let i = 0; i < units.length; i++) {
            const unit = units[i];
            cubits = cubits.concat(unit.cubits);
        }
        cubits.sort(function(lhs, rhs) { return lhs.name.localeCompare(rhs.name); });
        return cubits;
    }
}

export class UnitsLocation extends BaseLocation {

    constructor(game, controller) {
        super(game, controller, 5);
    }

    getSize() {
        let units = this.game.locations.field.getUnits(this.controller);
        return { width: this.SIZE, height: units.length };
    }

    getPositon(id) {
        let units = this.game.locations.field.getUnits(this.controller);

        let index = units.findIndex(u => u.id === id);
        if(index !== -1) {
            return { x: 0, y: index };
        }

        for (let y = 0; y < units.length; y++) {
            const unit = units[y];
            
            for (let x = 0; x < unit.cubits.length; x++) {
                if(unit.cubits[x] === id) {
                    return { x: x + 1, y: y };
                }
            }
        }
    }

    getItem(x,y) {
        let units = this.game.locations.field.getUnits(this.controller);

        let unit = units[y];
        if(!unit) {
            return null;
        } 
    
        if(x === 0) {
            return unit.id;
        } else {
            return unit.cubits[x-1];
        }
    }

    setItem(obj, x, y = null) {
        let units = this.game.locations.field.getUnits(this.controller);

        let unit = units[y];
        if(!unit) {
            return false;
        }

        if(unit.cubits.length === unit.slots) {
            return false;
        }

        unit.cubits[x] = obj;

        return true;
    }

    getUnits(controller = null) {
        let units = this.game.locations.field.getUnits(this.controller);
        return units;
    }

    getCubits(controller = null) {
        let cubits = this.game.locations.field.getCubits(this.controller);
        return cubits;
    }
}

export class HandLocation extends BaseLocation { 
    constructor(game, controller) {
        super(game, controller, 5);

        for (let x = 0; x < this.SIZE; x++) {
            this.collection.push(null);
        }
    }

    getSize() {
        return { width: this.SIZE, height: 1 };
    }

    getPositon(id) {
        let x = this.collection.findIndex(o => o != null && o.id === id);
        return {x: x, y: 0};
    }

    getItem(x,y) {
        return this.collection[x];
    }

    setItem(obj, x, y = null) {
        if(x < 0 || x > this.SIZE) {
            return false;
        }

        this.collection[x] = obj;
        return true;
    }

    getCubits(controller = null) {
        return this.collection.filter(c => c != null);
    }
}

export class PlayerLocation extends BaseLocation {
    constructor(game, controller) {
        super(game, controller, 5);

        for (let x = 0; x < this.SIZE; x++) {
            this.collection.push(null);
        }
    }

    getSize() {
        return { width: this.SIZE, height: 1 };
    }

    getPositon(id) {
        let x = this.collection.findIndex(o => o.id === id);
        return {x: x, y: 0};
    }

    getItem(x, y) {
        return this.collection[x];
    }

    setItem(obj, x = null, y = null) {
        if(x < 0 || x > this.SIZE) {
            return false;
        }

        this.collection[x] = obj;
        return true;
    }

    getCubits(controller = null) {
        return this.collection.filter(c => c != null);
    }
}

export class ArenaLocation extends BaseLocation {
    constructor(game) {
        super(game, null, 1);

        this.collection.push(null);
    }

    getSize() {
        return { width: this.SIZE, height: this.SIZE };
    }

    getPositon(id) {
        if(this.collection[0]) {
            return {x: 0, y: 0};
        } else {
            return null;
        }
    }

    getItem(x, y) {
        return this.collection[0];
    }

    setItem(obj, x = null, y = null) {
        this.collection[0] = obj;
        return true;
    }

    getCubits(controller = null) {
        if(this.collection[0]) {
            return [this.collection[0]];
        } else {
            return [];
        }
    } 
}

export class BagLocation extends BaseLocation {
    constructor(game, controller) {
        super(game, controller, 5);
    }

    getSize() {
        let h = this.collection.length / this.SIZE;
        return { width: this.SIZE, height: h };
    }

    getPositon(id) {
        let i = this.collection.findIndex(c => c.id === id);
        if(i === -1) {
            return null;
        }
        return { x: i % this.SIZE, y: i / this.SIZE };
    }

    getItem(x, y) {
        let index = x + this.SIZE * y;
        return this.collection[index];
    }

    setItem(obj, x = null, y = null) {
        this.controller.push(obj);
        return true;
    }

    getCubits(controller = null) {
        return this.collection;
    }
}

export class ExileLocation extends BaseLocation {
    constructor(game, controller) {
        super(game, controller, 0);
    }

    setItem(obj, x = null, y = null) {
        this.controller.push(obj);
        return true;
    }

    getCubits(controller = null) {
        return this.collection;
    }
}

export class AfterlifeLocation extends BaseLocation { 
    constructor(game, ) {
        super(game, null, 5);
    }

    getSize() {
        return { width: this.SIZE, height: this.collection.length };
    }

    getPositon(id) {
        let i = this.collection.findIndex(c => c.id === id);
        if(i === -1) {
            return null;
        }
        return { x: i % this.SIZE, y: i / this.SIZE };
    }

    getItem(x, y) {
        let index = x + this.SIZE * y;
        return this.collection[index];
    }

    setItem(obj, x = null, y = null) {
        this.collection.push(obj);
        return true;
    }

    getUnits(controller = null) {
        let units = this.collection
            .filter(o => controller == null || o.ownership === controller)
            .filter(o => o.hasClassification(CLASSIFICATIONS.Unit));

        units.sort(function(lhs, rhs) { return lhs.name.localeCompare(rhs.name); });
        return units;
    }

    getCubits(controller = null) {
        let cubits = [];
        let units = this.getUnits(controller);
        for (let i = 0; i < units.length; i++) {
            const unit = units[i];
            cubits = cubits.concat(unit.cubits);
        }
        cubits.sort(function(lhs, rhs) { return lhs.name.localeCompare(rhs.name); });
        return cubits;
    }
}

//#endregion

//#region Game

export class GameState { 
    constructor(ctx) {
        this.id = uuidv4();
        this.counter = 0;
        this.locations = {
            field: new FieldLocation(this),
            arena: new ArenaLocation(this),
            afterlife:  new AfterlifeLocation(this)
        }
        this.players = {
            "0": {
                bag: new BagLocation(this, "0"),
                hand: new HandLocation(this, "0"),
                player: new PlayerLocation(this, "0"),
                slots: new UnitsLocation(this, "0"),
                exile: new ExileLocation(this, "0")
            },
            "1": {
                bag: new BagLocation(this, "1"),
                hand: new HandLocation(this, "1"),
                player: new PlayerLocation(this, "1"),
                slots: new UnitsLocation(this, "1"),
                exile: new ExileLocation(this, "1")
            }
        }
    }

    moveUnit(unit, target) {
        this.counter++;
    }

    playCubit(cubit, target) {

    }
}

//#endregion