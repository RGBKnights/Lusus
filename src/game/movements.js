import { 
  UNIT_TYPES,
  CUBIT_TYPES,
  LOCATIONS,
  MOVEMENT_ACTIONS,
  MOVEMENT_TYPES,
  MOVEMENT_CONSTRAINTS,
  Move
} from './common';

function getUnit(g, x, y) {
  let units = g.units
    .filter(_ => _.location === LOCATIONS.Board)
    .filter(_ => _.position != null)
    .filter(_ => _.position.x === x && _.position.y === y);

  return units[0];
}

function getCubits(g, x, y) {
  let cubits = g.cubits
    .filter(_ => _.location === LOCATIONS.Board)
    .filter(_ => _.obstruction === true)
    .filter(_ => _.position !== null)
    .filter(_ => _.position.x === x && _.position.y === y);

  return cubits;
}

function unitHasCubit(unit, type) {
  for (let i = 0; i < unit.cubits.length; i++) {
    const cubit = unit.cubits[i];
    if(cubit.type === type) {
      return true;
    }
  }
  return false;
}

function outsideBounds(x, y) {
  if(x < 0)
    return true;
  else if(x < 0) 
    return true;
  else if (x > 8)
    return true;
  else if (y > 8)
    return true;
  else
    return false;
}

function checkPosition(g, player, moves, movement, x, y, isAgressive, isPassive) {
  if(outsideBounds(x, y)) {
    return false;
  }

  let obstructions = getCubits(g, x, y);
  if(obstructions.length > 0 && movement.phased) {
    return false;
  } else if(obstructions.length > 0) {
    return true;  // Break Loop;
  }

  let unit = getUnit(g, x, y);
  if(unit) {
    if(unit.obstruction && movement.phased) {
      return false;
    } else if(isAgressive && unit.ownership !== player) {
      moves.push(new Move(MOVEMENT_ACTIONS.Capture, x, y, unit.id));
      return true;  // Break Loop;
    } else {
      return true;  // Break Loop;
    }
  } else {
    if(isPassive) {
      moves.push(new Move(MOVEMENT_ACTIONS.Passive, x, y));
    }

    return false;
  }
}

