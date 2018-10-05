import {
  CUBIT_TYPES,
  UNIT_TYPES,
  UNIT_FILE,
  LOCATIONS,
} from './common';

import { getMovements } from './movements';
import { getTargets } from './targets';

import { 
  KingUnit,
  QueenUnit,
  BishopUnit,
  RookUnit,
  KnightUnit,
  PawnUnit
} from './units';

import {
  OrthogonalCubit,
  DiagonalCubit,
  CardinalCubit,
  JumpCubit,
  SideStepCubit,
  SwapCubit,
  DrawNegOneCubit,
  DrawPlusOneCubit,
  DoubleActionCubit,
  KnowledgeCubit,
  CondemnCubit,
  KingOfHillCubit,
  EnrageCubit,
  PassifyCubit,
  AncientRevivalCubit,
  BacktoBasicsCubit,
  BlinkDodgeCubit,
  CostofPowerCubit,
  DarkMagicCubit,
  EncumberCubit,
  ArenaHoleCubit,
  ArenaRockCubit,
  ArenaIceCubit,
  ImmunityCubit,
  JumperCubit,
  LooterCubit,
  MulliganCubit,
  NabCubit,
  PoisonedCubit,
  PoofCubit,
  RecklessCubit,
  ResourcefulCubit,
  RevertCubit,
  RockThrowCubit,
  SacrificeCubit,
  StickyFeetCubit,
  TauntCubit,
  ThunderDomeCubit,
  TimebombCubit,
} from './cubits';

export class GameLogic {
    initialize(g, ctx) {
      g.units = [];
      g.cubits = [];
    }

    setup(g, ctx) {
      for (let a = 0; a < ctx.numPlayers; a++) {
        let p = a.toString();

        let units = [
          new RookUnit(p, UNIT_FILE.A),
          new KnightUnit(p, UNIT_FILE.B),
          new BishopUnit(p, UNIT_FILE.C),
          new QueenUnit(p, UNIT_FILE.D),
          new KingUnit(p, UNIT_FILE.E),
          new BishopUnit(p, UNIT_FILE.F),
          new KnightUnit(p, UNIT_FILE.G),
          new RookUnit(p, UNIT_FILE.H),
          new PawnUnit(p, UNIT_FILE.A),
          new PawnUnit(p, UNIT_FILE.B),
          new PawnUnit(p, UNIT_FILE.C),
          new PawnUnit(p, UNIT_FILE.D),
          new PawnUnit(p, UNIT_FILE.E),
          new PawnUnit(p, UNIT_FILE.F),
          new PawnUnit(p, UNIT_FILE.G),
          new PawnUnit(p, UNIT_FILE.H),
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
          new OrthogonalCubit(p),
          new DiagonalCubit(p),
          new CardinalCubit(p),
          new JumpCubit(p),
          new SideStepCubit(p),
          new SwapCubit(p),
          new DrawNegOneCubit(p),
          new DrawPlusOneCubit(p),
          new DoubleActionCubit(p),
          new KnowledgeCubit(p),
          new CondemnCubit(p),
          new KingOfHillCubit(p),
          new EnrageCubit(p),
          new PassifyCubit(p),
          new AncientRevivalCubit(p),
          new BacktoBasicsCubit(p),
          new BlinkDodgeCubit(p),
          new CostofPowerCubit(p),
          new DarkMagicCubit(p),
          new EncumberCubit(p),
          new ArenaHoleCubit(p),
          new ArenaRockCubit(p),
          new ArenaIceCubit(p),
          new ImmunityCubit(p),
          new JumperCubit(p),
          new LooterCubit(p),
          new MulliganCubit(p),
          new NabCubit(p),
          new PoisonedCubit(p),
          new PoofCubit(p),
          new RecklessCubit(p),
          new ResourcefulCubit(p),
          new RevertCubit(p),
          new RockThrowCubit(p),
          new SacrificeCubit(p),
          new StickyFeetCubit(p),
          new TauntCubit(p),
          new ThunderDomeCubit(p),
          new TimebombCubit(p),
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