import { 
  UNIT_TYPES,
  UNIT_FILE,
  CUBIT_TYPES,
  LOCATIONS,
  // DURATION_TYPES,
  MOVEMENT_ACTIONS,
  MOVEMENT_TYPES,
  MOVEMENT_CONSTRAINTS
} from './common';

function getUnit(g, x, y) {
  let units = g.units
    .filter(_ => _.location === LOCATIONS.Board)
    .filter(_ => _.position !== null && _.position.x === x && _.position.y === y);

  return units[0];
}

function getCubits(g, x, y) {
  let cubits = g.cubits
    .filter(_ => _.location === LOCATIONS.Board)
    .filter(_ => _.obstruction === true)
    .filter(_ => _.position !== null && _.position.x === x && _.position.y === y);

  return cubits;
}

function unitHasCubit(g, ctx, unit, type) {
  for (const id of unit.cubits) {
    const cubit = g.cubits.find(_ => _.id === id);
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

function checkPosition(g, player, moves, movement, x, y) {
  if(outsideBounds(x, y)) {
    return false;
  }

  let isPassive = movement.constraint === MOVEMENT_CONSTRAINTS.Passive;
  let isAggressive = movement.constraint === MOVEMENT_CONSTRAINTS.Aggressive;

  let obstructions = getCubits(g, x, y);
  if(obstructions.length > 0) {
    return true;  // Break Loop;
  }

  let unit = getUnit(g, x, y);
  if(unit) {
    if(isAggressive && unit.ownership !== player) {
      moves.push({
        action: MOVEMENT_ACTIONS.Capture,
        x: x, 
        y: y,
        unit: unit.id
      });
      return true;  // Break Loop;
    } else {
      return true;  // Break Loop;
    }
  } else {
    if(isPassive) {
      moves.push({
        action: MOVEMENT_ACTIONS.Passive,
        x: x,
        y: y
      });
    }

    return false;
  }
}

export function getMovements(g, ctx, unit) {
  let moves = [];

  let player = unit.ownership;
  let origin = {x: unit.position.x, y: unit.position.y };
  let forward = player === '0' ? +1 : -1;
  let bounds = { x: 0, y: 0, width: 8, height: 8 };

  let movementDefault = {
    type: MOVEMENT_TYPES.Unknown,
    constraint: MOVEMENT_CONSTRAINTS.Unknown,
    distance: 0,
    steps: [],
    jump: false,
  };

  let movements = [].concat(unit.movement);

  let hasBasics = g.cubits
    .filter(_ => _.type === CUBIT_TYPES.BacktoBasics)
    .filter(_ => _.location === LOCATIONS.Arena);
    
  if(hasBasics.length === 0) {
    for (const id of unit.cubits) {
      const cubit = g.cubits.find(_ => _.id === id);
      movements = movements.concat(cubit.movement);
    }
  }

  for (let i = 0; i < movements.length; i++) {
    let movement = { ...movementDefault, ...movements[i] };

    let distance =  movement.distance;
    if(unitHasCubit(g, ctx, unit, CUBIT_TYPES.StickyFeet)) {
      distance = 1;
    } else if (unitHasCubit(g, ctx, unit, CUBIT_TYPES.Encumber)) {
      distance = distance - unit.cubits.length;
    }

    if(distance <= 0) {
      // console.log("Movement Trap", movement);
      continue;
    }

    let end = distance - 1;

    if(movement.type === MOVEMENT_TYPES.Orthogonal) {
      let steps,x,y;

      for (x = origin.x - 1, y = origin.y, steps = 0; x >= bounds.x && steps < distance; x--, steps++) {
        if(movement.jump) {
          if(steps === end) {
            checkPosition(g, player, moves, movement, x, y);
          }
        } else {
          if(checkPosition(g, player, moves, movement, x, y)) {
            break;
          }
        }
      }

      for (x = origin.x + 1, y = origin.y, steps = 0; x < bounds.width && steps < distance; x++, steps++) {
        if(movement.jump) {
          if(steps === end) {
            checkPosition(g, player, moves, movement, x, y);
          }
        } else {
          if(checkPosition(g, player, moves, movement, x, y)) {
            break;
          }
        }
      }
      
      for (x = origin.x, y = origin.y - 1, steps = 0; y >= bounds.y && steps < distance; y--, steps++) {
        if(movement.jump) {
          if(steps === end) {
            checkPosition(g, player, moves, movement, x, y);
          }
        } else {
          if(checkPosition(g, player, moves, movement, x, y)) {
            break;
          }
        }
      }

      for (x = origin.x, y = origin.y + 1, steps = 0; y < bounds.height && steps < distance; y++, steps++) {
        if(movement.jump) {
          if(steps === end) {
            checkPosition(g, player, moves, movement, x, y);
          }
        } else {
          if(checkPosition(g, player, moves, movement, x, y)) {
            break;
          }
        }
      }
    } else if(movement.type === MOVEMENT_TYPES.Diagonal) {
      let steps,x,y;

      for (x = origin.x + 1, y = origin.y + 1, steps = 0; x < bounds.width && y < bounds.height && steps < distance; x++, y++, steps++) {
        if(movement.jump) {
          if(steps === end) {
            checkPosition(g, player, moves, movement, x, y);
          }
        } else {
          if(checkPosition(g, player, moves, movement, x, y)) {
            break;
          }
        }
      }

      for (x = origin.x - 1, y = origin.y - 1, steps = 0; x >= bounds.x && y >= bounds.y && steps < distance; x--, y--, steps++) {
        if(movement.jump) {
          if(steps === end) {
            checkPosition(g, player, moves, movement, x, y);
          }
        } else {
          if(checkPosition(g, player, moves, movement, x, y)) {
            break;
          }
        }
      }

      for (x = origin.x - 1, y = origin.y +1, steps = 0; x >= 0 && y < bounds.height && steps < distance; x--, y++, steps++) {
        if(movement.jump) {
          if(steps === end) {
            checkPosition(g, player, moves, movement, x, y);
          }
        } else {
          if(checkPosition(g, player, moves, movement, x, y)) {
            break;
          }
        }
      }

      for (x = origin.x + 1, y = origin.y - 1, steps = 0; x < bounds.width && y >= 0 && steps < distance; x++, y--, steps++) {
        if(movement.jump) {
          if(steps === end) {
            checkPosition(g, player, moves, movement, x, y);
          }
        } else {
          if(checkPosition(g, player, moves, movement, x, y)) {
            break;
          }
        }
      }
    } else if(movement.type === MOVEMENT_TYPES.Jump) {
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
        checkPosition(g, player, moves, movement, target.x, target.y);
      }
    } else if(movement.type === MOVEMENT_TYPES.Fork) {
      let targeting = [];
      targeting.push({ x: origin.x + forward, y: origin.y - 1 });
      targeting.push({ x: origin.x + forward, y: origin.y + 1 });

      for (let index = 0; index < targeting.length; index++) {
        const target = targeting[index];
        checkPosition(g, player, moves, movement, target.x, target.y);
      }
    } else if(movement.type === MOVEMENT_TYPES.Forward) {
      let steps,x,y;

      for (x = origin.x + forward, y = origin.y, steps = 0; x < bounds.width && steps < distance; x += forward, steps++) {                 
        if(movement.jump) {
          if(steps === end) {
            checkPosition(g, player, moves, movement, x, y);
          }
        } else {
          if(checkPosition(g, player, moves, movement, x, y)) {
            break;
          }
        }
      }
    } else if(movement.type === MOVEMENT_TYPES.Backwards) {
      let steps,x,y;
      for (x = origin.x - forward, y = origin.y, steps = 0; x < bounds.width && steps < distance; x -= forward, steps++) {
        if(movement.jump) {
          if(steps === end) {
            checkPosition(g, player, moves, movement, x, y);
          }
        } else {
          if(checkPosition(g, player, moves, movement, x, y)) {
            break;
          }
        }
      }
    } else if(movement.type === MOVEMENT_TYPES.Sidestep) {
      checkPosition(g, player, moves, movement, origin.x, origin.y - 1);
      checkPosition(g, player, moves, movement, origin.x, origin.y + 1);
    } else if(movement.type === MOVEMENT_TYPES.Swap) {
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
          moves.push({
            action: MOVEMENT_ACTIONS.Swap,
            x: target.x,
            y: target.y,
            unit: u.id
          });
        }
      }
    } else if(movement.type === MOVEMENT_TYPES.Castle) {
      // is King in check
      if(g.players[player].check === true) {
        continue;
      }

      // Has Rooks moved...
      let rooks = g.units
        .filter(_ => _.location === LOCATIONS.Board)
        .filter(_ => _.type === UNIT_TYPES.Rook)
        .filter(_ => _.ownership === player)
        .filter(_ => _.moves === 0);

      if(rooks.length === 0) {
        continue;
      }
      
      let ranks = {};
      ranks['0'] = 0;
      ranks['1'] = 7;

      for (const rook of rooks) {
        if(rook.file === UNIT_FILE.A) {
          let units = g.units
            .filter(_ => _.location === LOCATIONS.Board)
            .filter(_ => _.position.x === ranks[player])
            .filter(_ => _.position.y === 1 || _.position.y === 2 || _.position.y === 3);
          if(units.length === 0) {
            moves.push({
              action: MOVEMENT_ACTIONS.Castle,
              x: rook.position.x,
              y: rook.position.y,
              unit: rook.id
            });
          }
        } else if(rook.file === UNIT_FILE.H) {
          let units = g.units
            .filter(_ => _.location === LOCATIONS.Board)
            .filter(_ => _.position.x === ranks[player])
            .filter(_ => _.position.y === 5 || _.position.y === 6);
          if(units.length === 0) {
            moves.push({
              action: MOVEMENT_ACTIONS.Castle,
              x: rook.position.x,
              y: rook.position.y,
              unit: rook.id
            });
          }
        }
      }
    }
  }

  for (const id of unit.cubits) {
    const cubit = g.cubits.find(_ => _.id === id);
    if(cubit.type === CUBIT_TYPES.Enrage) {
        moves = moves.filter(_ => _.action === MOVEMENT_ACTIONS.Capture);
    } else if(cubit.type === CUBIT_TYPES.Passify) {
        moves = moves.filter(_ => _.action === MOVEMENT_ACTIONS.Passive);
    }
  }

  let hasThunderDome = g.cubits
    .filter(_ => _.location === LOCATIONS.Arena)
    .filter(_ => _.type === CUBIT_TYPES.ThunderDome);
  if(hasThunderDome.length > 0) {
    let hasCapture = moves.filter(_ => _.action === MOVEMENT_ACTIONS.Capture);
    if(hasCapture.length > 0) {
      moves = moves.filter(_ => _.action === MOVEMENT_ACTIONS.Capture);
    }
  }

  return moves;
}