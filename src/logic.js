import { getCubitsDatabase, TYPES, MOVEMENT } from './cubits';

export class Logic {
  getCollection() {
    let collection = getCubitsDatabase();
    return collection;
  }

  getCubits(slots) {
    const collection = this.getCollection();
    let cubits = [];
    for (let i = 0; i < slots.length; i++) {
      const data = slots[i];
      let cubit = collection[data.cubit];
      if(cubit) {
        cubit.key = data.cubit;
        cubits.push(cubit);
      }
    }
    return cubits;
  }

  getCubit(key) {
    const collection = this.getCollection();
    return collection[key];
  }

  getCubitix() {
    const collection = this.getCollection();
    return Object.keys(collection);
  }

  setup(ctx) {
    const collection = this.getCubitix();

    // Populate bags with Cubits
    let bags = [
      ctx.random.Shuffle([...collection]),
      ctx.random.Shuffle([...collection])
    ];

    // Populate hands form bags
    let hands = [[],[]];
    for (let i = 0; i < bags.length; i++) {
      for (let x = 0; x < 3; x++) {
        hands[i].push(bags[i].pop());
      }
    }

    // hands[0].push('1009');
    // hands[1].push('1009');

    return {      
      players: {
        '0': {
          draw: 3,
          actions: 1,
          reinforcements: [],
          bag: bags[0],
          hand: hands[0],
          exile: [],
          afterlife: [],
          arena: null,
          slots: [],
          field: [],
          units: [
            { key: '1', type: 'R', color: '#FF5733', x: 0, y: 0, limit: 4, slots: [], moved: false },
            { key: '2', type: 'N', color: '#F9FF33', x: 0, y: 1, limit: 3, slots: [], moved: false },
            { key: '3', type: 'B', color: '#008000', x: 0, y: 2, limit: 3, slots: [], moved: false },
            { key: '4', type: 'Q', color: '#33FFA8', x: 0, y: 3, limit: 2, slots: [], moved: false },
            { key: '5', type: 'K', color: '#33F6FF', x: 0, y: 4, limit: 1, slots: [], moved: false },
            { key: '6', type: 'B', color: '#3346FF', x: 0, y: 5, limit: 3, slots: [], moved: false },
            { key: '7', type: 'N', color: '#800080', x: 0, y: 6, limit: 3, slots: [], moved: false },
            { key: '8', type: 'R', color: '#FF0000', x: 0, y: 7, limit: 4, slots: [], moved: false },
            { key: '9', type: 'P', color: '#FF5733', x: 1, y: 0, limit: 2, slots: [], moved: false },
            { key: '10', type: 'P', color: '#F9FF33', x: 1, y: 1, limit: 2, slots: [], moved: false },
            { key: '11', type: 'P', color: '#008000', x: 1, y: 2, limit: 2, slots: [], moved: false },
            { key: '12', type: 'P', color: '#33FFA8', x: 1, y: 3, limit: 2, slots: [], moved: false },
            { key: '13', type: 'P', color: '#33F6FF', x: 1, y: 4, limit: 2, slots: [], moved: false },
            { key: '14', type: 'P', color: '#3346FF', x: 1, y: 5, limit: 2, slots: [], moved: false },
            { key: '15', type: 'P', color: '#800080', x: 1, y: 6, limit: 2, slots: [], moved: false },
            { key: '16', type: 'P', color: '#FF0000', x: 1, y: 7, limit: 2, slots: [], moved: false }
          ]
        },
        '1': {
          draw: 3,
          actions: 1,
          reinforcements: [],
          bag: bags[1],
          hand: hands[1],
          exile: [],
          afterlife: [],
          arena: null,
          slots: [],
          field: [],
          units: [
            { key: '17', type: 'R', color: '#FF5733', x: 7, y: 0, limit: 4, slots: [], moved: false },
            { key: '18', type: 'N', color: '#F9FF33', x: 7, y: 1, limit: 3, slots: [], moved: false },
            { key: '19', type: 'B', color: '#008000', x: 7, y: 2, limit: 3, slots: [], moved: false },
            { key: '20', type: 'Q', color: '#33FFA8', x: 7, y: 3, limit: 2, slots: [], moved: false },
            { key: '21', type: 'K', color: '#33F6FF', x: 7, y: 4, limit: 1, slots: [], moved: false },
            { key: '22', type: 'B', color: '#3346FF', x: 7, y: 5, limit: 3, slots: [], moved: false },
            { key: '23', type: 'N', color: '#800080', x: 7, y: 6, limit: 3, slots: [], moved: false },
            { key: '24', type: 'R', color: '#FF0000', x: 7, y: 7, limit: 4, slots: [], moved: false },
            { key: '25', type: 'P', color: '#FF5733', x: 6, y: 0, limit: 2, slots: [], moved: false },
            { key: '26', type: 'P', color: '#F9FF33', x: 6, y: 1, limit: 2, slots: [], moved: false },
            { key: '27', type: 'P', color: '#008000', x: 6, y: 2, limit: 2, slots: [], moved: false },
            { key: '28', type: 'P', color: '#33FFA8', x: 6, y: 3, limit: 2, slots: [], moved: false },
            { key: '29', type: 'P', color: '#33F6FF', x: 6, y: 4, limit: 2, slots: [], moved: false },
            { key: '30', type: 'P', color: '#3346FF', x: 6, y: 5, limit: 2, slots: [], moved: false },
            { key: '31', type: 'P', color: '#800080', x: 6, y: 6, limit: 2, slots: [], moved: false },
            { key: '32', type: 'P', color: '#FF0000', x: 6, y: 7, limit: 2, slots: [], moved: false }
          ]
        }
      }
    };
  }

