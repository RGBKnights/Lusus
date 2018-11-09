import {
  GAME_PHASES,
  CUBIT_TYPES,
  UNIT_TYPES,
  UNIT_FILE,
  DURATION_TYPES,
  // MOVEMENT_TYPES,
  MOVEMENT_ACTIONS,
  LOCATIONS,
} from './common';

import * as Units from './units';
import * as Cubits from './cubits';
import { getMovements } from '../game/movements';

const clone = require('clone');
const uuidv4 = require('uuid/v4');

export class GameLogic {

  getCubits(p) {
    const cubits = [
      new Cubits.OrthogonalCubit(p),
      new Cubits.DiagonalCubit(p),
      new Cubits.CardinalCubit(p),
      new Cubits.JumpCubit(p),
      new Cubits.SideStepCubit(p),
      new Cubits.SwapCubit(p),
      new Cubits.JumperCubit(p),
      new Cubits.DrawNegOneCubit(p),
      new Cubits.DrawPlusOneCubit(p),
      new Cubits.DoubleActionCubit(p),
      new Cubits.KnowledgeCubit(p),
      new Cubits.CondemnCubit(p),
      new Cubits.EnrageCubit(p),
      new Cubits.PassifyCubit(p),
      new Cubits.KingOfHillCubit(p),
      new Cubits.StickyFeetCubit(p),
      new Cubits.EncumberCubit(p),
      new Cubits.ImmunityCubit(p),
      new Cubits.WeakRemovalCubit(p),
      new Cubits.StrongRemovalCubit(p),
      new Cubits.BlinkDodgeCubit(p), 
      new Cubits.CostofPowerCubit(p),
      new Cubits.ForgottenPastCubit(p),
      new Cubits.HeirloomPastCubit(p),
      new Cubits.LooterCubit(p),
      new Cubits.MulliganCubit(p),
      new Cubits.NabCubit(p),
      new Cubits.PoisonedCubit(p),
      new Cubits.ResourcefulCubit(p),    
      new Cubits.RecklessCubit(p),  
      new Cubits.RevertCubit(p),
      new Cubits.SacrificeCubit(p),
      new Cubits.ThunderDomeCubit(p),
      new Cubits.DarkMagicCubit(p),
      new Cubits.BacktoBasicsCubit(p),
      new Cubits.RockThrowCubit(p),
      new Cubits.ArenaRockCubit(p),
      new Cubits.TimebombCubit(p),
      /*
      // ####################################
      new Cubits.PoofCubit(p),
      new Cubits.TauntCubit(p),
      new Cubits.AncientRevivalCubit(p),
      new Cubits.ArenaHoleCubit(p),
      new Cubits.ArenaIceCubit(p),
      */
    ];

    return cubits;
  }

  // SETUP

