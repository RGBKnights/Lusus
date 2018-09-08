import { 
    // UNIT_TYPES,
    // CUBIT_TYPES,
    CLASSIFICATIONS,
    // MOVEMENT_TYPES,
    // DURATION_TYPES,
    Entity
} from './common';

import { 
    KingUnit,
    QueenUnit,
    BishopUnit,
    RookUnit,
    KnightUnit,
    PawnUnit
} from './units';

import { 
    OrthogonalCubit,
    DiagonalCubit,
    CardinalCubit,
    JumpCubit,
    SideStepCubit,
    SwapCubit,
    DrawNegOneCubit,
    DrawPlusOneCubit,
    DoubleActionCubit,
    KnowledgeCubit,
    CondemnCubit,
    KingOfHillCubit
} from './cubits';

export class BaseLocation { 
    constructor(stride, controller) {
        this.stride = stride;
        this.controller = controller;
    }

    getStride() {
        return this.stride;
    }

    getSize(g, ctx) {
        let value = this.getStride();
        return { width: value, height: value };
    }

    getIndex(x, y) {
        return x + this.getStride() * y;
    }

    setup(g, ctx) {
        // Overload...
    }
    
    getCollection(g, ctx) {
        return [];
    }

    getPositon(g, ctx, id) {
        let collection = this.getCollection(g, ctx);

        let i = collection.findIndex(c => c.id === id);
        if(i === -1) {
            return null;
        } else {
            return { x: i % this.getStride(), y: i / this.getStride() };
        }
    }

    getItem(g, ctx, x = null, y = null) {
        let collection = this.getCollection(g, ctx);
        if(collection.length === 0) {
            return null;
        }

        if(x == null) {
            return collection[0];
        } else if(y == null) {
            return collection[x];
        } else {
            let index = x + this.SIZE * y;
            return collection[index];
        }
    }

    setItem(g, ctx, obj, x = null, y = null) {
        let collection = this.getCollection(g, ctx);

        if(x == null) {
            collection.push(obj);
        } else if(y == null) {
            collection[x].push(obj);
        } else {
            let index = x + this.SIZE * y;
            collection[index] = obj;
        }

        return true;
    }

    removeItem(g, ctx, id) {
        let collection = this.getCollection(g, ctx);
        let i = collection.findIndex(c => c.id === id);
        if(i === -1) {
            return null;
        } else {
            let x = i % this.getStride();
            let y = i / this.getStride();
            return this.removeAt(x, y);
        }
    }

    removeAt(g, ctx, x = null, y = null) {
        let collection = this.getCollection(g, ctx);
        if(collection.length === 0) {
            return null;
        }

        if(x == null) {
            let value = collection[0];
            collection[0] = null;
            return value;
        } else if(y == null) {
            let value = collection[x];
            collection[x] = null;
            return value;
        } else {
            let index = x + this.SIZE * y;
            return collection[index];
        }
    }
}

export class FieldLocation extends BaseLocation { 
    constructor() {
        super(8, null);
    }

    getCollection(g, ctx) {
        return g.field;
    }

    setup(g, ctx) {
        let size = this.getSize();
        for (let x = 0; x < size.width; x++) {
            for (let y = 0; y < size.height; y++) {
                let index = x + size.width * y;
                g.field[index] = null;
            }
        }

        let options = [
            { player: "0", royal: 0, common: 1 },
            { player: "1", royal: 7, common: 6 }
        ];

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            g.field[this.getIndex(option.royal, 0)] = new RookUnit(option.player, "#FF5733");
            g.field[this.getIndex(option.royal, 1)] = new KnightUnit(option.player, "#F9FF33");
            g.field[this.getIndex(option.royal, 2)] = new BishopUnit(option.player, "#008000");
            g.field[this.getIndex(option.royal, 3)] = new QueenUnit(option.player, "#33FFA8");
            g.field[this.getIndex(option.royal, 4)] = new KingUnit(option.player, "#33F6FF");
            g.field[this.getIndex(option.royal, 5)] = new BishopUnit(option.player, "#3346FF");
            g.field[this.getIndex(option.royal, 6)] = new KnightUnit(option.player, "#800080");
            g.field[this.getIndex(option.royal, 7)] = new RookUnit(option.player, "#FF0000");

            g.field[this.getIndex(option.common, 0)] = new PawnUnit(option.player, "#FF5733");
            g.field[this.getIndex(option.common, 1)] = new PawnUnit(option.player, "#F9FF33");
            g.field[this.getIndex(option.common, 2)] = new PawnUnit(option.player, "#008000");
            g.field[this.getIndex(option.common, 3)] = new PawnUnit(option.player, "#33FFA8");
            g.field[this.getIndex(option.common, 4)] = new PawnUnit(option.player, "#33F6FF");
            g.field[this.getIndex(option.common, 5)] = new PawnUnit(option.player, "#3346FF");
            g.field[this.getIndex(option.common, 6)] = new PawnUnit(option.player, "#800080");
            g.field[this.getIndex(option.common, 7)] = new PawnUnit(option.player, "#FF0000");
        }
    }
}

