import { 
    CUBIT_TYPES,
    UNIT_TYPES,
    MOVEMENT_TYPES,
    DURATION_TYPES,
    LOCATIONS 
} from './common';

import {
    // KingOfHillCubit
} from './cubits';

import {
    findLocation,
    getLocations
} from './locations';

export class GameLogic {
    initialize(g, ctx) {
        let locations = getLocations();
        g.board = [];
        g.field = [];
        g.arena = [];

        locations.arena.setup(g, ctx, null);
        locations.board.setup(g, ctx, null);
        locations.field.setup(g, ctx, null);

        g.players = {};

        for (let i = 0; i < 2; i++) {
            const p = i.toString();

            g.players[p] = {
                draws: 3, 
                actions: {
                    total: 1,
                    count: 1,
                },
                movement: {
                    total: 1,
                    count: 1,
                },
                bag: [],
                hand: [],
                avatar: [],
                exile: [],
                afterlife: [],
            };
            
            locations.bags.setup(g, ctx, p);
            locations.hands.setup(g, ctx, p);
            locations.avatars.setup(g, ctx, p);
        }
    }

    onPlay(g, ctx, source, destination, cubit) {
        switch (cubit.type) {
            case CUBIT_TYPES.DrawNegOne:
            {
                g.players[destination.c].draws--;
                break;
            }
            case CUBIT_TYPES.DrawPlusOne:
            {
                g.players[destination.c].draws++;
                break;
            }
            case CUBIT_TYPES.DoubleAction:
            {
                g.players[destination.c].actions.total++;
                break;
            }
            case CUBIT_TYPES.Condemn:
            {
                let location = findLocation(LOCATIONS.Units);
                let unit = location.getItem(g, ctx, destination.c, 0, destination.y);
                unit.isCondemned = true;
                break;
            }
            case CUBIT_TYPES.KingOfHill:
            {
                let options = [
                    { x:3, y:3 },
                    { x:3, y:4 },
                    { x:4, y:3 },
                    { x:4, y:4 }
                ];
                let index = ctx.random.D4() - 1;
                let pos = options[index];
                
                let location = findLocation(LOCATIONS.Field);
                location.setItem(g, ctx, null, cubit, pos.x, pos.y);

                break;
            }
            default:
                break;
        }

        return true;
    }
    
    onMove(g, ctx, source, destination, unit) {
        unit.moves++;

        // Update move count AND check for expired cubits
        let expiredCubits = [];
        for (let i = 0; i < unit.cubits.length; i++) {
            const cubit = unit.cubits[i];
            cubit.moves++;

            if(cubit.duration.type === DURATION_TYPES.Move) {
                if(cubit.moves >= cubit.duration.amount) {
                    expiredCubits.push(cubit.id);
                }
            }
        }

        // Move expired items to the Exile
        for (let i = 0; i < expiredCubits.length; i++) {
            const id = expiredCubits[i];
            let locationUnits = findLocation(LOCATIONS.Units);
            let pos = locationUnits.getPositon(g, ctx, unit.ownership, id);
            let item = locationUnits.removeItem(g, ctx, unit.ownership, pos.x, pos.y);
            let locationExile = findLocation(LOCATIONS.Exile);
            locationExile.setItem(g, ctx, unit.ownership, item);
        }

        switch (unit.type) {
            case UNIT_TYPES.Pawn:
            {
                unit.movement = unit.movement.filter(m => (m.type === MOVEMENT_TYPES.Forward && m.distance === 2) === false);
                break;
            }
            case UNIT_TYPES.King:
            {
                unit.movement = unit.movement.filter(m => (m.type === MOVEMENT_TYPES.Castle) === false);
                break;
            }
            case UNIT_TYPES.Rook:
            {
                let location = findLocation(LOCATIONS.Board);
                let item = location.findByType(g, ctx, unit.ownership, UNIT_TYPES.King);
                if(item) {
                    item.movement = unit.movement.filter(m => (m.type === MOVEMENT_TYPES.Castle) === false);
                }
                break;
            }
            default:
                break;
        }

        let locationField = findLocation(LOCATIONS.Field);
        let item = locationField.getItem(g, ctx, null, destination.x, destination.y);
        if(item && item.type === CUBIT_TYPES.KingOfHill) {
            ctx.events.endGame(unit.ownership);
        }

        return true;
    }

    onCapture(g, ctx, locationSource, locationDestination, unitSource, unitDestination) {
        if(unitDestination.type === UNIT_TYPES.King) {
            ctx.events.endGame(unitSource.ownership);
        }

        return true;
    }
}