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
      rules: {},
      field: [],
      board: [],
      afterlife: [],
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

  static getDefaultSetup(G, ctx) {
    let data = {
      board: [],
      field: [
        // Black - PLayer 1
        { type: 'R', ownership: '1', identifier: '#FF5733', position: {x:0, y:0} },
        { type: 'N', ownership: '1', identifier: '#F9FF33', position: {x:1, y:0} },
        { type: 'B', ownership: '1', identifier: '#008000', position: {x:2, y:0} },
        { type: 'Q', ownership: '1', identifier: '#33FFA8', position: {x:3, y:0} },
        { type: 'K', ownership: '1', identifier: '#33F6FF', position: {x:4, y:0} },
        { type: 'B', ownership: '1', identifier: '#3346FF', position: {x:5, y:0} },
        { type: 'N', ownership: '1', identifier: '#800080', position: {x:6, y:0} },
        { type: 'R', ownership: '1', identifier: '#FF0000', position: {x:7, y:0} },
        { type: 'P', ownership: '1', identifier: '#FF5733', position: {x:0, y:1} },
        { type: 'P', ownership: '1', identifier: '#F9FF33', position: {x:1, y:1} },
        { type: 'P', ownership: '1', identifier: '#008000', position: {x:2, y:1} },
        { type: 'P', ownership: '1', identifier: '#33FFA8', position: {x:3, y:1} },
        { type: 'P', ownership: '1', identifier: '#33F6FF', position: {x:4, y:1} },
        { type: 'P', ownership: '1', identifier: '#3346FF', position: {x:5, y:1} },
        { type: 'P', ownership: '1', identifier: '#800080', position: {x:6, y:1} },
        { type: 'P', ownership: '1', identifier: '#FF0000', position: {x:7, y:1} },
        // White - Player 0
        { type: 'P', ownership: '0', identifier: '#FF5733', position: {x:0, y:6} },
        { type: 'P', ownership: '0', identifier: '#F9FF33', position: {x:1, y:6} },
        { type: 'P', ownership: '0', identifier: '#008000', position: {x:2, y:6} },
        { type: 'P', ownership: '0', identifier: '#33FFA8', position: {x:3, y:6} },
        { type: 'P', ownership: '0', identifier: '#33F6FF', position: {x:4, y:6} },
        { type: 'P', ownership: '0', identifier: '#3346FF', position: {x:5, y:6} },
        { type: 'P', ownership: '0', identifier: '#800080', position: {x:6, y:6} },
        { type: 'P', ownership: '0', identifier: '#FF0000', position: {x:7, y:6} },
        { type: 'R', ownership: '0', identifier: '#FF5733', position: {x:0, y:7} },
        { type: 'N', ownership: '0', identifier: '#F9FF33', position: {x:1, y:7} },
        { type: 'B', ownership: '0', identifier: '#008000', position: {x:2, y:7} },
        { type: 'Q', ownership: '0', identifier: '#33FFA8', position: {x:3, y:7} },
        { type: 'K', ownership: '0', identifier: '#33F6FF', position: {x:4, y:7} },
        { type: 'B', ownership: '0', identifier: '#3346FF', position: {x:5, y:7} },
        { type: 'N', ownership: '0', identifier: '#800080', position: {x:6, y:7} },
        { type: 'R', ownership: '0', identifier: '#FF0000', position: {x:7, y:7} },
      ],
      deck: [
        { type: 0, amount: 1 },
      ],
      rules: {
        passPlay: true,
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
    var config = { ...data, ...defaults };

    // Override the rules
    G.rules = config.rules;

    // Board
    for (const data of config.board) {
      let tile = new Tile(data.type, data.position);
      G.board.push(tile);
    }

    // Field
    for (const item of config.field) {
      let unit = new Unit(item.type, item.ownership, item.identifier, item.position);
      G.field.push(unit);
    }

    // Bag
    for (let i = 0; i < ctx.numPlayers; i++) {
      let p = i.toString();
      let player = G.players[p];

      for (const item of config.deck) {
        for (let a = 0; a < item.amount; a++) {
          let cubit = new Cubit(item.type, p);
          player.bag.push(cubit);
        }
      }
    }

    // Hand
    for (let i = 0; i < ctx.numPlayers; i++) {
      let p = i.toString();
      let player = G.players[p];
      let bag = ctx.random.Shuffle(player.bag);

      for (let a = 0; a < player.draws; a++) {
        let cubit = bag.pop();
        player.hand.push(cubit);
      }
    }

    ctx.events.endPhase();
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