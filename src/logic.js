
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
      field: {
        '0': [
          { type: 'R', x: 0, y: 7, slots: [] },
          { type: 'N', x: 0, y: 7, slots: [] },
          { type: 'B', x: 0, y: 7, slots: [] },
          { type: 'Q', x: 0, y: 7, slots: [] },
          { type: 'K', x: 0, y: 7, slots: ['1010'] },
          { type: 'B', x: 0, y: 7, slots: [] },
          { type: 'N', x: 0, y: 7, slots: [] },
          { type: 'R', x: 0, y: 7, slots: [] },
          { type: 'P', x: 0, y: 6, slots: [] },
          { type: 'P', x: 0, y: 6, slots: [] },
          { type: 'P', x: 0, y: 6, slots: [] },
          { type: 'P', x: 0, y: 6, slots: [] },
          { type: 'P', x: 0, y: 6, slots: [] },
          { type: 'P', x: 0, y: 6, slots: [] },
          { type: 'P', x: 0, y: 6, slots: [] },
          { type: 'P', x: 0, y: 6, slots: [] }
        ],
        '1': [
          { type: 'R', x: 0, y: 0, slots: [] },
          { type: 'N', x: 1, y: 0, slots: [] },
          { type: 'B', x: 2, y: 0, slots: [] },
          { type: 'Q', x: 3, y: 0, slots: [] },
          { type: 'K', x: 4, y: 0, slots: ['1010'] },
          { type: 'B', x: 5, y: 0, slots: [] },
          { type: 'N', x: 6, y: 0, slots: [] },
          { type: 'R', x: 7, y: 0, slots: [] },
          { type: 'P', x: 0, y: 1, slots: [] },
          { type: 'P', x: 1, y: 1, slots: [] },
          { type: 'P', x: 2, y: 1, slots: [] },
          { type: 'P', x: 3, y: 1, slots: [] },
          { type: 'P', x: 4, y: 1, slots: [] },
          { type: 'P', x: 5, y: 1, slots: [] },
          { type: 'P', x: 6, y: 1, slots: [] },
          { type: 'P', x: 7, y: 1, slots: [] }
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
          hand: hands[0],
          limits: {
            hand: 3,
            play: 1
          }
        },
        '1': {
          reinforcements: [],
          bag: bags[1],
          hand: hands[1],
          limits: {
            hand: 3,
            play: 1
          }
        }
      }
    };
  }

}