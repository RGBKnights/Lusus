// import { CUBITS, LOCATIONS } from './common';
import { Database } from './database';

export function getTargets(G, ctx, id) {
  let placement = [];

  let cubit = G.players[ctx.currentPlayer].hand.find(_ => _.id === id);
  if(!cubit) {
    return placement;
  }

  let data = Database.cubits[cubit.type];
  return data.placement;
}