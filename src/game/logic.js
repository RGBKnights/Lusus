import { INVALID_MOVE } from 'boardgame.io/core';
import { SPACE_TYPES, UNITS, CUBITS } from './common';

const shortid = require('shortid');

export class Tile {
  constructor(t, p) {
    this.id = shortid.generate();
    this.type = t;
    this.position = p;
  }
}

export class Unit {
  constructor(t, o, p, l) {
    this.id = shortid.generate();
    this.type = t;
    this.ownership = o;
    this.position = p;
    this.layout = l;
    this.slots = 3;
    this.cubits = [];
    this.moves = 0;
  }
}

export class Cubit {
  constructor(t, o) {
    this.id = shortid.generate();
    this.type = t;
    this.ownership = o;
    this.moves = 0;
  }
}

export class GameLogic {

  static setup(ctx) {
    let data = {
      next: shortid.generate(),
      rules: {},
      log: [],
      field: [],
      board: [],
      players: {}
    };

    for (let i = 0; i < ctx.numPlayers; i++) {
      let p = i.toString();
      data.players[p] = {
        bag: [],
        hand: [],
        draws: 3,
        actions: 1,
        moves: 1,
      };
    }
    
    return data;
  }

  static getDefaultSetup() {
    let data = {
      name: 'Default',
      board: [],
      field: [
        // Black - PLayer 1
        { type: UNITS.Rook,   ownership: '1', position: {x:0, y:0}, layout: { f:0, r:1 } },
        { type: UNITS.Knight, ownership: '1', position: {x:1, y:0}, layout: { f:1, r:1 } },
        { type: UNITS.Bishop, ownership: '1', position: {x:2, y:0}, layout: { f:2, r:1 } },
        { type: UNITS.Queen,  ownership: '1', position: {x:3, y:0}, layout: { f:3, r:1 } },
        { type: UNITS.King,   ownership: '1', position: {x:4, y:0}, layout: { f:4, r:1 } },
        { type: UNITS.Bishop, ownership: '1', position: {x:5, y:0}, layout: { f:5, r:1 } },
        { type: UNITS.Knight, ownership: '1', position: {x:6, y:0}, layout: { f:6, r:1 } },
        { type: UNITS.Rook,   ownership: '1', position: {x:7, y:0}, layout: { f:7, r:1 } },
        { type: UNITS.Pawn, ownership: '1', position: {x:0, y:1}, layout: { f:0, r:0 } },
        { type: UNITS.Pawn, ownership: '1', position: {x:1, y:1}, layout: { f:1, r:0 } },
        { type: UNITS.Pawn, ownership: '1', position: {x:2, y:1}, layout: { f:2, r:0 } },
        { type: UNITS.Pawn, ownership: '1', position: {x:3, y:1}, layout: { f:3, r:0 } },
        { type: UNITS.Pawn, ownership: '1', position: {x:4, y:1}, layout: { f:4, r:0 } },
        { type: UNITS.Pawn, ownership: '1', position: {x:5, y:1}, layout: { f:5, r:0 } },
        { type: UNITS.Pawn, ownership: '1', position: {x:6, y:1}, layout: { f:6, r:0 } },
        { type: UNITS.Pawn, ownership: '1', position: {x:7, y:1}, layout: { f:7, r:0 } },
        // White - ownership 0
        { type: UNITS.Pawn, ownership: '0', position: {x:0, y:6}, layout: { f:0, r:0 } },
        { type: UNITS.Pawn, ownership: '0', position: {x:1, y:6}, layout: { f:1, r:0 } },
        { type: UNITS.Pawn, ownership: '0', position: {x:2, y:6}, layout: { f:2, r:0 } },
        { type: UNITS.Pawn, ownership: '0', position: {x:3, y:6}, layout: { f:3, r:0 } },
        { type: UNITS.Pawn, ownership: '0', position: {x:4, y:6}, layout: { f:4, r:0 } },
        { type: UNITS.Pawn, ownership: '0', position: {x:5, y:6}, layout: { f:5, r:0 } },
        { type: UNITS.Pawn, ownership: '0', position: {x:6, y:6}, layout: { f:6, r:0 } },
        { type: UNITS.Pawn, ownership: '0', position: {x:7, y:6}, layout: { f:7, r:0 } },
        { type: UNITS.Rook,   ownership: '0', position: {x:0, y:7}, layout: { f:0, r:1 } },
        { type: UNITS.Knight, ownership: '0', position: {x:1, y:7}, layout: { f:1, r:1 } },
        { type: UNITS.Bishop, ownership: '0', position: {x:2, y:7}, layout: { f:2, r:1 } },
        { type: UNITS.Queen,  ownership: '0', position: {x:3, y:7}, layout: { f:3, r:1 } },
        { type: UNITS.King,   ownership: '0', position: {x:4, y:7}, layout: { f:4, r:1 } },
        { type: UNITS.Bishop, ownership: '0', position: {x:5, y:7}, layout: { f:5, r:1 } },
        { type: UNITS.Knight, ownership: '0', position: {x:6, y:7}, layout: { f:6, r:1 } },
        { type: UNITS.Rook,   ownership: '0', position: {x:7, y:7}, layout: { f:7, r:1 } },
      ],
      deck: [
        { type: CUBITS.Orthogonal, amount: 1 },
        { type: CUBITS.Diagonal, amount: 1 },
        { type: CUBITS.Cardinal, amount: 1 },
        // { type: CUBITS.SideStep, amount: 1 },
        // { type: CUBITS.Swap, amount: 1 },
        // { type: CUBITS.Jump, amount: 1 },
        // { type: CUBITS.Enrage, amount: 1 },
        // { type: CUBITS.Passify, amount: 1 },
        // { type: CUBITS.Encumber, amount: 5 },
        // { type: CUBITS.StickyFeet, amount: 5 },
        // { type: CUBITS.Condemn, amount: 1 },
        // { type: CUBITS.Immunity, amount: 1 },
        // { type: CUBITS.Poisoned, amount: 1 },
        // { type: CUBITS.Bleed, amount: 1 },
        { type: CUBITS.Looter, amount: 5 },
      ],
      rules: {
        passPlay: false,
        passMove: false,
        freePass: false,
        freeDraw: false,
      },
    };

    let size = 7;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        data.board.push({ type: SPACE_TYPES.Normal, position: {x,y} });
      }
    }

    return data;
  }

  static config(G, ctx, data) {
    let defaults = GameLogic.getDefaultSetup();
    var config = { ...defaults, ...data };

    // Override the rules
    G.rules = config.rules;

    // Board
    for (const data of config.board) {
      let tile = new Tile(data.type, data.position);
      G.board.push(tile);
    }

    // Field
    for (const item of config.field) {
      let unit = new Unit(item.type, item.ownership, item.position, item.layout);
      G.field.push(unit);
    }

    // Bag
    for (let i = 0; i < ctx.numPlayers; i++) {
      let p = i.toString();
      for (const item of config.deck) {
        for (let a = 0; a < item.amount; a++) {
          let cubit = new Cubit(item.type, p);
          G.players[p].bag.push(cubit);
        }
      }
    }

    // Hand
    for (let i = 0; i < ctx.numPlayers; i++) {
      let p = i.toString();
      G.players[p].bag = ctx.random.Shuffle(G.players[p].bag);
      for (let a = 0; a < G.players[p].draws; a++) {
        let cubit = G.players[p].bag.pop();
        G.players[p].hand.push(cubit);
      }
    }

    // G.log.push();

    ctx.events.endPhase();
  }

  static skip(G, ctx) {
    if(G.rules.freePass === false) {
      let length = G.players[ctx.currentPlayer].hand.length;
      if(length === 0) {
        return INVALID_MOVE;
      } else {
        let index = ctx.random.Die(length) - 1;
        GameLogic.hand(G, ctx, index);
      }
    }

    if(ctx.phase === 'play') {
      G.players[ctx.currentPlayer].actions = 0;
    } else if(ctx.phase === 'move') {
      G.players[ctx.currentPlayer].moves = 0;
    }

    // G.log.push();
  }

  static placement(G, ctx, source, destination) {
    // Get source from hand
    let s = GameLogic.hand(G, ctx, source.slot);
    
    //  Move it to unit slot
    let d = G.field.find(_ => _.id === destination.unit.id);
    d.cubits[destination.slot] = s;

    // Update state counters
    G.players[ctx.currentPlayer].actions--;

    // G.log.push();
  }

  static movement(G, ctx, source, destination) {
    // Move source
    let s = G.field.find(_ => _.id === source.unit.id);
    s.position.x = destination.position.x;
    s.position.y = destination.position.y;

    let hasLooter = false;
    let isPoisonLeathal = false;
    let isBleeding = false;

    s.moves++;
    for (const cubit of s.cubits) {
      cubit.moves++;

      if(cubit.type === CUBITS.Poisoned && cubit.moves > 2) {
        isPoisonLeathal = true;
      }
      if(cubit.type === CUBITS.Bleed) {
        isBleeding = true;
      }
      if(cubit.type === CUBITS.Looter) {
        hasLooter = true;
      }
    }

    // Capture / Swap destination
    if(destination.unit) {
      let d = G.field.find(_ => _.id === destination.unit.id);
      if(s.ownership === d.ownership) {
        d.position.x = source.position.x;
        d.position.y = source.position.y;
      } else {
        d.position = null;
      }

      if(hasLooter) {
        let index = ctx.random.Die(d.cubits.length) - 1;
        let cubit = d.cubits.splice(index, 0);
        if(cubit) {
          G.players[ctx.currentPlayer].bag.push(cubit);
        }
      }
    }

    if(isPoisonLeathal) {
      s.position = null;
    }
   
    if(isBleeding) {
      if(s.cubits.length === 1) {
        s.position = null;
      } else {
        let index = ctx.random.Die(s.cubits.length) - 1;
        s.cubits.splice(index, 0);
      }
    }

    // Update state counters
    G.players[ctx.currentPlayer].moves--;

    // G.log.push();
  }

  static resolution(G, ctx) {
    // Update #s from cubits 
    G.players[ctx.currentPlayer].actions = 1;
    G.players[ctx.currentPlayer].moves = 1;
    G.players[ctx.currentPlayer].draws = 3;

    GameLogic.draw(G, ctx);

    ctx.events.endTurn();
    ctx.events.endPhase();
  }

  static draw(G, ctx) {
    while(G.players[ctx.currentPlayer].hand.length > 0) {
      let cubit = G.players[ctx.currentPlayer].hand.pop();
      G.players[ctx.currentPlayer].bag.push(cubit);
    }

    if(G.players[ctx.currentPlayer].draws > G.players[ctx.currentPlayer].bag.length && G.rules.freeDraw === false) {
      let opponent = ctx.currentPlayer === "0" ? "1" : "0";
      ctx.events.endGame(opponent);
      return;
    }

    G.players[ctx.currentPlayer].bag = ctx.random.Shuffle(G.players[ctx.currentPlayer].bag);
    for (let i = 0; i < G.players[ctx.currentPlayer].draws; i++) {
      let cubit = G.players[ctx.currentPlayer].bag.pop();
      G.players[ctx.currentPlayer].hand.push(cubit);
    }

    // G.log.push();
  }

  static hand(G, ctx, slot) {
    let cubit = G.players[ctx.currentPlayer].hand[slot];
    if(cubit) {
      let delta = G.players[ctx.currentPlayer].hand.filter(_ => _.id !== cubit.id);
      G.players[ctx.currentPlayer].hand = delta;
      return cubit;

      // G.log.push();
    } else {
      return undefined;
    }
  }

  static isEndOfPlacement(G, ctx)  {
    if(G.rules.passPlay && G.rules.freePass) {
      return false;
    } else {
      return G.players[ctx.currentPlayer].actions === 0;  
    }
  }

  static isEndOfMovement(G, ctx)  {
    if(G.rules.passMove && G.rules.freePass) {
      return false;
    } else {
      return G.players[ctx.currentPlayer].moves === 0;
    }
  }
}