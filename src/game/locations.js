import { 
    // UNIT_TYPES,
    // CUBIT_TYPES,
    CLASSIFICATIONS,
    MOVEMENT_TYPES,
    // DURATION_TYPES,
    DIMENSIONS,
    LOCATIONS,
    TARGETING,
    COLORS,
    Entity,
    CUBIT_TYPES
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
    constructor(type, name, stride, hiddenFromSelf, hiddenFromOpponent) {
        this.type = type;
        this.name = name;
        this.stride = stride;
        this.hiddenFromSelf = hiddenFromSelf;
        this.hiddenFromOpponent = hiddenFromOpponent;
        this.dimensions = DIMENSIONS.Unknown;
    }

    getStride() {
        return this.stride;
    }

    inCircumference(g, ctx, controller, x, y) {
        let size = this.getSize(g, ctx, controller);
        if(x < 0)
            return false;
        else if(x < 0) 
            return false;
        else if (x > size.width)
            return false;
        else if (y > size.height)
            return false;
    }

    getSize(g, ctx, controller = null) {
        let value = this.getStride();
        return { width: value, height: value };
    }

    getIndex(x, y) {
        return x + this.getStride() * y;
    }

    setup(g, ctx, controller = null) {
        // Overload...
    }

    isHidden(g, ctx, controller, player) {
        if(player === null) {
            return false; 
        } else if (controller === player) {
            return this.hiddenFromSelf;
        } else {
            return this.hiddenFromOpponent;
        }
    }
    
    getCollection(g, ctx, controller = null) {
        return [];
    }

    getPositon(g, ctx, id, controller = null) {
        let collection = this.getCollection(g, ctx, controller);

        let i = collection.findIndex(c => c.id === id);
        if(i === -1) {
            return null;
        } else {
            return { x: i % this.getStride(), y: i / this.getStride() };
        }
    }

    getItem(g, ctx, controller = null, x = null, y = null) {
        let collection = this.getCollection(g, ctx, controller);
        if(collection.length === 0) {
            return null;
        }

        if(x == null) {
            return collection[0];
        } else if(y == null) {
            return collection[x];
        } else {
            let index = x + this.getStride() * y;
            return collection[index];
        }
    }

    setItem(g, ctx, controller = null, obj, x = null, y = null) {
        let collection = this.getCollection(g, ctx, controller);

        if(x == null) {
            collection.push(obj);
        } else if(y == null) {
            collection[x].push(obj);
        } else {
            let index = x + this.getStride() * y;
            collection[index] = obj;
        }

        return true;
    }

    removeItem(g, ctx, controller = null, id) {
        let collection = this.getCollection(g, ctx, controller);
        let i = collection.findIndex(c => c.id === id);
        if(i === -1) {
            return null;
        } else {
            let x = i % this.getStride();
            let y = i / this.getStride();
            return this.removeAt(x, y);
        }
    }

    removeAt(g, ctx, controller = null, x = null, y = null) {
        let collection = this.getCollection(g, ctx, controller);
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
            let index = x + this.getStride() * y;
            return collection[index];
        }
    }

    getTargets(g, ctx, player, controller, origin, entity) {
        return [];
    }
}

export class FieldLocation extends BaseLocation { 
    constructor() {
        super(LOCATIONS.Field, "Field", 8, false, false);

        this.dimensions = DIMENSIONS.Large;
    }

    getCollection(g, ctx, controller = null) {
        return g.field;
    }

