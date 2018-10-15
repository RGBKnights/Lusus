import {
  CUBIT_TYPES,
  UNIT_TYPES,
  UNIT_FILE,
  LOCATIONS,
} from './common';

import * as Units from './units';
import * as Cubits from './cubits';

export class GameLogic {

  getCubits(p) {
    const cubits = [
      new Cubits.OrthogonalCubit(p),
      new Cubits.DiagonalCubit(p),
      new Cubits.CardinalCubit(p),
      new Cubits.JumpCubit(p),
      new Cubits.SideStepCubit(p),
      new Cubits.SwapCubit(p),
      new Cubits.DrawNegOneCubit(p),
      new Cubits.DrawPlusOneCubit(p),
      new Cubits.DoubleActionCubit(p),
      new Cubits.KnowledgeCubit(p),
      new Cubits.CondemnCubit(p),
      new Cubits.KingOfHillCubit(p),
      new Cubits.EnrageCubit(p),
      new Cubits.PassifyCubit(p),
      /*
      new Cubits.AncientRevivalCubit(p),
      new Cubits.BacktoBasicsCubit(p),
      new Cubits.BlinkDodgeCubit(p),
      new Cubits.CostofPowerCubit(p),
      new Cubits.DarkMagicCubit(p),
      new Cubits.EncumberCubit(p),
      new Cubits.ArenaHoleCubit(p),
      new Cubits.ArenaRockCubit(p),
      new Cubits.ArenaIceCubit(p),
      new Cubits.ImmunityCubit(p),
      new Cubits.JumperCubit(p),
      new Cubits.LooterCubit(p),
      new Cubits.MulliganCubit(p),
      new Cubits.NabCubit(p),
      new Cubits.PoisonedCubit(p),
      new Cubits.PoofCubit(p),
      new Cubits.RecklessCubit(p),
      new Cubits.ResourcefulCubit(p),
      new Cubits.RevertCubit(p),
      new Cubits.RockThrowCubit(p),
      new Cubits.SacrificeCubit(p),
      new Cubits.StickyFeetCubit(p),
      new Cubits.TauntCubit(p),
      new Cubits.ThunderDomeCubit(p),
      new Cubits.TimebombCubit(p),
      */
    ];

    return cubits;
  }

  // SETUP

  initialize(g, ctx) {
    g.units = [];
    g.cubits = [];
    g.players = {
      "0": {},
      "1": {},
    };
  }

  setup(g, ctx) {
    for (let a = 0; a < ctx.numPlayers; a++) {
      let p = a.toString();

      g.players[p] = {
        actions: 1,
        hand: 3,
        moves: 1,
      }

      let units = [
        new Units.RookUnit(p, UNIT_FILE.A),
        new Units.KnightUnit(p, UNIT_FILE.B),
        new Units.BishopUnit(p, UNIT_FILE.C),
        new Units.QueenUnit(p, UNIT_FILE.D),
        new Units.KingUnit(p, UNIT_FILE.E),
        new Units.BishopUnit(p, UNIT_FILE.F),
        new Units.KnightUnit(p, UNIT_FILE.G),
        new Units.RookUnit(p, UNIT_FILE.H),
        new Units.PawnUnit(p, UNIT_FILE.A),
        new Units.PawnUnit(p, UNIT_FILE.B),
        new Units.PawnUnit(p, UNIT_FILE.C),
        new Units.PawnUnit(p, UNIT_FILE.D),
        new Units.PawnUnit(p, UNIT_FILE.E),
        new Units.PawnUnit(p, UNIT_FILE.F),
        new Units.PawnUnit(p, UNIT_FILE.G),
        new Units.PawnUnit(p, UNIT_FILE.H),
      ];
      let options = {};
      options[UNIT_TYPES.Common] = {"0":1, "1": 6};
      options[UNIT_TYPES.Royal] = {"0":0, "1": 7};

      for (let i = 0; i < units.length; i++) {
        const unit = units[i];
        let option = options[unit.rank];
        unit.location = LOCATIONS.Board;
        unit.position = {
          x: option[unit.ownership], 
          y: unit.file - 1
        };

        g.units.push(unit);
      }

      let cubits = this.getCubits(p);

      for (let i = 0; i < cubits.length; i++) {
        const cubit = cubits[i];
        cubit.location = LOCATIONS.Bag;
        cubit.ownership = p;
        cubit.controller = p;

        g.cubits.push(cubit);
      }

      let bag = g.cubits.filter(_ => _.location === LOCATIONS.Bag && _.controller === p);
      bag = ctx.random.Shuffle(bag);

      let draws = this.getDraws(g, ctx, p);
      for (let i = 0; i < draws; i++) {
        bag[i].location = LOCATIONS.Hand;
      }
    };
  }

  // ACTIONS

  onDraw(g, ctx) {
    // Draw - Move hand to Bag
    let hand = g.cubits.filter(_ => _.location === LOCATIONS.Hand && _.controller === ctx.currentPlayer);
    for (const cubit of hand) {
      cubit.location = LOCATIONS.Bag;
    }

    // Shuffle Bag
    let bag = g.cubits.filter(_ => _.location === LOCATIONS.Bag && _.controller === ctx.currentPlayer);
    bag = ctx.random.Shuffle(bag);

    // If bag is less then number of draws then GameOver()
    let draws = this.getDraws(g, ctx, ctx.currentPlayer);
    if(draws > bag.length) {
      return false;
    }

    // Draw new hand
    for (let i = 0; i < draws; i++) {
      bag[i].location = LOCATIONS.Hand;
    }
    return true;
  }

  // PROPERTIES

  getBagSize(g, ctx, player) {
    return g.cubits.filter(_ => _.location === LOCATIONS.Bag && _.controller === player).length;
  }

  getDraws(g, ctx, player) {
    let draws = g.players[player].hand;

    let cubits = g.cubits.filter(_ => _.location === LOCATIONS.Player && _.controller === player).map(_ => _.type);
    if(cubits.includes(CUBIT_TYPES.DrawPlusOne)) {
      draws--;
    }
    if(cubits.includes(CUBIT_TYPES.DrawNegOne)) {
      draws++;
    }

    return draws;
  }

  getHandSize(g, ctx, player) {
    return g.cubits.filter(_ => _.location === LOCATIONS.Hand && _.controller === player).length;
  }

  getActivities(g, ctx, player) {
    let actions = Math.min(Math.floor((ctx.turn / 10)) + 1, 5);

    let cubits = g.cubits.filter(_ => _.location === LOCATIONS.Player && _.controller === player).map(_ => _.type);
    if(cubits.includes(CUBIT_TYPES.DoubleAction)) {
      actions++;
    }

    return actions;
  }

  getActions(g, ctx, player) {
    return g.players[player].actions;
  }

  getMoves(g, ctx, player) {
    return g.players[player].moves;
  }

  getAfterlifeUnits(g, ctx, player) {
    let units = g.units.filter(_ => _.location === LOCATIONS.Afterlife && _.ownership === player);
    return units.length;
  }

  getAfterlifeCubits(g, ctx, player) {
    let cubits = g.cubits.filter(_ => _.location === LOCATIONS.Afterlife && _.ownership === player);
    return cubits.length;
  }
}