export class UnitsLocation extends BaseLocation {

    constructor(controller) {
        super(5, controller);
    }

    getCollection(g, ctx) {
        let collection = g.field
            .filter(o => o != null)
            .filter(o => o.ownership === this.controller)
            .filter(o => Entity.hasClassification(o, CLASSIFICATIONS.Unit));

        collection.sort(function(lhs, rhs) { return lhs.name.localeCompare(rhs.name); });
        return collection;
    }

    getSize(g, ctx) {
        let collection = this.getCollection(g, ctx);
        let stride = this.getStride();
        return { width: stride, height: collection.length };
    }

    getPositon(g, ctx, id) {
        let units = this.getCollection(g, ctx);

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

    getItem(g, ctx, x = null, y = null) {
        if(x == null || y == null) {
            return null;
        }

        let units = this.getCollection(g, ctx);
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

    setItem(g, ctx, obj, x = null, y = null) {
        if(x == null || y == null) {
            return false;
        }

        let units = this.getCollection(g, ctx);
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

    removeItem(g, ctx, id) {
        let pos = this.getPositon(g, ctx, id);
        if(pos) {
            return this.removeAt(g, ctx, pos.x, pos.y);
        } else {
            return null;
        }
    }

    removeAt(g, ctx, x = null, y = null) {
        if(x == null || y == null) {
            return null;
        }

        let units = this.getCollection(g, ctx);
        let unit = units[y];
        if(unit) {
            if(x === 0) {
                // Find the orginal unit on the field and remove it there.
                let index = g.field.findIndex(e => e.id === unit.id);
                if(index > -1) {
                    let value = g.field[index];
                    g.field[index] = null;
                    return value;
                }
            } else {
                // remove the cubit on the unit.
                let value = unit.cubits[x-1];
                unit.cubits[x-1] = null;
                return value;
            }
        }

        return null;
    }
}

export class AfterlifeLocation extends UnitsLocation { 
    constructor(game, controller) {
        super(game, controller, 5);
    }

    getCollection(g, ctx) {
        let collection = g.players[this.controller].afterlife
            .filter(o => o != null)
            .filter(o => o.ownership === this.controller)
            .filter(o => Entity.hasClassification(o, CLASSIFICATIONS.Unit));

        collection.sort(function(lhs, rhs) { return lhs.name.localeCompare(rhs.name); });
        return collection;
    }
}

export class BagLocation extends BaseLocation { 
    constructor(controller) {
        super(5, controller);
    }

    getCollection(g, ctx) {
        return g.locations.players[this.controller].bag;
    }

    getSize(g, ctx) {
        let collection = this.getCollection(g, ctx);
        let stride = this.getStride();
        let h = collection.length / stride;
        return { width: stride, height: h };
    }

    setup(g, ctx) {
        g.players[this.controller].bag = [
            new OrthogonalCubit(),
            new DiagonalCubit(),
            new CardinalCubit(),
            new JumpCubit(),
            new SideStepCubit(),
            new SwapCubit(),
            new DrawNegOneCubit(),
            new DrawPlusOneCubit(),
            new DoubleActionCubit(),
            new KnowledgeCubit(),
            new CondemnCubit(),
            new KingOfHillCubit()
        ];

        g.players[this.controller].bag = ctx.random.Shuffle(g.players[this.controller].bag);
    }
}

export class ExileLocation extends BaseLocation {
    constructor() {
        super(5, null);
    }

    getCollection(g, ctx) {
        return g.exile;
    }

    getSize(g, ctx) {
        let collection = this.getCollection(g, ctx);
        let stride = this.getStride();
        let h = collection.length / stride;
        return { width: stride, height: h };
    }
}

export class ArenaLocation extends BaseLocation {
    constructor() {
        super(1, null);
    }

    getCollection(g, ctx) {
        return g.arena;
    }

    getSize(g, ctx) {
        return { width: 1, height: 1 };
    }

    setup(g, ctx) {
        g.arena = [null];
    }
}

export class AvatarLocation extends BaseLocation {
    constructor(controller) {
        super(5, controller);
    }

    getCollection(g, ctx) {
        return g.players[this.controller].avatar;
    }

    getSize(g, ctx) {
        return { width: this.getStride(), height: 1 };
    }

    setup(g, ctx) {
        let size = this.getSize();
        for (let x = 0; x < size.width; x++) {
            g.players[this.controller].avatar[x] = null;
        }
    }
}

export class HandLocation extends BaseLocation { 
    constructor(controller) {
        super(5, controller);
    }

    getCollection(g, ctx) {
        return g.players[this.controller].hand;
    }

    getSize(g, ctx) {
        return { width: this.getStride(), height: 1 };
    }

    setup(g, ctx) {
        let size = this.getSize();
        for (let x = 0; x < size.width; x++) {
            g.players[this.controller].hand[x] = null;
        }

        for (let i = 0; i < 3; i++) {
            let cubit = g.players[this.controller].bag.pop();
            g.players[this.controller].hand[i] = cubit;
        }
    }
}