    setup(g, ctx, controller = null) {
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

    getTargets(g, ctx, player, controller, origin, entity) {
        if(player !== entity.ownership) {
            return [];
        }

        if(Entity.hasClassification(entity, CLASSIFICATIONS.Cubit)) {
            return [];
        }

        let forward = player === '0' ? +1 : -1; // On the X axis
        // let opponentId = player === '0' ? '1' : '0';

        let movements = [].concat(entity.movement);
        for (let i = 0; i < entity.cubits.length; i++) {
            const cubit = entity.cubits[i];
            movements = movements.concat(cubit.movement);
        }

        let size = this.getSize(g, ctx, controller);
        let targets = [];
        for (let i = 0; i < movements.length; i++) {
            const movement = movements[i];
            switch (movement.type) {
                case MOVEMENT_TYPES.Orthogonal:
                {
                    let steps,x,y;
                    for (x = origin.x - 1, steps = 0; x >= 0 && steps < movement.distance; x--, steps++) {              
                        let item = this.getItem(g, ctx, controller, x, origin.y);
                        if(item) {
                            break;
                        }

                        let data = { l: LOCATIONS.Field, c: null, x: x, y: origin.y, color: COLORS.MovementPassive };
                        targets.push(data);
                    }

                    for (x = origin.x + 1, steps = 0; x < size.width && steps < movement.distance; x++, steps++) {
                        let item = this.getItem(g, ctx, controller, x, origin.y);
                        if(item) {
                            break;
                        }

                        let data = { l: LOCATIONS.Field, c: null, x: x, y: origin.y, color: COLORS.MovementPassive };
                        targets.push(data);
                    }
                    
                    for (y = origin.y - 1, steps = 0; y >= 0 && steps < movement.distance; y--, steps++) {
                        let item = this.getItem(g, ctx, controller, origin.x, y);
                        if(item) {
                            break;
                        }

                        let data = { l: LOCATIONS.Field, c: null, x: origin.x, y: y, color: COLORS.MovementPassive };
                        targets.push(data);
                    }

                    for (y = origin.y + 1, steps = 0; y < size.height && steps < movement.distance; y++, steps++) {
                        let item = this.getItem(g, ctx, controller, origin.x, y);
                        if(item) {
                            break;
                        }

                        let data = { l: LOCATIONS.Field, c: null, x: origin.x, y: y, color: COLORS.MovementPassive };
                        targets.push(data);
                    }

                    break;
                }
                case MOVEMENT_TYPES.Diagonal:
                {
                    let steps,x,y;

                    for (x = origin.x + 1, y = origin.y + 1, steps = 0; x < size.width && y < size.height && steps < movement.distance; x++, y++, steps++) {
                        let item = this.getItem(g, ctx, controller, x, y);
                        if(item) {
                            break;
                        }

                        let data = { l: LOCATIONS.Field, c: null, x: x, y: y, color: COLORS.MovementPassive };
                        targets.push(data);
                    }

                    for (x = origin.x - 1, y = origin.y - 1, steps = 0; x >= 0 && y >= 0 && steps < movement.distance; x--, y--, steps++) {
                        let item = this.getItem(g, ctx, controller, x, y);
                        if(item) {
                            break;
                        }

                        let data = { l: LOCATIONS.Field, c: null, x: x, y: y, color: COLORS.MovementPassive };
                        targets.push(data);
                    }

                    for (x = origin.x - 1, y = origin.y +1, steps = 0; x >= 0 && y < size.height && steps < movement.distance; x--, y++, steps++) {
                        let item = this.getItem(g, ctx, controller, x, y);
                        if(item) {
                            break;
                        }

                        let data = { l: LOCATIONS.Field, c: null, x: x, y: y, color: COLORS.MovementPassive };
                        targets.push(data);
                    }

                    for (x = origin.x + 1, y = origin.y - 1, steps = 0; x < size.width && y >= 0 && steps < movement.distance; x++, y--, steps++) {
                        let item = this.getItem(g, ctx, controller, x, y);
                        if(item) {
                            break;
                        }

                        let data = { l: LOCATIONS.Field, c: null, x: x, y: y, color: COLORS.MovementPassive };
                        targets.push(data);
                    }

                    break;
                }
                case MOVEMENT_TYPES.Jump:
                {
                    let moves = [];
                    moves.push({ x: origin.x + movement.steps[0], y: origin.y + movement.steps[1] });
                    moves.push({ x: origin.x + movement.steps[0], y: origin.y - movement.steps[1] });
                    moves.push({ x: origin.x - movement.steps[0], y: origin.y + movement.steps[1] });
                    moves.push({ x: origin.x - movement.steps[0], y: origin.y - movement.steps[1] });
                    moves.push({ x: origin.x + movement.steps[1], y: origin.y + movement.steps[0] });
                    moves.push({ x: origin.x - movement.steps[1], y: origin.y + movement.steps[0] });
                    moves.push({ x: origin.x + movement.steps[1], y: origin.y - movement.steps[0] });
                    moves.push({ x: origin.x - movement.steps[1], y: origin.y - movement.steps[0] });

                    for (let i = 0; i < moves.length; i++) {
                        const move = moves[i];

                        if(this.inCircumference(g, ctx, controller, move.x, move.y) === false) {
                            break;
                        }

                        let item = this.getItem(g, ctx, null, move.x, move.y);
                        if(item) {
                            break;
                        }

                        let data = { l: LOCATIONS.Field, c: null, x: move.x, y: move.y, color: COLORS.MovementPassive };
                        targets.push(data);
                    }

                    break;
                }
                case MOVEMENT_TYPES.Fork:
                {
                    let moves = [];
                    moves.push({ x: origin.x + forward, y: origin.y - 1 });
                    moves.push({ x: origin.x + forward, y: origin.y + 1 });

                    for (let i = 0; i < moves.length; i++) {
                        const move = moves[i];
                        let item = this.getItem(g, ctx, null, move.x, move.y);
                        if(item) {
                            let data = { l: LOCATIONS.Field, c: null, x: move.x, y: move.y, color: COLORS.MovementCapture };
                            targets.push(data);
                        }
                    }

                    break;
                }
                case MOVEMENT_TYPES.Forward:
                {
                    let steps,x;
                    for (x = origin.x + forward, steps = 0; x < size.width && steps < movement.distance; x += forward, steps++) {                 
                        let item = this.getItem(g, ctx, null, x, origin.y);
                        if(item) {
                           break;
                        }

                        let data = { l: LOCATIONS.Field, c: null, x: x, y: origin.y, color: COLORS.MovementPassive };
                        targets.push(data);
                    }

                    break;
                }
                case MOVEMENT_TYPES.Backwards:
                {
                    let steps,x;

                    for (x = origin.x - forward, steps = 0; x < size.width && steps < movement.distance; x -= forward, steps++) {
                        let item = this.getItem(g, ctx, null, x, origin.y);
                        if(item) {
                           break;
                        }

                        let data = { l: LOCATIONS.Field, c: null, x: x, y: origin.y, color: COLORS.MovementPassive };
                        targets.push(data);
                    }

                    break;
                }
                case MOVEMENT_TYPES.Sidestep:
                {
                    let moves = [];
                    moves.push({ x: origin.x, y: origin.y - 1 });
                    moves.push({ x: origin.x, y: origin.y + 1 });

                    for (let i = 0; i < moves.length; i++) {
                        const move = moves[i];

                        if(this.inCircumference(g, ctx, null, move.x, move.y) === false) {
                            break;
                        }

                        let item = this.getItem(g, ctx, null, move.x, move.y);
                        if(item) {
                            break;
                        }

                        let data = { l: LOCATIONS.Field, c: null, x: move.x, y: move.y, color: COLORS.MovementPassive };
                        targets.push(data);
                    }

                    break;
                }
                
                case MOVEMENT_TYPES.Swap:
                {
                    let moves = [];
                    moves.push({ x: origin.x + 1, y: origin.y });
                    moves.push({ x: origin.x - 1, y: origin.y });
                    moves.push({ x: origin.x, y: origin.y + 1 });
                    moves.push({ x: origin.x, y: origin.y - 1 });
                    moves.push({ x: origin.x + 1, y: origin.y + 1 });
                    moves.push({ x: origin.x - 1, y: origin.y + 1 });
                    moves.push({ x: origin.x + 1, y: origin.y - 1 });
                    moves.push({ x: origin.x - 1, y: origin.y - 1 });

                    for (let i = 0; i < moves.length; i++) {
                        const move = moves[i];

                        if(this.inCircumference(g, ctx, null, move.x, move.y) === false) {
                            break;
                        }

                        let item = this.getItem(g, ctx, null, move.x, move.y);
                        if(item) {
                            let data = { l: LOCATIONS.Field, c: null, x: move.x, y: move.y, color: COLORS.MovementPassive };
                            targets.push(data);
                        }
                    }

                    break;
                }
                case MOVEMENT_TYPES.Castle:
                {
                    // TODO: Finish Implementation...
                    // 1. Find path to rooks
                    // 2. If clear then put target as the Rook

                    break;
                }
                default:
                {
                    break;
                }
            }
        }

        //TODO: Filter at end OR during...?
        for (let i = 0; i < entity.cubits.length; i++) {
            const cubit = entity.cubits[i];
            if(cubit.type === CUBIT_TYPES.Enrage) {
                // targets = targets.filter(t => t.type === ?);
            }
            if(cubit.type === CUBIT_TYPES.Passify) {
                // targets = targets.filter(t => t.type === ?);
            }
        }

        return targets;
    }
}

export class UnitsLocation extends BaseLocation {

