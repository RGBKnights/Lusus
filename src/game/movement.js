import { TARGETS, CUBITS, DIRECTIONS, hasCubits } from './common';
import { Database } from './database';

function isValid(player, obstacles, moves, targets, destination) {
  if(destination.x < 0 || destination.x > 7 || destination.y < 0 || destination.y > 7) {
    return false;
  }

  let obj = obstacles.find(_ => _.position.x === destination.x && _.position.y === destination.y);
  if (obj) {
    if(obj.ownership === player && targets.includes(TARGETS.Friendly)) {
      moves.push({ target: TARGETS.Friendly, x: destination.x, y: destination.y });
      return false;
    }
    if(obj.ownership !== player && targets.includes(TARGETS.Enemy)) {
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

export function getMoves(G, ctx, id, source) {
  // TODO: G.board => test for SPACE_TYPES

  let moves = [];

  let obstacles = G.field.filter(_ => _.position != null);

  let unit = G.field.find(_ => _.id === id);
  if(!unit) {
    return moves;
  }
  if(unit.ownership !== ctx.currentPlayer) {
    return moves;
  }
  
  let directions = {};
  directions[DIRECTIONS.Forward] = { x:0, y: unit.ownership === '0' ? -1 : 1 };
  directions[DIRECTIONS.Back] = { x:0, y: unit.ownership === '0' ? 1 : -1 };
  directions[DIRECTIONS.Left] = { x:-1, y:0 };
  directions[DIRECTIONS.Right] = { x:1, y:0 };

  let encumbered = hasCubits(unit, CUBITS.Encumber);
  let stuck = hasCubits(unit, CUBITS.StickyFeet);
  let handicapped = stuck || encumbered;

  let slow = 0;
  if(encumbered) {
    slow = unit.cubits.filter(_ => _ != null).length;
  }

  let movements = [];
  for (const cubit of unit.cubits) {
    if(cubit) {
      let cubitData = Database.cubits[cubit.type];
      movements = movements.concat(cubitData.movements);
    }
  }
  let unitData = Database.units[unit.type];
  movements = movements.concat(unitData.movements);

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
    let length = distance - 1;
    for (let i = 0; i < distance; i++) {
      destination.x += pattern.x;
      destination.y += pattern.y;

      if(movement.contiguous) {
        if(isValid(ctx.currentPlayer, obstacles, moves, movement.targets, destination) === false) {
          break;
        }
      } else {
        if(handicapped === true) {
          break;
        } else if(i === length) {
          isValid(ctx.currentPlayer, obstacles, moves, movement.targets, destination);
        } else {
          continue;
        }
      }
    }
  }
  
  if(hasCubits(unit, CUBITS.Enrage)) {
    moves = moves.filter(_ => _.target === TARGETS.Empty);
  }
  if(hasCubits(unit, CUBITS.Passify)) {
    moves = moves.filter(_ => _.target === TARGETS.Enemy);
  }

  return moves;
}