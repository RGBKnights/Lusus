
export class Logic {
  getCubits() {
    return [
      // Hidden
      '1000',
      // Movement
      '1001',
      '1002',
      '1003',
      '1004',
      '1005',
      '1006',
      '1007',
      '1008',
      '1009',
      // Special
      '1010',
      '1011',
      '1012',
      '1013',
      '1014',
      '1015',
      '1016',
      '1017',
      '1018',
      '1019',
      '1020',
      '1021',
      '1022',
      '1023',
      '1024',
      '1025',
      '1026',
      '1027',
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
      secret: {},
      limits: {
        '0': {
          bag: bags[0].length,
          draw: hands[0].length,
          play: 1
        },
        '1': {
          bag: bags[1].length,
          draw: hands[1].length,
          play: 1
        }
      },
      field: {
        '0': [
          { type: 'R', x: 0, y: 0, limit: 3, slots: [] },
          { type: 'N', x: 0, y: 1, limit: 3, slots: [] },
          { type: 'B', x: 0, y: 2, limit: 3, slots: [] },
          { type: 'Q', x: 0, y: 3, limit: 2, slots: [] },
          { type: 'K', x: 0, y: 4, limit: 4, slots: [] },
          { type: 'B', x: 0, y: 5, limit: 3, slots: [] },
          { type: 'N', x: 0, y: 6, limit: 3, slots: [] },
          { type: 'R', x: 0, y: 7, limit: 3, slots: [] },
          { type: 'P', x: 1, y: 0, limit: 2, slots: [] },
          { type: 'P', x: 1, y: 1, limit: 2, slots: [] },
          { type: 'P', x: 1, y: 2, limit: 2, slots: [] },
          { type: 'P', x: 1, y: 3, limit: 2, slots: [] },
          { type: 'P', x: 1, y: 4, limit: 2, slots: [] },
          { type: 'P', x: 1, y: 5, limit: 2, slots: [] },
          { type: 'P', x: 1, y: 6, limit: 2, slots: [] },
          { type: 'P', x: 1, y: 7, limit: 2, slots: [] }
        ],
        '1': [
          { type: 'R', x: 7, y: 0, limit: 3, slots: [] },
          { type: 'N', x: 7, y: 1, limit: 3, slots: [] },
          { type: 'B', x: 7, y: 2, limit: 3, slots: [] },
          { type: 'Q', x: 7, y: 3, limit: 2, slots: [] },
          { type: 'K', x: 7, y: 4, limit: 4, slots: [] },
          { type: 'B', x: 7, y: 5, limit: 3, slots: [] },
          { type: 'N', x: 7, y: 6, limit: 3, slots: [] },
          { type: 'R', x: 7, y: 7, limit: 3, slots: [] },
          { type: 'P', x: 6, y: 0, limit: 2, slots: [] },
          { type: 'P', x: 6, y: 1, limit: 2, slots: [] },
          { type: 'P', x: 6, y: 2, limit: 2, slots: [] },
          { type: 'P', x: 6, y: 3, limit: 2, slots: [] },
          { type: 'P', x: 6, y: 4, limit: 2, slots: [] },
          { type: 'P', x: 6, y: 5, limit: 2, slots: [] },
          { type: 'P', x: 6, y: 6, limit: 2, slots: [] },
          { type: 'P', x: 6, y: 7, limit: 2, slots: [] }
        ]
      },
      graveyard: {
        '0': [],
        '1': [],
      },
      exile: {
        '0': [],
        '1': [],
      },
      players: {
        '0': {
          reinforcements: [],
          bag: bags[0],
          hand: hands[0]
        },
        '1': {
          reinforcements: [],
          bag: bags[1],
          hand: hands[1]
        }
      }
    };
  }

}