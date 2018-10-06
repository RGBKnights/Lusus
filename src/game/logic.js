import {
  CUBIT_TYPES,
  UNIT_TYPES,
  UNIT_FILE,
  LOCATIONS,
} from './common';

import { getMovements } from './movements';
import { getTargets } from './targets';

import * as Units from './units';
import * as Cubits from './cubits';

export class GameLogic {
    initialize(g, ctx) {
      g.units = [];
      g.cubits = [];
    }

    setup(g, ctx) {
      for (let a = 0; a < ctx.numPlayers; a++) {
        let p = a.toString();

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

        let cubits = [
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
          new AncientRevivalCubit(p),
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
        ];

        for (let i = 0; i < cubits.length; i++) {
          const cubit = cubits[i];
          cubit.location = LOCATIONS.Bag;
          cubit.controller = p;

          g.cubits.push(cubit);
        }

        g.cubits = ctx.random.Shuffle(g.cubits);
        let draws = this.getNumberOfDraws(g, ctx);
        for (let i = 0; i < draws; i++) {
          g.cubits[i].location = LOCATIONS.Hand;
        }
      };
    }

    getTargets(g, ctx, player, id) {
      let cubit = g.cubits.find(_ => _.id === id);
      let targets = cubit == null ? [] : getTargets(g, ctx, player, cubit);
      return targets;
    }

    getMovements(g, ctx, player, id) {
      let unit = g.units.find(_ => _.id === id);
      let moves = unit == null ? [] : getMovements(g, ctx, player, unit);
      return moves;
    }

    getNumberOfDraws(g, ctx, player) {
      let draws = 3;

      let cubits = g.cubits.filter(_ => _.location === LOCATIONS.Player && _.controller === player).map(_ => _.type);
      if(cubits.includes(CUBIT_TYPES.DrawPlusOne)) {
        draws--;
      }
      if(cubits.includes(CUBIT_TYPES.DrawNegOne)) {
        draws++;
      }

      return draws;
    }

    getNumberOfActions(g, ctx, player) {
      let actions = 1;

      let cubits = g.cubits.filter(_ => _.location === LOCATIONS.Player && _.controller === player).map(_ => _.type);
      if(cubits.includes(CUBIT_TYPES.DoubleAction)) {
        actions++;
      }

      return actions;
    }
}