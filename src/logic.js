import { 
  NullCubit,
  MovementKingCubit,
  MovementQueenCubit,
  MovementBishopCubit,
  MovementKnightCubit,
  MovementRookCubit,
  MovementPawnCubit,
  MovementSwapCubit,
  MovementRnBCubit,
  MovementSidestepCubit,
  SpecialImmuneCubit,
  SpecialGuardCubit,
  SpecialDrawMinusCubit,
  SpecialDrawPlusCubit,
  SpecialStickyFeetCubit,
  SpecialDisarmCubit,
  SpecialEnrageCubit,
  SpecialPhaseCubit,
  SpecialDoubleActionCubit,
  SpecialCondemnCubit,
  SpecialWrapCubit,
  SpecialGhostCubit,
  SpecialImmobilizedCubit,
  SpecialHitnRunCubit,
  SpecialKnowledgeCubit,
  SpecialBoulderdashCubit,
  SpecialThiefCubit,
 } from './logic';

export class Logic {
  get getCubits() {
    return {
      '1000': new NullCubit(),
      // Movement
      '1001': new MovementKingCubit(),
      '1002': new MovementQueenCubit(),
      '1003': new MovementBishopCubit(),
      '1004': new MovementKnightCubit(),
      '1005': new MovementRookCubit(),
      '1006': new MovementPawnCubit(),
      '1007': new MovementSwapCubit(),
      '1008': new MovementRnBCubit(),
      '1009': new MovementSidestepCubit(),
      // Special
      '1010': new SpecialImmuneCubit(),
      '1011': new SpecialGuardCubit(),
      '1012': new SpecialDrawMinusCubit(),
      '1013': new SpecialDrawPlusCubit(),
      '1014': new SpecialStickyFeetCubit(),
      '1015': new SpecialDisarmCubit(),
      '1016': new SpecialEnrageCubit(),
      '1017': new SpecialPhaseCubit(),
      '1018': new SpecialDoubleActionCubit(),
      '1019': new SpecialSpringCubit(),
      '1020': new SpecialCondemnCubit(),
      '1021': new SpecialWrapCubit(),
      '1022': new SpecialGhostCubit(),
      '1023': new SpecialImmobilizedCubit(),
      '1024': new SpecialHitnRunCubit(),
      '1025': new SpecialKnowledgeCubit(),
      '1026': new SpecialBoulderdashCubit(),
      '1027': new SpecialThiefCubit(),
    }
  }

  get getCubit(cubitId) {
    let collection = this.getCubits();
    return collection[cubitId];
  }

}