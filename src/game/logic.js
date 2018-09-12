import { CUBIT_TYPES, LOCATIONS } from './common';

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

    onPlay(g, ctx, source, destination, cubit) {
        switch (cubit.type) {
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
    
}