    constructor() {
        super(LOCATIONS.Units, "Units", 5, false, false);

        this.dimensions = DIMENSIONS.Large;
    }

    getCollection(g, ctx, controller = null) {
        let collection = g.field
            .filter(o => o != null)
            .filter(o => o.ownership === controller)
            .filter(o => Entity.hasClassification(o, CLASSIFICATIONS.Unit));

        collection.sort(function(lhs, rhs) { return lhs.name.localeCompare(rhs.name); });
        return collection;
    }

    getSize(g, ctx, controller = null) {
        let collection = this.getCollection(g, ctx, controller);
        let stride = this.getStride();
        return { width: stride, height: collection.length };
    }

    getPositon(g, ctx, controller = null, id) {
        let units = this.getCollection(g, ctx, controller);

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

    getItem(g, ctx, controller = null, x = null, y = null) {
        if(x == null || y == null) {
            return null;
        }

        let units = this.getCollection(g, ctx, controller);
        let unit = units[y];
        if(!unit) {
            return null;
        } 
    
        if(x === 0) {
            return unit;
        } else {
            return unit.cubits[x-1];
        }
    }

    setItem(g, ctx, controller = null, obj, x = null, y = null) {
        if(x == null || y == null) {
            return false;
        }

        let units = this.getCollection(g, ctx, controller);
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

    removeItem(g, ctx, controller = null, id) {
        let pos = this.getPositon(g, ctx, controller, id);
        if(pos) {
            return this.removeAt(g, ctx, pos.x, pos.y);
        } else {
            return null;
        }
    }

    removeAt(g, ctx, controller = null, x = null, y = null) {
        if(x == null || y == null) {
            return null;
        }

        let units = this.getCollection(g, ctx, controller);
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

export class AfterlifeLocation extends BaseLocation { 
    constructor() {
        super(LOCATIONS.Afterlife, "Afterlife", 5, true, true);

        this.dimensions = DIMENSIONS.Medium;
    }
    
    getCollection(g, ctx, controller = null) {
        let collection = g.players[controller].afterlife;
        collection.sort(function(lhs, rhs) { return lhs.name.localeCompare(rhs.name); });
        return collection;
    }

    getSize(g, ctx, controller = null) {
        let collection = this.getCollection(g, ctx, controller);
        let stride = this.getStride();
        return { width: stride, height: collection.length };
    }

    getPositon(g, ctx, controller = null, id) {
        let units = this.getCollection(g, ctx, controller);

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

    getItem(g, ctx, controller = null, x = null, y = null) {
        if(x == null || y == null) {
            return null;
        }

        let units = this.getCollection(g, ctx, controller);
        let unit = units[y];
        if(!unit) {
            return null;
        } 
    
        if(x === 0) {
            return unit;
        } else {
            return unit.cubits[x-1];
        }
    }

    setItem(g, ctx, controller = null, obj, x = null, y = null) {
        if(x == null || y == null) {
            return false;
        }

        let units = this.getCollection(g, ctx, controller);
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

    removeItem(g, ctx, controller = null, id) {
        let pos = this.getPositon(g, ctx, controller, id);
        if(pos) {
            return this.removeAt(g, ctx, pos.x, pos.y);
        } else {
            return null;
        }
    }

    removeAt(g, ctx, controller = null, x = null, y = null) {
        if(x == null || y == null) {
            return null;
        }

        let units = this.getCollection(g, ctx, controller);
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

export class BagLocation extends BaseLocation { 
    constructor() {
        super(LOCATIONS.Bag, "Bag", 5, true, true);

        this.dimensions = DIMENSIONS.Medium;
    }

    getCollection(g, ctx, controller = null) {
        return g.players[controller].bag;
    }

    getSize(g, ctx, controller = null) {
        let collection = this.getCollection(g, ctx, controller);
        let stride = this.getStride();
        let h = collection.length / stride;
        return { width: stride, height: h };
    }

    setup(g, ctx, controller = null) {
        g.players[controller].bag = [
            new OrthogonalCubit(controller),
            new DiagonalCubit(controller),
            new CardinalCubit(controller),
            new JumpCubit(controller),
            new SideStepCubit(controller),
            new SwapCubit(controller),
            new DrawNegOneCubit(controller),
            new DrawPlusOneCubit(controller),
            new DoubleActionCubit(controller),
            new KnowledgeCubit(controller),
            new CondemnCubit(controller),
            new KingOfHillCubit(controller)
        ];

        g.players[controller].bag = ctx.random.Shuffle(g.players[controller].bag);
    }
}

export class ExileLocation extends BaseLocation {
    constructor() {
        super(LOCATIONS.Exile, "Exile", 5, true, true);

        this.dimensions = DIMENSIONS.Medium;
    }

    getCollection(g, ctx, controller = null) {
        return g.players[controller].exile;
    }

    getSize(g, ctx, controller = null) {
        let collection = this.getCollection(g, ctx, controller);
        let stride = this.getStride();
        let h = collection.length / stride;
        return { width: stride, height: h };
    }
}

export class ArenaLocation extends BaseLocation {
    constructor() {
        super(LOCATIONS.Arena, "Arena", 1, false, false);

        this.dimensions = DIMENSIONS.Small;
    }

    getCollection(g, ctx, controller = null) {
        return g.arena;
    }

    getSize(g, ctx, controller = null) {
        return { width: 1, height: 1 };
    }

    setup(g, ctx, controller = null) {
        g.arena = [null];
    }
}

export class AvatarLocation extends BaseLocation {
    constructor() {
        super(LOCATIONS.Avatar, "Player", 5, false, false);

        this.dimensions = DIMENSIONS.Single;
    }

    getCollection(g, ctx, controller = null) {
        return g.players[controller].avatar;
    }

    getSize(g, ctx, controller = null) {
        return { width: this.getStride(), height: 1 };
    }

    setup(g, ctx, controller = null) {
        let size = this.getSize();
        for (let x = 0; x < size.width; x++) {
            g.players[controller].avatar[x] = null;
        }
    }
}

export class HandLocation extends BaseLocation { 
    constructor() {
        super(LOCATIONS.Hand, "Hand", 5, false, true);

        this.dimensions = DIMENSIONS.Single;
    }

    isHidden(g, ctx, controller, player) {
        let isHidden = super.isHidden(g, ctx, controller, player);

        //TODO: If 'opponent' has [Knowledge] then override 'isHidden' = false

        return isHidden;
    }

    getCollection(g, ctx, controller = null) {
        return g.players[controller].hand;
    }

    getSize(g, ctx, controller = null) {
        return { width: this.getStride(), height: 1 };
    }

    setup(g, ctx, controller = null) {
        let size = this.getSize();
        for (let x = 0; x < size.width; x++) {
            g.players[controller].hand[x] = null;
        }

        let draws = g.players[controller].draws;
        for (let i = 0; i < draws; i++) {
            let cubit = g.players[controller].bag.pop();
            g.players[controller].hand[i] = cubit;
        }
    }

    getTargets(g, ctx, player, controller, origin, entity) {
        let opponent = player === '0' ? '1' : "0";
 
        let targets = [];
        for (let i = 0; i < entity.targets.length; i++) {
            const target = entity.targets[i];

            // WHOM
            let whom = null;
            if(target.whom === TARGETING.Self) {
                whom = player;
            } else if(target.whom === TARGETING.Opponent) {
                whom = opponent;
            } else if(target.whom === TARGETING.Any) {
                whom = null;
            } else {
                // invalid target
                continue;
            }

            if(target.where === LOCATIONS.Arena) {
                let data = { l: target.where, c: null, x: 0, y: 0, color: COLORS.Play };
                targets.push(data);
                continue;
            } else if(target.where === LOCATIONS.Avatar) {
                let location = findLocation(target.where);
                let size = location.getSize(g, ctx);
                for (let x = 0; x < size.width; x++) {
                    for (let y = 0; y < size.height; y++) {
                        let cubit = location.getItem(g, ctx, whom, x, y);
                        if(!cubit) {
                            let data = { l: target.where, c: whom, x: x, y: y, color: COLORS.Play };
                            targets.push(data);
                        }
                    }
                }
            } else if(target.where === LOCATIONS.Units) {
                let location = findLocation(target.where);
                let size = location.getSize(g, ctx, whom);

                for (let y = 0; y < size.height; y++) {
                    let unit = location.getItem(g, ctx, whom, 0, y);
                    if(!unit) {
                        continue;
                    }

                    if(target.what && (target.what !== unit.type)) {
                        continue;
                    }
                    if(target.filter && (Entity.hasClassification(unit, target.filter) === false)) {
                        continue;
                    }

                    for (let x = 1; x < size.width; x++) {
                        let cubit = location.getItem(g, ctx, whom, x, y);
                        if(cubit) {
                            if(target.what && target.what === cubit.type) {
                                let data = { l: target.where, c: whom, x: x, y: y, color: COLORS.Play };
                                targets.push(data);
                            }

                            if(target.filter && Entity.hasClassification(cubit, target.filter)) {
                                let data = { l: target.where, c: whom, x: x, y: y, color: COLORS.Play };
                                targets.push(data);
                            }
                        } else {
                            let data = { l: target.where, c: whom, x: x, y: y, color: COLORS.Play };
                            targets.push(data);
                        }
                    }
                }
            } else if(target.where === LOCATIONS.Field) {
                let location = findLocation(target.where);
                let size = location.getSize(g, ctx);
                for (let x = 0; x < size.width; x++) {
                    for (let y = 0; y < size.height; y++) {
                        let item = location.getItem(g, ctx, null, x, y);
                        if(!item) {
                            let data = { l: target.where, c: whom, x: x, y: y, color: COLORS.Play };
                            targets.push(data);
                        }
                    }
                }
            } else {
                // invalid target
                continue;
            }
            
        }

        return targets;
    }
}

export function getLocations() {
    let locations = {
        arena: new ArenaLocation(),
        field: new FieldLocation(),
        bags: new BagLocation(),
        hands: new HandLocation(),
        avatars: new AvatarLocation(),
        exiles: new ExileLocation(),
        afterlifes: new AfterlifeLocation(),
        units: new UnitsLocation(),
    };
    return locations;
}

export function findLocation(type) {
    let locations = getLocations();
    if(type === locations.arena.type) {
        return locations.arena;
    } else if(type === locations.field.type) {
        return locations.field;
    } else if(type === locations.bags.type) {
        return locations.bags;
    } else if(type === locations.hands.type) {
        return locations.hands;
    } else if(type === locations.avatars.type) {
        return locations.avatars;
    } else if(type === locations.exiles.type) {
        return locations.exiles;
    } else if(type === locations.afterlifes.type) {
        return locations.afterlifes;
    } else if(type === locations.units.type) {
        return locations.units;
    }
}