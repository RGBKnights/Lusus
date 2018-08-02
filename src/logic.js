export class Logic {
  getCubits() {
    return {
      // Hidden
      '0': { name: "Hidden", types: [0], rarity: 0 },
      // Movement
      '1000': { name: "Pawn", types: [1], rarity: 0 },
      '1001': { name: "Rook", types: [1], rarity: 0 },
      '1002': { name: "Knight", types: [1], rarity: 0 },
      '1003': { name: "Bishop", types: [1], rarity: 0 },
      '1004': { name: "King", types: [1], rarity: 0 },
      '1005': { name: "Queen", types: [1], rarity: 0 },
      '1006': { name: "Swap", types: [1], rarity: 0 },
      '1007': { name: "Hit & Run", types: [1], rarity: 0 },
      // POPs - Enchantments
      '2000': { name: "Draw -1", types: [2], rarity: 0 },
      '2001': { name: "Draw +1", types: [2], rarity: 0 },
      '2002': { name: "Knowledge", types: [2], rarity: 0 },
      // POUs - Equipment
      '3000': { name: "Guard", types: [3], rarity: 0},
      '3001': { name: "Condemn", types: [3], rarity: 0 },
      // Space - Board
      '4000': { name: "Immune", types: [3], rarity: 0 },
      '4001': { name: "Sacrifice", types: [3], rarity: 0 },
      // Arena - Global
      '5000': { name: "King of Hill", types: [4], rarity: 0 },
    };
  }

  getCubitix() {
    const collection = this.getCubits();
    return Object.keys(collection);
  }

  setup(ctx) {
    const collection = this.getCubitix();

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
      arena: [],
      players: {
        '0': {
          draw: 3,
          actions: 1,
          reinforcements: [],
          bag: bags[0],
          hand: hands[0],
          exile: [],
          afterlife: [],
          slots: [],
          units: [
            { type: 'R', color: '#FF5733', x: 0, y: 0, limit: 4, slots: [] },
            { type: 'N', color: '#F9FF33', x: 0, y: 1, limit: 3, slots: [] },
            { type: 'B', color: '#008000', x: 0, y: 2, limit: 3, slots: [] },
            { type: 'Q', color: '#33FFA8', x: 0, y: 3, limit: 2, slots: [] },
            { type: 'K', color: '#33F6FF', x: 0, y: 4, limit: 1, slots: [] },
            { type: 'B', color: '#3346FF', x: 0, y: 5, limit: 3, slots: [] },
            { type: 'N', color: '#800080', x: 0, y: 6, limit: 3, slots: [] },
            { type: 'R', color: '#FF0000', x: 0, y: 7, limit: 4, slots: [] },
            { type: 'P', color: '#FF5733', x: 1, y: 0, limit: 2, slots: [] },
            { type: 'P', color: '#F9FF33', x: 1, y: 1, limit: 2, slots: [] },
            { type: 'P', color: '#008000', x: 1, y: 2, limit: 2, slots: [] },
            { type: 'P', color: '#33FFA8', x: 1, y: 3, limit: 2, slots: [] },
            { type: 'P', color: '#33F6FF', x: 1, y: 4, limit: 2, slots: [] },
            { type: 'P', color: '#3346FF', x: 1, y: 5, limit: 2, slots: [] },
            { type: 'P', color: '#800080', x: 1, y: 6, limit: 2, slots: [] },
            { type: 'P', color: '#FF0000', x: 1, y: 7, limit: 2, slots: [] }
          ]
        },
        '1': {
          draw: 3,
          actions: 1,
          reinforcements: [],
          bag: bags[1],
          hand: hands[1],
          exile: [],
          afterlife: [],
          slots: [],
          units: [
            { type: 'R', color: '#FF5733', x: 7, y: 0, limit: 4, slots: [] },
            { type: 'N', color: '#F9FF33', x: 7, y: 1, limit: 3, slots: [] },
            { type: 'B', color: '#008000', x: 7, y: 2, limit: 3, slots: [] },
            { type: 'Q', color: '#33FFA8', x: 7, y: 3, limit: 2, slots: [] },
            { type: 'K', color: '#33F6FF', x: 7, y: 4, limit: 1, slots: [] },
            { type: 'B', color: '#3346FF', x: 7, y: 5, limit: 3, slots: [] },
            { type: 'N', color: '#800080', x: 7, y: 6, limit: 3, slots: [] },
            { type: 'R', color: '#FF0000', x: 7, y: 7, limit: 4, slots: [] },
            { type: 'P', color: '#FF5733', x: 6, y: 0, limit: 2, slots: [] },
            { type: 'P', color: '#F9FF33', x: 6, y: 1, limit: 2, slots: [] },
            { type: 'P', color: '#008000', x: 6, y: 2, limit: 2, slots: [] },
            { type: 'P', color: '#33FFA8', x: 6, y: 3, limit: 2, slots: [] },
            { type: 'P', color: '#33F6FF', x: 6, y: 4, limit: 2, slots: [] },
            { type: 'P', color: '#3346FF', x: 6, y: 5, limit: 2, slots: [] },
            { type: 'P', color: '#800080', x: 6, y: 6, limit: 2, slots: [] },
            { type: 'P', color: '#FF0000', x: 6, y: 7, limit: 2, slots: [] }
          ]
        }
      }
    };
  }

}