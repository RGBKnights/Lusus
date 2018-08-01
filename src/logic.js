
export class Logic {
  getCubits() {
    return [
      // Hidden
      '1000',
      // Movement
      '1001', // Pawn
      '1002', // Rook
      '1003', // Knight
      '1004', // Bishop
      '1005', // King
      '1006', // Queen
      '1007', // Swap
      '1008', // R&B
      '1009', // Sidestep
      // Special - Movement
      '1014', // Sticky Feet
      '1015', // Disarm
      '1016', // Enrage
      '1017', // Phase
      '1019', // Spring
      '1021', // Wrap
      '1022', // Ghost
      '1023', // Immobilized
      '1024', // Hit & Run
      '1026', // Boulder dash
      // Special - Action
      '1010', // Immune
      '1011', // Guard
      '1012', // Draw -1
      '1013', // Draw +1
      '1018', // Double Action
      '1020', // Condemn
      '1025', // Knowledge     
      '1027', // Thief
    ];
  }

  setup(ctx) {
    const collection = this.getCubits();

    // Populate bags with Cubits
    let bags = [
      ctx.random.Shuffle([...collection]),
      ctx.random.Shuffle([...collection])
    ];

    // Populate hands form bags
    let hands = [[],[]];
    for (let i = 0; i < bags.length; i++) {
      for (let x = 0; x < 3; x++) {
        hands[i].push(bags[i].pop());
      }
    }

    return {
      players: {
        '0': {
          draw: 3,
          actions: 1,
          reinforcements: [],
          bag: bags[0],
          hand: hands[0],
          graveyard: [],
          exile: [],
          units: [
            { type: 'R', x: 0, y: 0, limit: 4, slots: [] },
            { type: 'N', x: 0, y: 1, limit: 3, slots: [] },
            { type: 'B', x: 0, y: 2, limit: 3, slots: [] },
            { type: 'Q', x: 0, y: 3, limit: 2, slots: [] },
            { type: 'K', x: 0, y: 4, limit: 1, slots: [] },
            { type: 'B', x: 0, y: 5, limit: 3, slots: [] },
            { type: 'N', x: 0, y: 6, limit: 3, slots: [] },
            { type: 'R', x: 0, y: 7, limit: 4, slots: [] },
            { type: 'P', x: 1, y: 0, limit: 2, slots: [] },
            { type: 'P', x: 1, y: 1, limit: 2, slots: [] },
            { type: 'P', x: 1, y: 2, limit: 2, slots: [] },
            { type: 'P', x: 1, y: 3, limit: 2, slots: [] },
            { type: 'P', x: 1, y: 4, limit: 2, slots: [] },
            { type: 'P', x: 1, y: 5, limit: 2, slots: [] },
            { type: 'P', x: 1, y: 6, limit: 2, slots: [] },
            { type: 'P', x: 1, y: 7, limit: 2, slots: [] }
          ]
        },
        '1': {
          draw: 3,
          actions: 1,
          reinforcements: [],
          bag: bags[1],
          hand: hands[1],
          graveyard: [],
          exile: [],
          units: [
            { type: 'R', x: 7, y: 0, limit: 4, slots: [] },
            { type: 'N', x: 7, y: 1, limit: 3, slots: [] },
            { type: 'B', x: 7, y: 2, limit: 3, slots: [] },
            { type: 'Q', x: 7, y: 3, limit: 2, slots: [] },
            { type: 'K', x: 7, y: 4, limit: 1, slots: [] },
            { type: 'B', x: 7, y: 5, limit: 3, slots: [] },
            { type: 'N', x: 7, y: 6, limit: 3, slots: [] },
            { type: 'R', x: 7, y: 7, limit: 4, slots: [] },
            { type: 'P', x: 6, y: 0, limit: 2, slots: [] },
            { type: 'P', x: 6, y: 1, limit: 2, slots: [] },
            { type: 'P', x: 6, y: 2, limit: 2, slots: [] },
            { type: 'P', x: 6, y: 3, limit: 2, slots: [] },
            { type: 'P', x: 6, y: 4, limit: 2, slots: [] },
            { type: 'P', x: 6, y: 5, limit: 2, slots: [] },
            { type: 'P', x: 6, y: 6, limit: 2, slots: [] },
            { type: 'P', x: 6, y: 7, limit: 2, slots: [] }
          ]
        }
      }
    };
  }

}