import { 
    // CUBIT_TYPES,
    // UNIT_TYPES,
    // MOVEMENT_TYPES,
    // DURATION_TYPES,
    // LOCATIONS 
} from './common';

export class GameLogic {
    initialize(g, ctx) {
        g.board = [];
        g.arena = null;
        g.afterlife = {
          cubits: [],
          units: []
        };
        g.bag = [];
        g.hand = [];
        g.avatar = [];
        g.exile = [];

        g.effects = {
          basics: [false, false],
          passify: [false, false],
          enraged: [false, false]
        };
        g.draws = {
          total: [3,3]
        };
        g.actions = {
          total: [1,1],
          count: [1,1],
        };
        g.movement = {
          total: [1,1],
          count: [1,1],
        };
    }
}