  initialize(g, ctx) {
    g.next = uuidv4();
    g.debug = {
      skip_action_check: false,
      skip_move_check: false,
      skip_draw_check: false
    }
    g.log = [];
    g.units = [];
    g.cubits = [];
    g.players = {
      "0": {},
      "1": {},
    };

    for (let a = 0; a < ctx.numPlayers; a++) {
      let p = a.toString();

      g.players[p] = {
        check: false,
        actions_used: 0,
        actions_left: 1,
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
    }
  }

  setup(g, ctx, data) {    
    if(data.debug) {
      g.debug = data.debug;
    }

    for (let a = 0; a < ctx.numPlayers; a++) {
      let p = a.toString();

      let cubits = this.getCubits(p);

      for (let i = 0; i < cubits.length; i++) {
        const cubit = cubits[i];

        if(data.bag.length > 0) {
          if(data.bag.includes(cubit.type) === false) {
            continue;
          }
        }

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
    }

    ctx.events.endPhase(GAME_PHASES.Play);
  }

  // HELPERS

  addEvent(g, ctx, event, description = '') {
    g.log.unshift({
      turn: ctx.turn,
      player_id: ctx.currentPlayer,
      player_side: ctx.currentPlayer === "0" ? "White" : "Black",
      event: event,
      description: description
    });
  }

  swapController(obj) {
    obj.controller = obj.controller === "0" ? "1" : "0";
  }

  returnToOwner( obj) {
    obj.controller = obj.ownership;
  }

  drawHand(g, ctx, player, offset = 0) {
    let cubits = g.cubits
      .filter(_ => _.location === LOCATIONS.Hand)
      .filter(_ => _.controller === player);
    for (const cubit of cubits) {
      cubit.location = LOCATIONS.Bag;
    }

    let bag = g.cubits.filter(_ => _.location === LOCATIONS.Bag && _.controller === player);
    bag = ctx.random.Shuffle(bag);

    let draws = this.getDraws(g, ctx, player) + offset;

    this.addEvent(g, ctx, 'Draw', `New hand ${draws} with ${bag.length} left in bag`);

    if(draws > bag.length) {
      return false;
    }

    for (let i = 0; i < draws; i++) {
      bag[i].location = LOCATIONS.Hand;
    }

    return true;
  }

  // ACTIONS

  killCubit(g, ctx, cubit) {
    this.addEvent(g, ctx, 'Killed Cubit', cubit.name);

    // Cleanup
    switch (cubit.type) {
      case CUBIT_TYPES.KingOfHill:
      {
        // Remove Children
        g.cubits = g.cubits.filter(_ => cubit.children.includes(_.id) === false);
        break;
      }
      case CUBIT_TYPES.ArenaRock: 
      {
        // Remove Children
        g.cubits = g.cubits.filter(_ => cubit.children.includes(_.id) === false);
        break;
      }
      default:
        break;
    }

    // Move Cubit to Afterlife
    cubit.location = LOCATIONS.Afterlife;

    // Remove Cubit form Unit
    let unit = g.units.find(_ => _.id === cubit.unit);
    if(unit) {
      unit.cubits = unit.cubits.filter(_ => _ !== cubit.id);
    }
  }

  killUnit(g, ctx, unit) {
    this.addEvent(g, ctx, 'Killed Unit', unit.name);

    // Move unit to Afterlife
    unit.location = LOCATIONS.Afterlife;

    // Move cubits of unit to Afterlife
    for (const id of unit.cubits) {
      let cubit = g.cubits.find(_ => _.id === id);
      cubit.location = LOCATIONS.Afterlife;
    }

    if(unit.type === UNIT_TYPES.King) {
      let opponent = unit.ownership === '0' ? '1' : '0'
      ctx.events.endGame(opponent); // GameOver
    }
  }

  activateCubit(g, ctx, cubit) {
    this.addEvent(g, ctx, 'Activate Cubit', cubit.name);

    switch (cubit.type) {
      case CUBIT_TYPES.Resourceful:
      {
        let player = cubit.controller;
        this.drawHand(g, ctx, player, -1);
        break;
      }
      default:
        break;
    }

    if(cubit.consumed === true) {
      this.killCubit(cubit);
    }
  }


  targetCubit(g, ctx, source, destination) {
    this.addEvent(g, ctx, 'Target Cubit', `${source.name} @ ${destination.name}`);

    switch (source.type) {
      case CUBIT_TYPES.RemovalWeak:
      case CUBIT_TYPES.RemovalStrong:
      {
        this.killCubit(g, ctx, source);
        this.killCubit(g, ctx, destination);
        break;
      }
      default:
        break;
    }
  }

  targetPlayer(g, ctx, cubit, player) {
    this.addEvent(g, ctx, 'Target Player', `${cubit.name} @ ${player}`);

    switch (cubit.type) {
      case CUBIT_TYPES.ForgottenPast:
      {
        this.killCubit(g, ctx, cubit);

        let cubits = g.cubits.filter(_ => _.location === LOCATIONS.Afterlife);
        for (const cubit of cubits) {
          cubit.location = LOCATIONS.Exile;
        }
        let units = g.units.filter(_ => _.location === LOCATIONS.Afterlife);
        for (const unit of units) {
          unit.location = LOCATIONS.Exile;
        }
        break;
      }
      case CUBIT_TYPES.Mulligan:
      {
        this.killCubit(g, ctx, cubit);
        
        this.drawHand(g, ctx, player);

        g.players[ctx.currentPlayer].actions_left++;

        break;
      }
      default:
        break;
    }
  }

  attachToLocation(g, ctx, cubit) {
    if(cubit.location === LOCATIONS.Board) {
      this.addEvent(g, ctx, 'Attach Location', `Attached ${cubit.name} to board @ (${cubit.position.x}, ${cubit.position.y})`);
    } else if(cubit.location === LOCATIONS.Unit) {
      let unit = g.units.find(_ => _.id === cubit.unit);
      this.addEvent(g, ctx, 'Attach Location', `Attached ${cubit.name} to ${unit.name} @ (${unit.position.x}, ${unit.position.y})`);
    } else if(cubit.location === LOCATIONS.Arena) {
      this.addEvent(g, ctx, 'Attach Location', `Attached ${cubit.name} to arena`);
    } else if(cubit.location === LOCATIONS.Player) {
      let player = cubit.controller === "0" ? "White" : "Black";
      this.addEvent(g, ctx, 'Attach Location', `Attached ${cubit.name} to player (${player})`);
    } else {
      this.addEvent(g, ctx, 'Attach Location', `Attached ${cubit.name}`);
    }

    switch (cubit.type) {
      case CUBIT_TYPES.KingOfHill:
      {
        const die = ctx.random.D4();
        let item = new Cubits.KingsFlagCubit(cubit.ownership);
        item.position = item.data.positions[die];
        cubit.children.push(item.id);
        g.cubits.push(item);
        break;
      }
      case CUBIT_TYPES.DoubleAction:
      {
        g.players[ctx.currentPlayer].actions_left++;
        break;
      }
      case CUBIT_TYPES.Reckless:
      {
        let dice = ctx.random.D4(4);
        let amount = 0;
        for (const _ of dice) { amount += _; }
        cubit.data.amount = amount;
        break;
      }
      case CUBIT_TYPES.RockThrow:
      {
        let positions = this.getAdjacentPositions(g, ctx, cubit.position, true);
        positions = ctx.random.Shuffle(positions);

        let amount = cubit.data.amount ? cubit.data.amount : 0;
        for (let i = 0; i < amount; i++) {
          let position = positions.pop();
          if(position) {
            let item = new Cubits.RockCubit(cubit.ownership);
            item.position = position;
            g.cubits.push(item);
          }
        }

        this.killCubit(g, ctx, cubit);

        break;
      }
      case CUBIT_TYPES.ArenaRock:
      {
        let positions = this.getPositions(g, ctx, false);
        positions = ctx.random.Shuffle(positions);

        let amount = cubit.data.amount ? cubit.data.amount : 0;
        for (let i = 0; i < amount; i++) {
          let position = positions.pop();
          if(position) {
            let item = new Cubits.RockCubit(cubit.ownership);
            item.location = LOCATIONS.Afterlife;
            item.position = position;
            cubit.children.push(item.id);
            g.cubits.push(item);
          }
        }

        break;
      }
      case CUBIT_TYPES.Timebomb:
      {
        let dice = ctx.random.D4();
        cubit.data.amount = dice;
        break;
      }
      default:
        break;
    }
  }

  movePassive(g, ctx, unit, x, y) {
    let _source = clone(unit);

    unit.position = {x,y};

    this.onMove(g, ctx, unit, _source.position);
  }

  moveCapture(g, ctx, source, destination) {
    let _source = clone(source);
    // let _destination = clone(destination);

    let overwritten = {
      updateMove: false,
      killUnit: false,
    }

    for (const id of destination.cubits) {
      let cubit = g.cubits.find(_ => _.id === id);
      switch (cubit.type) {
        case CUBIT_TYPES.BlinkDodge:
        {
          this.killCubit(g, ctx, cubit);

          let positions = this.getAdjacentPositions(g, ctx, destination.position);
          if(positions.length > 0) {
            destination.position = ctx.random.Shuffle(positions)[0];
          }
          
          overwritten.updateMove = true;
          overwritten.killUnit = true;

          break;
        }
        case CUBIT_TYPES.Revert:
        {
          overwritten.updateMove = true;
          overwritten.killUnit = true;
          break;
        }
        case CUBIT_TYPES.Heirloom:
        {
          this.killCubit(g, ctx, cubit);

          for (const id of destination.cubits) {
            let cubit = g.cubits.find(_ => _.id === id);
            cubit.location = LOCATIONS.Bag;
          }

          destination.cubits = [];
          
          break;
        }
        default:
          break;
      }
    }

    for (const id of source.cubits) {
      let cubit = g.cubits.find(_ => _.id === id);
      switch (cubit.type) {
        case CUBIT_TYPES.Looter:
        {
          this.killCubit(g, ctx, cubit);

          if(destination.cubits.length > 0) {
            destination.cubits = ctx.random.Shuffle(destination.cubits);
            let id = destination.cubits.pop();
            let cubit = g.cubtits.find(_ => _.id === id);
            cubit.location = LOCATIONS.Bag;
            this.swapController(cubit);
          }

          break;
        }
        case CUBIT_TYPES.DarkMagic:
        {
          this.killCubit(g, ctx, cubit);

          if(destination.cubits.length > 0) {
            destination.cubits = ctx.random.Shuffle(destination.cubits);
            let id = destination.cubits.pop();
            let cubit = g.cubits.find(_ => _.id === id);
            this.swapController(cubit);
            source.cubits.push(cubit.id);
          }

          break;
        }
        default:
          break;
      }
    }
    
    // Move Source to Destination
    if(overwritten.updateMove === false) {
      source.position.x = destination.position.x;
      source.position.y = destination.position.y;

      this.onMove(g, ctx, source, _source.position);
    }
    
    if(overwritten.killUnit === false) {
      this.killUnit(g, ctx, destination);

      
    }
  }
  
  moveSwap(g, ctx, source, destination) {
    let _source = clone(source);
    let _destination = clone(destination);

    let x = source.position.x;
    let y = source.position.y;

    source.position.x = destination.position.x;
    source.position.y = destination.position.y;

    destination.position.x = x;
    destination.position.y = y;

    this.onMove(g, ctx, source, _source.position);
    this.onMove(g, ctx, destination, _destination.position);
  }

  moveCastle(g, ctx, source, destination) {
    let _source = clone(source);
    let _destination = clone(destination);

    if(destination.file === UNIT_FILE.A) {
      source.position.y = 2;
      destination.position.y = 3;
    } else if(destination.file === UNIT_FILE.H) {
      source.position.y = 6;
      destination.position.y = 5;
    }

    this.onMove(g, ctx, source, _source.position);
    this.onMove(g, ctx, destination, _destination.position);
  }

  resolveCubits(g, ctx) {
    for (const cubit of g.cubits) {
      if(cubit.type === CUBIT_TYPES.CostofPower && cubit.location === LOCATIONS.Player) {
        let bag = g.cubits
          .filter(_ => _.location === LOCATIONS.Bag)
          .filter(_ => _.ownership === ctx.currentPlayer);

        if(bag.length > 0) {
          bag[0].location = LOCATIONS.Afterlife;
        }
      } else if(cubit.type === CUBIT_TYPES.Reckless && cubit.location === LOCATIONS.Player) {
        let p = cubit.controller;
        let o = p === "0" ? "1" : "0";
        let afterlife = g.units
          .filter(_ => _.location === LOCATIONS.Afterlife)
          .filter(_ => _.ownership === o);

        if(afterlife.length > cubit.data.amount) {
          ctx.events.endGame(p);
          return;
        }
      } else if(cubit.type === CUBIT_TYPES.Timebomb && cubit.location === LOCATIONS.Board) {
        cubit.data.amount--;

        if(cubit.data.amount === 0) {
          let positions = this.getAdjacentPositions(g, ctx, cubit.position, false);
          for (const pos of positions) {
            let units = g.units
              .filter(_ => _.location === LOCATIONS.Board)
              .filter(_ => _.position.x === pos.x && _.position.y === pos.y);

            for (const unit of units) {
              this.killUnit(g, ctx, unit);
            }

            let cubits = g.cubits
              .filter(_ => _.location === LOCATIONS.Board)
              .filter(_ => _.position.x === pos.x && _.position.y === pos.y);

            for (const cubit of cubits) {
              this.killCubit(g, ctx, cubit);
            }
          }
        
          this.killCubit(g, ctx, cubit);
        }
      } else if(cubit.type === CUBIT_TYPES.ArenaRock && cubit.location === LOCATIONS.Arena) {
        let positions = this.getPositions(g, ctx, false);
        positions = ctx.random.Shuffle(positions);

        let position = positions.pop();
        if(position) {
          let item = new Cubits.RockCubit(cubit.ownership);
          item.position = position;
          cubit.children.push(item.id);
          g.cubits.push(item);
        }
      }
    }
  }

  resolveTurn(g, ctx) {
    // Reset Action Counter to Activity Count
    g.players[ctx.currentPlayer].actions_used = 0;
    g.players[ctx.currentPlayer].actions_left = this.getActivities(g, ctx, ctx.currentPlayer);
    g.players[ctx.currentPlayer].moves = 1;

    // Increments Turns
    let activeCubits = g.cubits
      .filter(_ => _.location === LOCATIONS.Arena)
      .filter(_ => _.location === LOCATIONS.Board)
      .filter(_ => _.location === LOCATIONS.Unit)
      .filter(_ => _.location === LOCATIONS.Player)
    for (const cubit of activeCubits) {
      cubit.turns++;
    }

    let activeUnits = g.units.filter(_ => _.location === LOCATIONS.Board);
    for (const unit of activeUnits) {
      unit.turns++;
    }

    this.resolveCubits(g, ctx);

    // Handle duration
    for (const cubit of g.cubits) {
      if(cubit.duration && cubit.duration.type === DURATION_TYPES.Turn && cubit.turns >= cubit.duration.amount) {
        this.killCubit(g, ctx, cubit);
      }
    }

    // End turn first and end phase resetting to 'Play'
    ctx.events.endTurn();
    ctx.events.endPhase(GAME_PHASES.Play);
  }

  draw(g, ctx) {
    // if the result is false then there was not enough to draw a new hand
    // ... end the game with the opponent the victory
    let result = this.drawHand(g, ctx, ctx.currentPlayer);
    if(!result) {
      let opponent = ctx.currentPlayer === "0" ? "1" : "0";
      ctx.events.endGame(opponent);
    }
  }

  // EVENTS

  onMove(g, ctx, unit, origin = null) { 
    this.addEvent(g, ctx, 'Moved Unit', `${unit.name} from (${origin.x},${origin.x}) to (${unit.position.x},${unit.position.y})`);

    unit.moves++;

    switch (unit.type) {
      case UNIT_TYPES.Pawn:
      {
        // Remove temporary movement
        unit.movement = unit.movement.filter(_ => _.temporary !== true);
        break;
      }
      case UNIT_TYPES.King:
      {
        // King of Hill
        let kingOfHill = g.cubits.filter(_ => _.type === CUBIT_TYPES.KingOfHill)
          .filter(_ => _.location === LOCATIONS.Board)
          .filter(_ => _.position.x === unit.position.x)
          .filter(_ => _.position.y === unit.position.y);

        if(kingOfHill.length > 0) {
          ctx.events.endGame(unit.ownership);
          return;
        }

        // Remove Castle
        unit.movement = unit.movement.filter(_ => _.temporary !== true);
        break; 
      }
      default:
        break;
    }

    // Trigger Cubits
    let broadCubits = g.cubits.filter(_ => _.location === LOCATIONS.Board);
    for (const cubit of broadCubits) {
      switch (cubit.type) {
        case CUBIT_TYPES.Sacrifice:
        {
          if(cubit.position.x === origin.x && cubit.position.y === origin.y) {
            if(unit.cubits.length > 0) {
              unit.cubits = ctx.random.Shuffle(unit.cubits);
              let id = unit.cubits.pop();
              let c = g.cubits.find(_ => _.id === id);
              this.killCubit(g, ctx, c);
            } else {
              this.killUnit(g, ctx, unit);
              break;
            }
          }
          break;
        }
        default:
          break;
      }
    }

    let unitCubits = g.cubits.filter(_ => _.location === LOCATIONS.Unit).filter(_ => _.unit === unit.id);
    for (const cubit of unitCubits) {
      cubit.moves++;

      if(cubit.duration && cubit.duration.type === DURATION_TYPES.Move && cubit.moves >= cubit.duration.amount) {
        // if(cubit.duration.activation) {}
        this.killCubit(g, ctx, cubit);
      }

      switch (cubit.type) {
        case CUBIT_TYPES.Poisoned:
        {
          if(cubit.moves >= 3) {
            this.killCubit(g, ctx, cubit);
            this.killUnit(g, ctx, unit);
          }
          break;
        }
        default:
          break;
      }
    }

    // Check for Check...
    let moves = getMovements(g, ctx, unit);
    for (const move of moves) {
      if(move.action === MOVEMENT_ACTIONS.Capture) {
        let u = g.units.find(_ => _.id === move.unit);
        if(u.type === UNIT_TYPES.King) {
          g.players[u.ownership].check = true;

          this.onCheck(g, ctx, unit, u);
        }
      }
    }
  }

  onCheck(g, ctx, source, destination) {
    // Do nothing...
  }

  // PROPERTIES

  inCollection(obstructions, x, y) {
    for (const pos of obstructions) {
      if(pos.x === x && pos.y === y) {
        return true;
      }
    }
    return false;
  }

  getPositions(g, ctx, occupied = false) {
    let units = g.units.filter(_ => _.location === LOCATIONS.Board).map(_ => _.position);
    let cubits = g.cubits.filter(_ => _.location === LOCATIONS.Board).filter(_ => _.obstruction === true).map(_ => _.position);
    let obstructions = [].concat(units).concat(cubits);
    let positions = [];

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if(this.inCollection(obstructions, x, y) === occupied) {
          positions.push({x,y});
        }
      }
    }

    return positions;
  }

