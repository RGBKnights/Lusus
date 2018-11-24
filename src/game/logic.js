import { INVALID_MOVE } from 'boardgame.io/core';
import { SPACE_TYPES } from './common';
// import { getStartingUnits } from './units';

const uuidv4 = require('uuid/v4');

export class GameLogic {

  static setup(ctx) {
    let data = {
      next: uuidv4(),
      board: [],
      afterlife: [],
      players: {}
    };

    // Board
    let size = 7;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        data.board.push({ position: {x,y}, type: SPACE_TYPES.Normal });
      }
    }

    // Players
    for (let i = 0; i < ctx.numPlayers; i++) {
      let p = i.toString();
      data.players[p] = {
        bag: [],
        hand: [],
        actions: 1,
        moves: 1,
      };
    }
    return data;
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

  static draw(G, ctx) {
    G.players[ctx.currentPlayer].actions = 1;
    G.players[ctx.currentPlayer].moves = 1;
    ctx.events.endTurn();
    ctx.events.endPhase();
  }
}