export function getMovements(g, ctx, player, origin, unit) {
  let moves = [];

  if(unit.ownership !== player) {
    return moves;
  }

  let forward = player === '0' ? +1 : -1;
  let bounds = { x: 0, y: 0, width: 8, height: 8 };

  let movements = [].concat(unit.movement);
  for (let i = 0; i < unit.cubits.length; i++) {
      const cubit = unit.cubits[i];
      movements = movements.concat(cubit.movement);
  }

  for (let i = 0; i < movements.length; i++) {
    const movement = movements[i];

    let isPassive = movement.constraint === MOVEMENT_CONSTRAINTS.Passive;
    let isAgressive = movement.constraint === MOVEMENT_CONSTRAINTS.Agressive;

    let distance =  movement.distance;
    if(unitHasCubit(unit, CUBIT_TYPES.StickyFeet)) {
      distance = 1;
    } else if (unitHasCubit(unit, CUBIT_TYPES.Encumber)) {
      distance = distance - unit.cubits.length;
    }

    if(movement.type === MOVEMENT_TYPES.Orthogonal) {
      let steps,x,y;

      for (x = origin.x - 1, steps = 0; x >= bounds.x && steps < distance; x--, steps++) {
        if(checkPosition(g, player, moves, movement, x, origin.y, isAgressive, isPassive)) { break; }
      }

      for (x = origin.x + 1, steps = 0; x < bounds.width && steps < distance; x++, steps++) {
        if(checkPosition(g, player, moves, movement, x, origin.y, isAgressive, isPassive)) { break; }
      }
      
      for (y = origin.y - 1, steps = 0; y >= bounds.y && steps < distance; y--, steps++) {
        if(checkPosition(g, player, moves, movement, origin.x, y, isAgressive, isPassive)) { break; }
      }

      for (y = origin.y + 1, steps = 0; y < bounds.height && steps < distance; y++, steps++) {
        if(checkPosition(g, player, moves, movement, origin.x, y, isAgressive, isPassive)) { break; }
      }
    } else if(movement.type === MOVEMENT_TYPES.Diagonal) {
      let steps,x,y;

      for (x = origin.x + 1, y = origin.y + 1, steps = 0; x < bounds.width && y < bounds.height && steps < distance; x++, y++, steps++) {
        if(checkPosition(g, player, moves, movement, x, y, isAgressive, isPassive)) { break; }
      }

      for (x = origin.x - 1, y = origin.y - 1, steps = 0; x >= bounds.x && y >= bounds.y && steps < distance; x--, y--, steps++) {
        if(checkPosition(g, player, moves, movement, x, y, isAgressive, isPassive)) { break; }
      }

      for (x = origin.x - 1, y = origin.y +1, steps = 0; x >= 0 && y < bounds.height && steps < distance; x--, y++, steps++) {
        if(checkPosition(g, player, moves, movement, x, y, isAgressive, isPassive)) { break; }
      }

      for (x = origin.x + 1, y = origin.y - 1, steps = 0; x < bounds.width && y >= 0 && steps < distance; x++, y--, steps++) {
        if(checkPosition(g, player, moves, movement, x, y, isAgressive, isPassive)) { break; }
      }
    } else if(movement.type === MOVEMENT_TYPES.Jump) {
      // Change to distance
      if(unitHasCubit(unit, CUBIT_TYPES.StickyFeet) || unitHasCubit(unit, CUBIT_TYPES.Encumber)) {
        continue; // Goto: Next Movement
      }

      let targeting = [];
      targeting.push({ x: origin.x + movement.steps[0], y: origin.y + movement.steps[1] });
      targeting.push({ x: origin.x + movement.steps[0], y: origin.y - movement.steps[1] });
      targeting.push({ x: origin.x - movement.steps[0], y: origin.y + movement.steps[1] });
      targeting.push({ x: origin.x - movement.steps[0], y: origin.y - movement.steps[1] });
      targeting.push({ x: origin.x + movement.steps[1], y: origin.y + movement.steps[0] });
      targeting.push({ x: origin.x - movement.steps[1], y: origin.y + movement.steps[0] });
      targeting.push({ x: origin.x + movement.steps[1], y: origin.y - movement.steps[0] });
      targeting.push({ x: origin.x - movement.steps[1], y: origin.y - movement.steps[0] });

      for (let index = 0; index < targeting.length; index++) {
        const target = targeting[index];
        checkPosition(g, player, moves, movement, target.x, target.y, isAgressive, isPassive);
      }
    } else if(movement.type === MOVEMENT_TYPES.Fork) {
      let targeting = [];
      targeting.push({ x: origin.x + forward, y: origin.y - 1 });
      targeting.push({ x: origin.x + forward, y: origin.y + 1 });

      for (let index = 0; index < targeting.length; index++) {
        const target = targeting[index];
        let u = getUnit(g, ctx, null, target.x, target.y);
        if(u && u.ownership !== player && isAgressive) {
          moves.push(new Move(MOVEMENT_ACTIONS.Capture, target.x, target.y, u.id));
        }
      }
    } else if(movement.type === MOVEMENT_TYPES.Forward) {
      let steps,x;
      for (x = origin.x + forward, steps = 0; x < bounds.width && steps < distance; x += forward, steps++) {                 
        if(checkPosition(g, player, moves, movement, x, origin.y, isAgressive, isPassive)) { break; }
      }
    } else if(movement.type === MOVEMENT_TYPES.Backwards) {
      let steps,x;
      for (x = origin.x - forward, steps = 0; x < bounds.width && steps < distance; x -= forward, steps++) {
        if(checkPosition(g, player, moves, movement, x, origin.y, isAgressive, isPassive)) { break; }
      }
    } else if(movement.type === MOVEMENT_TYPES.Sidestep) {
      if(distance < 1) {
        continue; // Goto: Next Movement
      }

      checkPosition(g, player, moves, movement, origin.x, origin.y - 1, isAgressive, isPassive);
      checkPosition(g, player, moves, movement, origin.x, origin.y + 1, isAgressive, isPassive);
    } else if(movement.type === MOVEMENT_TYPES.Swap) {
      if(distance < 1) {
        continue; // Goto: Next Movement
      }

      let targeting = [];
      targeting.push({ x: origin.x + 1, y: origin.y });
      targeting.push({ x: origin.x - 1, y: origin.y });
      targeting.push({ x: origin.x, y: origin.y + 1 });
      targeting.push({ x: origin.x, y: origin.y - 1 });
      targeting.push({ x: origin.x + 1, y: origin.y + 1 });
      targeting.push({ x: origin.x - 1, y: origin.y + 1 });
      targeting.push({ x: origin.x + 1, y: origin.y - 1 });
      targeting.push({ x: origin.x - 1, y: origin.y - 1 });

      for (let index = 0; index < targeting.length; index++) {
        const target = targeting[index];

        let u = getUnit(g, target.x, target.y);
        if(u) {
          moves.push(new Move(MOVEMENT_ACTIONS.Swap, target.x, target.y, u.id));
        }
      }
    } else if(movement.type === MOVEMENT_TYPES.Castle) {
      if(unit.moves > 0) {
        continue;
      }

      let rooks = g.units
        .filter(_ => _.location === LOCATIONS.Board)
        .filter(_ => _.type === UNIT_TYPES.Rook)
        .filter(_ => _.ownership === unit.ownership)
        .filter(_ => _.moves === 0);

      for (let index = 0; index < rooks.length; index++) {
        const rook = rooks[index];
        let y = rook.y;
        let x = rook.x;
        let walker = rook.y === 0 ? -1 : 1;

        while(y !== unit.y) {
          y = y + walker;
          let u = getUnit(g, x, y);
          if(u) {
            continue;
          }
        }

        // TODO: finish it by split out 2 moves left and right castle
        // moves.push(new Move(MOVEMENT_ACTIONS.Castle, x, y));
      }
    }
  }

  for (let i = 0; i < unit.cubits.length; i++) {
    const cubit = unit.cubits[i];
    if(cubit.type === CUBIT_TYPES.Enrage) {
        moves = moves.filter(_ => _.action === MOVEMENT_ACTIONS.Agressive);
    } else if(cubit.type === CUBIT_TYPES.Passify) {
        moves = moves.filter(_ => _.action === MOVEMENT_ACTIONS.Passive);
    }
  }

  return moves;
}