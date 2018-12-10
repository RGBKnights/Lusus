import { UNITS, TARGETS, ACTIONS } from './common';
// import { isPlayerInCheck } from './movement' // let check = isPlayerInCheck(G, ctx, unit.ownership, unit.position);
// import { Database } from './database';

export function getTargets(G, ctx, event) {
  let collection = [];

  switch (event.action.type) {
    case  ACTIONS.Castle:
      {
        /*
        The king does not pass through a square that is attacked by an enemy piece.[4]
        The king does not end up in check. (True of any legal move.)
        */

        let ranks = {'0': 7,  '1': 0};

        if(!event.unit) break;
        let unit = event.unit;

        if(G.players[unit.ownership].check) break; // The king is not currently in check.
        if(unit.moves > 0) break; // the king has NOT previously moved.
        if(unit.position.y !== ranks[unit.ownership]) break; // The king are on the player's first rank.[3]

        let units = G.field.filter(_ =>  _.position != null);
        let rooks = units
          .filter(_ =>  _.ownership === unit.ownership)
          .filter(_ => _.type === UNITS.Rook)
          .filter(_ => _.moves === 0) // the chosen rook has NOT previously moved.
          .filter(_ => _.position.y === ranks[unit.ownership]);  // the chosen rook are on the player's first rank.[3]

        if(rooks.length === 0) break;

        // There are no pieces between the king and the chosen rook.
        for (const unit of rooks) {
          if(unit.position.x === 0) {
            let a = units.find(_ => _.position.x === 1 && _.position.y === unit.position.y);
            let b = units.find(_ => _.position.x === 2 && _.position.y === unit.position.y);
            let c = units.find(_ => _.position.x === 3 && _.position.y === unit.position.y);
            if(a == null && b == null && c == null) {
              collection.push({ target: TARGETS.Friendly, x: unit.position.x, y: unit.position.y });
            }
          } else if(unit.position.x === 7) {
            let a = units.find(_ => _.position.x === 5 && _.position.y === unit.position.y);
            let b = units.find(_ => _.position.x === 6 && _.position.y === unit.position.y);
            if(a == null && b == null) {
              collection.push({ target: TARGETS.Friendly, x: unit.position.x, y: unit.position.y });
            }
          }
        }
        break;
      }
    default:
      break;
  }

  return collection;
}

export function triggerAction(G, ctx, source, target) {}