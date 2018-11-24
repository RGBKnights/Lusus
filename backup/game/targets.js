import {
  CUBIT_TYPES,
  // UNIT_TYPES,
  LOCATIONS,
  TARGETING_TYPE,
  TARGETING_CONSTRAINTS
} from './common';

function getTypes(g, ctx, unit) {
  let types = [];
  for (const id of unit.cubits) {
    const cubit = g.cubits.find(_ => _.id === id);
    types.push(cubit.type);
  }
  return types;
}

export function getTargets(g, ctx, player, cubit) {
  let opponent = player === "0" ? "1" : "0";
  let targeting = cubit.targeting;

  let targetDefault = {
    // TARGETING_TYPE
    type: TARGETING_TYPE.Unknown,
    // LOCATIONS
    location: LOCATIONS.Unknown,
     // TARGETING_CONSTRAINTS
    constraint: TARGETING_CONSTRAINTS.Unknown,
    pierces: false,
    occupied: false
  };

  let targets = [];
  for (let i = 0; i < targeting.length; i++) {
    let target = {...targetDefault, ...targeting[i]};

    // Get Controller
    let controller = null;
    if(target.constraint === TARGETING_CONSTRAINTS.Self) {
      controller = player;
    } else if(target.constraint === TARGETING_CONSTRAINTS.Opponent) {
      controller = opponent;
    }

    // Test for Target
    if (target.location === LOCATIONS.Arena) {
      if(target.type === TARGETING_TYPE.TargetCubitAtLocation) {
        let arena = g.cubits.filter(_ => _.location === LOCATIONS.Arena);
        if(arena.length > 0) {
          targets.push({ 
            ...target
          });
        }
      } else if (target.type === TARGETING_TYPE.AttachLocation || target.type === TARGETING_TYPE.TargetLocation) {
        targets.push({ 
          ...target
        });
      } else {
        continue;
      }
    } else if (target.location === LOCATIONS.Player) {
      let avatar = g.cubits.filter(_ => _.location === LOCATIONS.Player && _.controller === controller);

      if(target.type === TARGETING_TYPE.AttachLocation) {
        // Make sure there is space on the player for new cubits
        if(avatar.length < 5) {
          targets.push({ 
            ...target, 
            player: controller
          });
        }
      } else if(target.type === TARGETING_TYPE.TargetCubitAtLocation) {
        // Get the cubits on the player
        for (const cubit of avatar) {
          targets.push({ 
            ...target,
            player: controller,
            cubit: cubit.id 
          });
        }
      } else if(target.type === TARGETING_TYPE.TargetLocation) {
        targets.push({ 
          ...target,
          player: controller 
        });
      } else {
        continue;
      }
    } else if(target.location === LOCATIONS.Unit) {
      let units = g.units
          .filter(_ => _.location === LOCATIONS.Board) // This may seems like the worng location but unit never have a locaiton of units (at is the board)...
          .filter(_ => _.ownership === controller)

      if(target.type === TARGETING_TYPE.AttachLocation || target.type === TARGETING_TYPE.TargetUnitAtLocation) {
        units = units.filter(_ => _.cubits.length < _.slots);

        for (const unit of units) {
          let types = getTypes(g, ctx, unit);
          if(types.includes(CUBIT_TYPES.Condemn)) {
            continue;
          } else if(types.includes(CUBIT_TYPES.Immunity) && unit.ownership === opponent) {
            if(target.pierces === false) {
              continue;
            }
          }

          targets.push({ 
            ...target,
            player: controller,
            unit: unit.id
          });
        }

      } else if(target.type === TARGETING_TYPE.TargetLocation) {
        targets.push({ 
          ...target,
          player: controller
        });
      } else if(target.type === TARGETING_TYPE.TargetCubitAtLocation) {
        for (const unit of units) {
        
          let types = getTypes(g, ctx, unit);
          if(types.includes(CUBIT_TYPES.Immunity)) { //  && unit.ownership === opponent
            if(target.pierces === false) {
              continue;
            }
          }
          // If pass the checkes then vaild target...
          for (const id of unit.cubits) {
            targets.push({ 
              ...target,
              player: controller,
              cubit: id
            });
          }
        }
      } else {
        for (const unit of units) {
          targets.push({ 
            ...target,
            player: controller,
            unit: unit.id
          });
        }
      }
    } else if (target.location === LOCATIONS.Board) {
      if(target.type === TARGETING_TYPE.AttachLocation) {
        let units = g.units
          .filter(_ => _.location === LOCATIONS.Board)
          .filter(_ => _.obstruction === true)
          .filter(_ => _.position != null);

        let cubits = g.cubits
          .filter(_ => _.location === LOCATIONS.Board)
          .filter(_ => _.obstruction === true)
          .filter(_ => _.position != null);

        for (let x = 0; x < 8; x++) {
          for (let y = 0; y < 8; y++) {
            let hasUnits = units.filter(_ => _.position.x === x && _.position.y === y).length > 0;
            let hasCubits = cubits.filter(_ =>  _.position.x === x && _.position.y === y).length > 0;
            let occupied = hasUnits || hasCubits;
            if(occupied === target.occupied) {
              targets.push({ 
                ...target,
                position: {x, y}
              });
            }              
          }
        }
      } else if(target.type === TARGETING_TYPE.TargetCubitAtLocation) {
        // rgbKNIGHTS: NEEDS WORK
      } else if(target.type === TARGETING_TYPE.TargetUnitAtLocation) {
        // rgbKNIGHTS: NEEDS WORK
      } else if(target.type === TARGETING_TYPE.TargetLocation) {
        // rgbKNIGHTS: NEEDS WORK
      } else {
        continue;
      }
    } else {
      targets.push({ 
        ...target,
        player: controller
      });
    }
  }
  
  return targets;
}