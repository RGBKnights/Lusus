import { TARGETS, CUBITS, DIRECTIONS, unitHasCubits, UNITS } from './common';
import { Database } from './database';

function isValid(unit, obstacles, moves, targets, destination) {
  if(destination.x < 0 || destination.x > 7 || destination.y < 0 || destination.y > 7) {
    return false;
  }

  let obj = obstacles.find(_ => _.position.x === destination.x && _.position.y === destination.y);
  if (obj) {
    if(obj.ownership === unit.ownership && targets.includes(TARGETS.Friendly)) {
      moves.push({ target: TARGETS.Friendly, x: destination.x, y: destination.y });
      return false;
    }
    if(obj.ownership !== unit.ownership && targets.includes(TARGETS.Enemy)) {
      moves.push({ target: TARGETS.Enemy, x: destination.x, y: destination.y });
      return false;
    }
  } else {
    if (targets.includes(TARGETS.Empty)) {
      moves.push({ target: TARGETS.Empty, x: destination.x, y: destination.y });
      return true;
    }
  }

  return false;
}

export function getAdjacentSpaces(G, ctx, position, unoccupied = true) {
  let obstacles = G.field.filter(_ => _.position != null);
  let bounds = { x: (position.x-1), y: (position.y-1), w: (position.x+1), h: (position.y+1) };

  let spaces = [];
  for (let x = bounds.x; x <= bounds.w; x++) {
    for (let y = bounds.y; y <= bounds.h; y++) {
      if(x < 0 || x > 7 || y < 0 || y > 7) {
        continue;
      }
      if(x === position.x && y === position.y) {
        continue; // Not Adjacent
      }

      let hasObstacles = obstacles.filter(_ => _.position.x === x && _.position.y === y).length > 0;
      if(unoccupied === true && hasObstacles === false) {
        spaces.push({x,y});
      } else if(unoccupied === false && hasObstacles === true) {
        spaces.push({x,y});
      }
    }
  }

  return ctx.random.Shuffle(spaces);
}

export function getMoves(G, ctx, id, source) {
  // TODO: G.board => test for SPACE_TYPES
  let moves = [];
  if(source == null) {
    return moves;
  }

  let obstacles = G.field.filter(_ => _.position != null);

  let unit = G.field.find(_ => _.id === id);
  if(!unit) {
    return moves;
  }
  /*
  if(unit.ownership !== ctx.currentPlayer) {
    return moves;
  }
  */
  
  let directions = {};
  directions[DIRECTIONS.Forward] = { x:0, y: unit.ownership === '0' ? -1 : 1 };
  directions[DIRECTIONS.Back] = { x:0, y: unit.ownership === '0' ? 1 : -1 };
  directions[DIRECTIONS.Left] = { x: unit.ownership === '0' ? -1 : 1, y:0 };
  directions[DIRECTIONS.Right] = { x: unit.ownership === '0' ? 1 : -1, y:0 };

  let isTelaporter = unitHasCubits(unit, CUBITS.Swapaport);
  let noLeftTurn = unitHasCubits(unit, CUBITS.NoLeftTurn);
  let noRightTurn = unitHasCubits(unit, CUBITS.NoRightTurn);
  let encumbered = unitHasCubits(unit, CUBITS.Encumber);
  let stuck = unitHasCubits(unit, CUBITS.StickyFeet);
  let handicapped = stuck || encumbered;

  let slow = 0;
  if(encumbered) {
    slow = unit.cubits.filter(_ => _ != null).length;
  }

  let movements = [];
  for (const cubit of unit.cubits) {
    if(cubit) {
      let cubitData = Database.cubits[cubit.type];
      if(cubitData.movements) {
        movements = movements.concat(cubitData.movements);
      }
    }
  }

  let unitData = Database.units[unit.type];
  let filteredMovements = unit.moves > 0 ? unitData.movements.filter(_ => _.consumable !== true) : unitData.movements;
  movements = movements.concat(filteredMovements);

  if(noLeftTurn) {
    movements = movements.filter(_ => _.directions.includes(DIRECTIONS.Left) === false);
  }
  if(noRightTurn) {
    movements = movements.filter(_ => _.directions.includes(DIRECTIONS.Right) === false);
  }

  if(handicapped) {
    movements = movements.filter(_ => _.contiguous === true);
  }

  for (const movement of movements) {
    let destination = {
      x: source.x,
      y: source.y,
    };

    let pattern = { x:0, y:0 };
    for (const d of movement.directions) {
      let offset = directions[d];
      pattern.x += offset.x;
      pattern.y += offset.y;
    }

    let distance = stuck ? 1 : movement.distance - slow;
    for (let i = 0; i < distance; i++) {
      destination.x += pattern.x;
      destination.y += pattern.y;

      let valid = isValid(unit, obstacles, moves, movement.targets, destination);
      if(movement.contiguous === true && valid === false) {
        break;
      }
    }
  }
  
  if(unitHasCubits(unit, CUBITS.Enrage)) {
    moves = moves.filter(_ => _.target === TARGETS.Enemy);
  }
  if(unitHasCubits(unit, CUBITS.Passify)) {
    moves = moves.filter(_ => _.target === TARGETS.Empty);
  }

  if(isTelaporter) {
    moves = [];
    let units = G.field.filter(_ => _.position != null && _.ownership === unit.ownership && _.id !== unit.id);
    for (const unit of units) {
      moves.push({ target: TARGETS.Friendly, x: unit.position.x, y: unit.position.y });
    }
  }

  return moves;
}

export function isPlayerInCheck(G, ctx, player, position = null) {
  // get player's kings position
  // if position equals null then use the kings current position
  if(position == null) {
    let unit = G.field.find(_ => _.ownership === player && _.type === UNITS.King);
    position = unit.position;
  }

  // safe guard against a dead king
  if(position == null) {
    return false;
  }
   
  // get all opponent's units
  let opponent = player === '0' ? '1' : '0';
  let units = G.field.filter(_ => _.ownership === opponent && _.position != null);

  for (const unit of units) {
    let source = {x: unit.position.x, y: unit.position.y};
    let moves = getMoves(G, ctx, unit.id, source);
    let captures = moves.filter(_ =>  _.target === TARGETS.Enemy);
    for (const move of captures) {
      if(move.x === position.x && move.y === position.y) {
        return true;
      }
    }
  }

  

  return false;
}