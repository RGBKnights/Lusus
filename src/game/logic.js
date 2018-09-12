import {
    // UNIT_TYPES,
    // CUBIT_TYPES,
    // CLASSIFICATIONS,
    // MOVEMENT_TYPES,
    // DURATION_TYPES,
} from './common';

import {
    getLocations
} from './locations';

export class GameLogic {
    initialize(g, ctx) {
        let locations = getLocations();
        g.field = [];
        g.arena = [];

        locations.arena.setup(g, ctx, null);
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
    
}