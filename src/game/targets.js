import {
  CUBIT_TYPES,
  // UNIT_TYPES,
  LOCATIONS,
  TARGET_CONSTRAINTS,
  ArenaTarget,
  UnitTarget,
  PlayerTarget,
  BoardTarget,
} from './common';

export function getTargets(g, ctx, player, cubit) {
  let self = player === ctx.currentPlayer;
  let opponent = player === "0" ? "1" : "0";
  let targeting = cubit.targeting;

  let targets = [];
  for (let i = 0; i < targeting.length; i++) {
    let target = targeting[i];

    // Get Controller
    let controller = null;
    if(self && target.constraint === TARGET_CONSTRAINTS.Self) {
      controller = player;
    } else if(!self && target.constraint === TARGET_CONSTRAINTS.Opponent) {
      controller = opponent;
    }

    // Test for Target
    if (target.location === LOCATIONS.Arena) {
      // TODO: Target the location or the locations slot
      targets.push(new ArenaTarget());
    } else if (target.location === LOCATIONS.Player) {
      if(target.attachment) {
        // Make sure there is space on the player for new cubits
        let avatar = g.cubits.filter(_ => _.location === LOCATIONS.Player && _.controller === controller);
        if(avatar.length < 5) {
          targets.push(new PlayerTarget(controller));
        }
      } else {
        targets.push(new PlayerTarget(controller));
      }
    } else if(target.location === LOCATIONS.Unit) {
      let units = g.units
        .filter(_ => _.ownership === controller)
        .filter(_ => _.isType(target.type))

      if(target.attachment) {
        //TODO: Check for other Cubits that would limit targeting (like: Condemn)
        units = units
          .filter(_ => _.cubits.length < _.slots)
          .filter(_ => _.hasCubit(CUBIT_TYPES.Condemn) === false)
          .filter(_ => (_.hasCubit(CUBIT_TYPES.Immunity) && _.ownership === opponent) === false);
      }
      targets.push(new UnitTarget(units, target.targets));

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