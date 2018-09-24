import { 
    // CUBIT_TYPES,
    // UNIT_TYPES,
    UNIT_RANK,
    UNIT_FILE
} from './common';

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
  PassifyCubit
} from './cubits';

export class GameLogic {
    initialize(g, ctx) {
        g.board = [];
        g.arena = null;
        g.afterlife = {
          cubits: [],
          units: []
        };
        g.bag = [];
        g.hand = [];
        g.avatar = [];
        g.exile = [];

        g.effects = {
          basics: [false, false],
          passify: [false, false],
          enraged: [false, false]
        };
        g.draws = {
          total: [3,3]
        };
        g.actions = {
          total: [1,1],
          count: [1,1],
        };
        g.movement = {
          total: [1,1],
          count: [1,1],
        };
    }

    setupUnits(g, ctx) {
      g.board = [];

      for (let i = 0; i < ctx.numPlayers; i++) {
        let p = i.toString();
        let data = [
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
        ]

        g.board = g.board.concat(data);
      };

      let options = {};
      options[UNIT_RANK.Common] = {"0":1, "1": 6};
      options[UNIT_RANK.Royal] = {"0":0, "1": 7};

      for (let i = 0; i < g.board.length; i++) {
        let option = options[g.board[i].rank];
        g.board[i].location = {
          x: option[g.board[i].ownership], 
          y: g.board[i].file - 1
        };
      }
    }

    setupBag(g, ctx) {
      g.bag = [];
      for (let i = 0; i < ctx.numPlayers; i++) {
        let p = i.toString();
        let data = [
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
          new PassifyCubit(p)
        ]
        g.bag = g.bag.concat(data);
      }
    }
}