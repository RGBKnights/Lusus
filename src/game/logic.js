import {
    // UNIT_TYPES,
    // CUBIT_TYPES,
    // CLASSIFICATIONS,
    // MOVEMENT_TYPES,
    // DURATION_TYPES,
} from './common';

import {
    FieldLocation,
    UnitsLocation,
    AfterlifeLocation,
    BagLocation,
    ExileLocation,
    ArenaLocation,
    AvatarLocation,
    HandLocation
} from './locations';

export class GameLogic {
    constructor() {
        this.locations = {
            arena: new ArenaLocation(),
            field: new FieldLocation(),
            bags: new BagLocation(),
            hands: new HandLocation(),
            avatars: new AvatarLocation(),
            exiles: new ExileLocation(),
            afterlifes: new AfterlifeLocation(),
            units: new UnitsLocation(),
        };
    }

    initialize(g, ctx) {
        g.field = [];
        g.arena = [];

        this.locations.arena.setup(g, ctx, null);
        this.locations.field.setup(g, ctx, null);

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
            
            this.locations.bags.setup(g, ctx, p);
            this.locations.hands.setup(g, ctx, p);
            this.locations.avatars.setup(g, ctx, p);
        }
    }
    
}