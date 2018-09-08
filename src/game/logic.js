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
            bags: {
                "0": new BagLocation("0"),
                "1": new BagLocation("1"),
            },
            hands: {
                "0": new HandLocation("0"),
                "1": new HandLocation("1"),
            },
            avatars: {
                "0": new AvatarLocation("0"),
                "1": new AvatarLocation("1"),
            },
            exiles: {
                "0": new ExileLocation("0"),
                "1": new ExileLocation("1")
            },
            afterlifes:
            {
                "0": new AfterlifeLocation("0"),
                "1": new AfterlifeLocation("1")
            },
            units: {
                "0": new UnitsLocation("0"),
                "1": new UnitsLocation("1")
            }
        };
    }

    setup(g, ctx) {
        this.locations.arena.setup(g, ctx);
        this.locations.field.setup(g, ctx);

        for (let i = 0; i < 2; i++) {
            const p = i.toString();
            this.locations.bags[p].setup(g, ctx);
            this.locations.hands[p].setup(g, ctx);
            this.locations.avatars[p].setup(g, ctx);
        }
    }

    initialize(ctx) {
        return {
            field: [],
            arena: [],
            players: {
                "0": {
                    bag: [],
                    hand: [],
                    avatar: [],
                    exile: [],
                    afterlife: []
                },
                "1": {
                    bag: [],
                    hand: [],
                    avatar: [],
                    exile: [],
                    afterlife: []
                }
            }
        };
    }

    
}