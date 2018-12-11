import { CUBITS, LOCATIONS, PLACEMENT, unitHasCubits } from './common';
import { Database } from './database';

export function getPlacements(G, ctx, id) {
  let collection = [];
  
  let cubit = G.players[ctx.currentPlayer].hand.find(_ => _.id === id);
  if(!cubit) {
    return collection;
  }

  let placements = Database.cubits[cubit.type].placement;

  for (const unit of G.field) {
    let location = (unit.ownership === cubit.ownership) ? LOCATIONS.MyField : LOCATIONS.OpponentsField
    let targeting = placements.filter(_ => _.where === location).map(_ => _.condition);
    let position = {x:0, y:0};
    {
      let offset = location === LOCATIONS.MyField ? 0 : 18;
      if(unit.layout.r === 0 && unit.ownership === '0') {
        position.x = unit.layout.f + offset;
        position.y = 0;
      } else if(unit.layout.r === 1 && unit.ownership === '0') {
        position.x = unit.layout.f + offset;
        position.y = 4;
      } else if(unit.layout.r === 0 && unit.ownership === '1') {
        position.x = unit.layout.f+ offset;
        position.y = 0;
      } else if(unit.layout.r === 1 && unit.ownership === '1') {
        position.x = unit.layout.f + offset;
        position.y = 4;
      }

      if(unit.position && targeting.includes(PLACEMENT.Unit) && !unitHasCubits(unit, CUBITS.Immunity)) {
        collection.push({ target: 0, x: position.x, y: position.y});
      }
    }

    for (let i = 0; i < unit.slots; i++) {
      let x = position.x;
      let y = position.y + i + 1;
      const cubit = unit.cubits[i];
      if(cubit) {
        if(unit.position && targeting.includes(PLACEMENT.Cubit) && !unitHasCubits(unit, CUBITS.Immunity)) {
          collection.push({ target: 0, x: x, y: y});
        }
      } else {
        if(unit.position && targeting.includes(PLACEMENT.Empty) && !unitHasCubits(unit, CUBITS.Condemn)) {
          collection.push({ target: 0, x: x, y: y});
        }
      }
    }
  }

  return collection;
}