  getMoveAtPosition(g, playerId, opponentId, x, y, limitPassive = false, limitAggression = false) {

    if(x < 0 || y < 0 || x > 7 || y > 7) {
      return {x: x, y: y, type: MOVEMENT.invalid};
    }

    let obstructionUnit = g.players[playerId].units.find(function(u) { return u.x === x && u.y === y; });
    if(obstructionUnit !== undefined) {
      return {x: x, y: y, type: MOVEMENT.ally};
    }

    let obstructionField = undefined; // TODO: Add field obstructions
    if(obstructionField !== undefined) {
      return {x: x, y: y, type: MOVEMENT.obstructed};
    }

    let capture = g.players[opponentId].units.find(function(u) { return u.x === x && u.y === y; });
    if(capture !== undefined && limitAggression === false) {
      return {x: x, y: y, type: MOVEMENT.capture};
    } 

    if(limitPassive) {
      return {x: x, y: y, type: MOVEMENT.invalid};
    } else {
      return {x: x, y: y, type: MOVEMENT.passive};
    }
    
  }

  moves(g, playerId, source) {
    let opponentId = playerId === '0' ? '1' : '0';
    let forward = playerId === '0' ? +1 : -1; // On the X

    let unit = g.players[playerId].units.find(function(u) { return u.x === source.x && u.y === source.y; });
    if(unit === undefined) {
      return [];
    }

    let modifiers = [];

    if(unit.type === 'P') {
      // Single Movement Forward
      modifiers.push({
        key: '101',
        data: null
      });
      // Attack Diagonal Forward
      modifiers.push({
        key: '102',
        data: null
      });
      // Double Movement Forward
      modifiers.push({
        key: '103',
        data: null
      });      
    } else if(unit.type === 'K') {
      // Move Cardinal 1
      modifiers.push({
        key: '1000',
        data: {
          distance: 1
        }
      });
      modifiers.push({
        key: '1001',
        data: {
          distance: 1
        }
      });
      // Castle Left [Add Conditional]
      modifiers.push({
        key: '104',
        data: null
      });
      // Castle Right [Add Conditional]
      modifiers.push({
        key: '105',
        data: null
      });
    } else if(unit.type === 'Q') {
      /// Move Orthogonal
      modifiers.push({
        key: '1000',
        data: {
          distance: 8
        }
      });
      // Move Diagonal
      modifiers.push({
        key: '1001',
        data: {
          distance: 8
        }
      });
    } else if(unit.type === 'R') {
      // Move Orthogonal
      modifiers.push({
        key: '1000',
        data: {
          distance: 8
        }
      });      
    } else if(unit.type === 'B') {
      // Move Diagonal
      modifiers.push({
        key: '1001',
        data: {
          distance: 8
        }
      });      
    } else if(unit.type === 'N') {
      // Move Pattern
      modifiers.push({
        key: '1003',
        data: {
          steps: [2,1]
        }
      });
    } 

    let cubits = this.getCubits(unit.slots);
    for (let i = 0; i < cubits.length; i++) {
      const cubit = cubits[i];
      if(cubit.types.includes(TYPES.movement)) {
        modifiers.push({
          key: cubit.key,
          data: cubit.data
        });
      }
    }

    let moves = [];
    for (let i = 0; i < modifiers.length; i++) {
      let modifier = modifiers[i];

      if(modifier.key === '101') { // Pawn
        let x = source.x + forward;

        let move = this.getMoveAtPosition(g, playerId, opponentId, x, source.y, false, true);
        if(move.type !== MOVEMENT.invalid) {
          moves.push(move);
        }
      } else if (modifier.key === '102') { // Pawn - Attack
        let x = source.x + forward;
        let y1 = source.y - 1;
        let y2 = source.y + 1;

        let attacks = [
          this.getMoveAtPosition(g, playerId, opponentId, x, y1, true, false),
          this.getMoveAtPosition(g, playerId, opponentId, x, y2, true, false)
        ];

        for (let a = 0; a < attacks.length; a++) {
          const move = attacks[a];
          if(move.type !== MOVEMENT.invalid) {
            moves.push(move);
          }
        }
      } else if (modifier.key === '103') { // Pawn - Double Move
        if(unit.moved === true) {
          continue;
        }

        let x = source.x + (forward * 2);

        let move = this.getMoveAtPosition(g, playerId, opponentId, x, source.y, false, true);
        if(move.type !== MOVEMENT.invalid) {
          moves.push(move);
        }
      } else if(modifier === '104') { // King
        if(unit.moved === true) {
          continue;
        }

      } else if(modifier.key === '105') { // King
        if(unit.moved === true) {
          continue;
        }

      } else if(modifier.key === '1000') { // Orthogonal
        let steps,x,y;

        for (x = source.x - 1, steps = 0; x > 0 && steps < modifier.data.distance; x--, steps++) {
          let move = this.getMoveAtPosition(g, playerId, opponentId, x, source.y);
          if(move.type === MOVEMENT.passive) {
            moves.push(move);
          } else if(move.type === MOVEMENT.capture) {
            moves.push(move);
            break;
          } else {
            break;
          }
        }
        for (x = source.x + 1, steps = 0; x < 8 && steps < modifier.data.distance; x++, steps++) {
          let move = this.getMoveAtPosition(g, playerId, opponentId, x, source.y);
          if(move.type === MOVEMENT.passive) {
            moves.push(move);
          } else if(move.type === MOVEMENT.capture) {
            moves.push(move);
            break;
          } else {
            break;
          }
        }
        for (y = source.y - 1, steps = 0; y > 0 && steps < modifier.data.distance; y--, steps++) {
          let move = this.getMoveAtPosition(g, playerId, opponentId, source.x, y);
          if(move.type === MOVEMENT.passive) {
            moves.push(move);
          } else if(move.type === MOVEMENT.capture) {
            moves.push(move);
            break;
          } else {
            break;
          }
        }
        for (y = source.y + 1, steps = 0; y < 8 && steps < modifier.data.distance; y++, steps++) {
          let move = this.getMoveAtPosition(g, playerId, opponentId, source.x, y);
          if(move.type === MOVEMENT.passive) {
            moves.push(move);
          } else if(move.type === MOVEMENT.capture) {
            moves.push(move);
            break;
          } else {
            break;
          }
        }
      } else if(modifier.key === '1001') { // Diagonal
        let steps,x,y;

        for (x = source.x + 1, y = source.y + 1, steps = 0; x < 8 && y < 8 && steps < modifier.data.distance; x++, y++, steps++) {
          let move = this.getMoveAtPosition(g, playerId, opponentId, x, y);
          if(move.type === MOVEMENT.passive) {
            moves.push(move);
          } else if(move.type === MOVEMENT.capture) {
            moves.push(move);
            break;
          } else {
            break;
          }
        }

        for (x = source.x - 1, y = source.y - 1, steps = 0; x > 0 && y >= 0 && steps < modifier.data.distance; x--, y--, steps++) {
          let move = this.getMoveAtPosition(g, playerId, opponentId, x, y);
          if(move.type === MOVEMENT.passive) {
            moves.push(move);
          } else if(move.type === MOVEMENT.capture) {
            moves.push(move);
            break;
          } else {
            break;
          }
        }

        for (x = source.x - 1, y = source.y +1, steps = 0; x >= 0 && y < 8 && steps < modifier.data.distance; x--, y++, steps++) {
          let move = this.getMoveAtPosition(g, playerId, opponentId, x, y);
          if(move.type === MOVEMENT.passive) {
            moves.push(move);
          } else if(move.type === MOVEMENT.capture) {
            moves.push(move);
            break;
          } else {
            break;
          }
        }

        for (x = source.x + 1, y = source.y - 1, steps = 0; x < 8 && y >= 0 && steps < modifier.data.distance; x++, y--, steps++) {
          let move = this.getMoveAtPosition(g, playerId, opponentId, x, y);
          if(move.type === MOVEMENT.passive) {
            moves.push(move);
          } else if(move.type === MOVEMENT.capture) {
            moves.push(move);
            break;
          } else {
            break;
          }
        }

      } else if(modifier.key === '1003') { // Pattern
        let targets = [];
        targets.push({ x: source.x + modifier.data.steps[0], y: source.y + modifier.data.steps[1] });
        targets.push({ x: source.x + modifier.data.steps[0], y: source.y - modifier.data.steps[1] });
        targets.push({ x: source.x - modifier.data.steps[0], y: source.y + modifier.data.steps[1] });
        targets.push({ x: source.x - modifier.data.steps[0], y: source.y - modifier.data.steps[1] });
        targets.push({ x: source.x + modifier.data.steps[1], y: source.y + modifier.data.steps[0] });
        targets.push({ x: source.x - modifier.data.steps[1], y: source.y + modifier.data.steps[0] });
        targets.push({ x: source.x + modifier.data.steps[1], y: source.y - modifier.data.steps[0] });
        targets.push({ x: source.x - modifier.data.steps[1], y: source.y - modifier.data.steps[0] });

        for (let i = 0; i < targets.length; i++) {
          const target = targets[i];
          let move = this.getMoveAtPosition(g, playerId, opponentId, target.x, target.y);
          if(move.type === MOVEMENT.passive || move.type === MOVEMENT.capture) {
            moves.push(move);
          }
        }
        
      } else if(modifier.key === '1004') { // Sidestep
        let targets = [];
        targets.push({ x: source.x, y: source.y + 1 });
        targets.push({ x: source.x, y: source.y - 1 });

        for (let i = 0; i < targets.length; i++) {
          const target = targets[i];
          let move = this.getMoveAtPosition(g, playerId, opponentId, target.x, target.y);
          if(move.type === MOVEMENT.passive || move.type === MOVEMENT.capture) {
            moves.push(move);
          }
        }

      }
    }

    return moves;
  }

  getMoveForLocation(g, player, source, destination) {
    let moves = this.moves(g, player, source);

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      if(move.x === destination.x && move.y === destination.y) {
        return move;
      }
    }

    return {x: destination.x, y: destination.y, type: MOVEMENT.invalid};
  }

  playerHasCubit(g, playerId, cubitId) {
    for (let a = 0; a < g.players[playerId].units.length; a++) {
      const unit = g.players[playerId].units[a];     
      for (let b = 0; b < unit.slots.length; b++) {
        const data =  unit.slots[b];
        if(data.cubit === cubitId) {
          return true;
        }
      }
    }

    for (let a = 0; a < g.players[playerId].slots.length; a++) {
      const data = g.players[playerId].slots[a];
      if(data.cubit === cubitId) {
        return true;
      }
    }

    return false;
  }

}