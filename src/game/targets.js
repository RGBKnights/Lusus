import {
  CUBIT_TYPES,
  UNIT_TYPES,
  LOCATIONS,
  TARGET_CONSTRAINTS,
  ArenaTarget,
  UnitTarget,
  HandTarget,
  PlayerTarget,
  BoardTarget,
} from './common';

function unitIsType(unit, type) {
  if(type === UNIT_TYPES.All) {
    return true;
  } else if(type === UNIT_TYPES.Royal) {
    return unit.rank === UNIT_TYPES.Royal;
  } else if(type === UNIT_TYPES.Common) {
    return unit.rank === UNIT_TYPES.Common;
  } else if(type === unit.type) {
    return true;
  } else {
    return false;
  }
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

export function getTargets(g, ctx, player, cubit) {
  let opponent = player === "0" ? "1" : "0";
  let targeting = cubit.targeting;

  let targets = [];
  for (let i = 0; i < targeting.length; i++) {
    let target = targeting[i];

    // Get Controller
    let controller = null;
    if(target.constraint === TARGET_CONSTRAINTS.Self) {
      controller = player;
    } else if(target.constraint === TARGET_CONSTRAINTS.Opponent) {
      controller = opponent;
    }

    // Test for Target
    if (target.location === LOCATIONS.Arena) {     
      
      targets.push(new ArenaTarget());

    } else if (target.location === LOCATIONS.Hand) {
      
      targets.push(new HandTarget(controller));

    } else if (target.location === LOCATIONS.Player) {
      if(target.attachment) {
        // Make sure there is space on the player for new cubits
        let avatar = g.cubits.filter(_ => _.location === LOCATIONS.Player && _.controller === controller);
        if(avatar.length < 5) {
          targets.push(new PlayerTarget(controller));
        }
      } else {
        // TODO: Cubit Targeting...
        // targets.push(new PlayerTarget(controller));
      }
    } else if(target.location === LOCATIONS.Unit) {
      if(target.attachment) {

        //TODO: Check for other Cubits that would limit targeting (like: Condemn)
        let units = g.units
          .filter(_ => _.location === LOCATIONS.Board) // This may seems like the worng location but unit never have a locaiton of units (at is the board)...
          .filter(_ => _.ownership === controller)
          .filter(_ => unitIsType(_, target.type))
          .filter(_ => _.cubits.length < _.slots)
          .filter(_ => unitHasCubit(g, ctx, _, CUBIT_TYPES.Condemn) === false)
          .filter(_ => (unitHasCubit(g, ctx, _, CUBIT_TYPES.Immunity) && _.ownership === opponent) === false)

          let indexes = units.map(_ => _.id);
          targets.push(new UnitTarget(controller, indexes, target.targets));
      } else {
        // TODO: Cubit Targeting...
      }
    } else if (target.location === LOCATIONS.Board) {
      let units = g.units
        .filter(_ => _.location === LOCATIONS.Board)
        .filter(_ => _.obstruction === true)
        .filter(_ => _.position != null);

      let cubits = g.cubits
        .filter(_ => _.location === LOCATIONS.Board)
        .filter(_ => _.obstruction === true)
        .filter(_ => _.position != null);

      let positions = [];
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          let hasUnits = units.filter(_ => _.position.x === x && _.position.y === y).length > 0;
          let hasCubits = cubits.filter(_ => _.position.x === x && _.position.y === y).length > 0;
          let occupied = hasUnits || hasCubits;
          if(occupied === target.occupied) {
            positions.push({x,y});
          }              
        }
      }
      targets.push(new BoardTarget(positions, target.targets));
    }
  }
  
  return targets;
}