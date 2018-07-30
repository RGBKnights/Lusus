
export class Cubit {
  constructor(n, d, i) {
    this.name = n;
    this.description = d;
    this.icon = i;
  }

  get name() {
    return this.name;
  }

  get description() {
    return this.description;
  }

  get icon() {
    return this.icon;
  }
}

export class HiddenCubit extends Cubit {
  constructor(n, desc) {
    super("Hidden", "The hidden cubit.");
  }
}

export class MovementKingCubit extends Cubit {
  constructor() {
    super("King", "The bearer gains the movement of a King.");
  }
}

export class MovementQueenCubit extends Cubit {
  constructor() {
    super("Queen", "The bearer gains the movement of a Queen.");
  }
}

export class MovementBishopCubit extends Cubit {
  constructor() {
    super("Bishop", "The bearer gains the movement of a Bishop.");
  }
}

export class MovementKnightCubit extends Cubit {
  constructor() {
    super("Knight", "The bearer gains the movement of a Knight.");
  }
}

export class MovementRookCubit extends Cubit {
  constructor() {
    super("Rook", "The bearer gains the movement of a Rook.");
  }
}

export class MovementPawnCubit extends Cubit {
  constructor() {
    super("Pawn", "The bearer gains the movement of a Pawn.");
  }
}

export class MovementSwapCubit extends Cubit {
  constructor() {
    super("Swap", "The bearer gains the ability to swap with an adjacent piece.");
  }
}

export class MovementRnBCubit extends Cubit {
  constructor() {
    super("R&B", "If bearer had rook gains bishop vs. if bearer had bishop gain rook. If they have neither nothing happens.");
  }
}

export class MovementSidestepCubit extends Cubit {
  constructor() {
    super("Sidestep", "The bearer gains the ability to move one space orthogonality.");
  }
}

export class SpecialImmuneCubit extends Cubit {
  constructor() {
    super("Immune", "The bearer gains immunity from special effects and the other Cubits it bears cannot be targeted.");
  }
}

export class SpecialGuardCubit extends Cubit {
  constructor() {
    super("Guard", "The bearer gains friendly pieces it could attack cannot be taken.");
  }
}

export class SpecialDrawMinusCubit extends Cubit {
  constructor() {
    super("Draw -1", "The bearer causes the player to draw one less Cubit.");
  }
}

export class SpecialDrawPlusCubit extends Cubit {
  constructor() {
    super("Draw +1", "The bearer causes the player to draw one more Cubit.");
  }
}

export class SpecialStickyFeetCubit extends Cubit {
  constructor() {
    super("Sticky Feet", "The bearer's movement amount is restricted to one space.");
  }
}

export class SpecialDisarmCubit extends Cubit {
  constructor() {
    super("Disarm", "The bearer cannot make moves that capture pieces.");
  }
}

export class SpecialEnrageCubit extends Cubit {
  constructor() {
    super("Enrage", "The bearer cannot make moves that do not capture pieces.");
  }
}

export class SpecialPhaseCubit extends Cubit {
  constructor() {
    super("Phase", "The bearer gains the ability to move through one piece when it moves.");
  }
}

export class SpecialDoubleActionCubit extends Cubit {
  constructor() {
    super("Double Action", "The controllers gains the ability to play an extra Cubit from there hand each turn.");
  }
}

export class SpecialSpringCubit extends Cubit {
  constructor() {
    super("Spring", "The bearer gains the ability to continue diagonal movement bouncing off edges of the board.");
  }
}

export class SpecialCondemnCubit extends Cubit {
  constructor() {
    super("Spring", "Uses up all free slots on the bearer.");
  }
}

export class SpecialWrapCubit extends Cubit {
  constructor() {
    super("Wrap", "The bearer gains the ability to wrap around sides of the board.");
  }
}

export class SpecialGhostCubit extends Cubit {
  constructor() {
    super("Ghost", "units adjacent to the bearer can not move.");
  }
}

export class SpecialImmobilizedCubit extends Cubit {
  constructor() {
    super("Immobilized", "The bearer cant move at all.");
  }
}

export class SpecialHitnRunCubit extends Cubit {
  constructor() {
    super("Hit & Run", "The bearer can 'On Capture' take another move. That move must be passive.");
  }
}

export class SpecialKnowledgeCubit extends Cubit {
  constructor() {
    super("Knowledge", "The opponent hand is revealed.");
  }
}

export class SpecialBoulderdashCubit extends Cubit {
  constructor() {
    super("Boulder dash", "The bearer gains for every contiguous unoccupied space moved, you may take an additional piece after the first.");
  }
}

export class SpecialThiefCubit extends Cubit {
  constructor() {
    super("Thief", "The bearer gains 'On Capture' move one cubits from the captured unit to the bearer.");
  }
}

export class TrapsRevengeCubit extends Cubit {
  constructor() {
    super("Revenge", "The bearer gains 'When Captured' the captured unit is also captured.");
  }
}

export class TrapsNoDrawCubit extends Cubit {
  constructor() {
    super("No Draw", "The bearer gains 'When Captured' the opponent does not draw a new hand.");
  }
}

export class TrapsRevertCubit extends Cubit {
  constructor() {
    super("Revert", "The bearer gains 'When Captured' revert the last move."); // Explore the undo framework for this...
  }
}

export class TrapsDodgeCubit extends Cubit {
  constructor() {
    super("Dodge", "The bearer gains 'When Captured' instead of being captured move to a random adjacent space.");
  }
}

export class TrapsTransfusionCubit extends Cubit {
  constructor() {
    super("Transfusion", "The bearer gains 'When Captured' transfer all Cubits to the controllers bag.");
  }
}

export class TrapsBequeathCubit extends Cubit {
  constructor() {
    super("Bequeath", "The bearer gains 'When Captured' select one Cubit to transfer to hand.");
  }
}

export class DisposableDispelCubit extends Cubit {
  constructor() {
    super("Dispel", "Send any target Cubit to the graveyard.");
  }
}

export class DisposableKnockoutCubit extends Cubit {
  constructor() {
    super("Knockout", "Send all Cubits on target unit to the graveyard");
  }
}

export class DisposableDisenchantCubit extends Cubit {
  constructor() {
    super("Disenchant", "send any target Special Cubit to the graveyard");
  }
}

export class DisposableTripCubit extends Cubit {
  constructor() {
    super("Trip", "send any target Movement Cubit to the graveyard");
  }
}

export class DisposableEnsnareCubit extends Cubit {
  constructor() {
    super("Ensnare", "send all Movement Cubit on target unit the graveyard");
  }
}

export class DisposableDelayCubit extends Cubit {
  constructor() {
    super("Delay", "Target player discard all Cubits in hand to bag.");
  }
}

export class DisposableBackstabCubit extends Cubit {
  constructor() {
    super("Backstab", "Target player discard 2 Cubits at random from your hand to graveyard.");
  }
}

export class DisposableLifetapCubit extends Cubit {
  constructor() {
    super("Life tap", "Target player discard 2 Cubits at random to opponent bag.");
  }
}

export class DisposableHealCubit extends Cubit {
  constructor() {
    super("Heal", "Recover 3 Cubits from your graveyard to your hand.");
  }
}

export class DisposableRecycleCubit extends Cubit {
  constructor() {
    super("Recycle", "Use a Cubit in the graveyard.");
  }
}

export class DisposableTradeCubit extends Cubit {
  constructor() {
    super("Trade", " Swap any two Cubits and any two targetable units.");
  }
}