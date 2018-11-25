import { INVALID_MOVE } from 'boardgame.io/core';
import { SPACE_TYPES } from './common';

const shortid = require('shortid');

export class Tile {
  constructor(t, p) {
    this.id = shortid.generate();
    this.type = t;
    this.position = p;
  }
}

export class Unit {
  constructor(t, o, i, p) {
    this.id = shortid.generate();
    this.type = t;
    this.ownership = o;
    this.identifier = i;
    this.position = p;
  }
}

export class Cubit {
  constructor(t, o) {
    this.id = shortid.generate();
    this.type = t;
    this.ownership = o;
  }
}

export class GameLogic {

  static setup(ctx) {
    let data = {
      next: shortid.generate(),
      field: [],
      board: [],
      afterlife: [],
      players: {}
    };

    for (let p = 0; p < ctx.numPlayers; p++) {
      data.players[p] = {
        bag: [],
        hand: [],
        actions: 1,
        moves: 1,
      };
    }
    return data;
  }

  static config(G, ctx, data) {
    let defaults = {
      size: 7,
      field: [],
      deck: [],
    };
    var config = { ...data, ...defaults };

    // Board
    for (let x = 0; x < config.size ; x++) {
      for (let y = 0; y < config.size ; y++) {
        let tile = new Tile(SPACE_TYPES.Normal, {x,y});
        G.board.push(tile);
      }
    }

    // Field
    for (const data of config.field) {
      let unit = new Unit(data.type, data.ownership, data.identifier, data.position);
      G.field.push(unit);
    }
    
    // Bag
    for (const data of config.deck) {
      for (let p = 0; p < ctx.numPlayers; p++) {
        for (let i = 0; i < data.amount; i++) {
          let cubit = new Cubit(data.type, p);
          G.players[p].bag.push(cubit);
        }
      }
    }

    // Hand

  }

  static skip(G, ctx) {
    return INVALID_MOVE;
    // G.players[ctx.currentPlayer].actions = 0;
  }

  static play(G, ctx) {
    G.players[ctx.currentPlayer].actions--;
  }

  static moves(G, ctx) {
    G.players[ctx.currentPlayer].moves--;
  }

  static resolution(G, ctx) {
    G.players[ctx.currentPlayer].actions = 1;
    G.players[ctx.currentPlayer].moves = 1;
    ctx.events.endTurn();
    ctx.events.endPhase();
  }

  static hasNoActions(G, ctx)  {
    return G.players[ctx.currentPlayer].actions === 0;
  }

  static hasNoMoves(G, ctx)  {
    return G.players[ctx.currentPlayer].moves === 0;
  }

  
}