  getAdjacentPositions(g, ctx, origin, occupied = false) {
    let targets = [
      {x: origin.x-1, y: origin.y-1},
      {x: origin.x, y: origin.y-1},
      {x: origin.x+1, y: origin.y-1},
      {x: origin.x+1, y: origin.y},
      {x: origin.x-1, y: origin.y},
      {x: origin.x-1, y: origin.y+1},
      {x: origin.x, y: origin.y+1},
      {x: origin.x+1, y: origin.y+1},
    ]

    let positions = this.getPositions(g, ctx, occupied);
    let collection = [];
    for (const pos of positions) {
      if(this.inCollection(targets, pos.x, pos.y) === true) {
        collection.push(pos);
      }
    }
    return collection;
  }

  hasCubit(g, ctx, type, location, player = null) {
    let cubits = g.cubits.filter(_ => _.location === location && ( player == null || _.controller === player));
    for (let i = 0; i < cubits.length; i++) {
      if(cubits[i].type === type) {
        return true;
      }
    }
    return false;
  }

  getBagSize(g, ctx, player) {
    return g.cubits.filter(_ => _.location === LOCATIONS.Bag && _.controller === player).length;
  }

  getDraws(g, ctx, player) {
    let draws = g.players[player].hand;

    if(this.hasCubit(g, ctx, CUBIT_TYPES.DrawPlusOne, LOCATIONS.Player, player)) {
      draws++;
    }
    if(this.hasCubit(g, ctx, CUBIT_TYPES.CostofPower, LOCATIONS.Player)) {
      draws++;
    }
    if(this.hasCubit(g, ctx, CUBIT_TYPES.DrawNegOne, LOCATIONS.Player, player)) {
      draws--;
    }

    return draws;
  }

  getHandSize(g, ctx, player) {
    return g.cubits.filter(_ => _.location === LOCATIONS.Hand && _.controller === player).length;
  }

  getActivities(g, ctx, player) {
    let actions = Math.min(Math.floor((ctx.turn / 10)) + 1, 5);

    if(this.hasCubit(g, ctx, CUBIT_TYPES.DoubleAction, LOCATIONS.Player, player)) {
      actions++;
    }

    return actions;
  }

  getActions(g, ctx, player) {
    return g.players[player].actions_left;
  }

  canActivate(g, ctx, player, obj) {
    let actions = this.getActions(g, ctx, player);
    if(obj.activation === true && actions > 0) {
      return true;
    } else {
      return false;
    }
  }

  getMoves(g, ctx, player) {
    return g.players[player].moves;
  }

  getAfterlifeUnits(g, ctx, player = null) {
    let units = g.units.filter(_ => _.location === LOCATIONS.Afterlife && (player == null ||  _.ownership === player));
    return units.length;
  }

  getAfterlifeCubits(g, ctx, player = null) {
    let cubits = g.cubits.filter(_ => _.location === LOCATIONS.Afterlife && (player == null ||  _.ownership === player));
    return cubits.length;
  }
}