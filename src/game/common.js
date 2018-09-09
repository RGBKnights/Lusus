const uuidv4 = require('uuid/v4');

export const UNIT_TYPES = {
    Unknown: '',
    King: '0f94f609-f9bf-4006-a5ff-aa2cd6070e43',
    Queen: '13c91e23-2ae0-41c7-a054-6d0165af76bb',
    Bishop: 'd0952339-98a0-4730-b774-79730dcce86f',
    Rook: '321a0734-862a-4507-bff2-6e656ab0e032',
    Knight: 'b9cb40bf-8879-4f00-b8aa-a6428ff2c5bf',
    Pawn: 'b1f51714-f52e-415b-b77e-bfbad95d378a'
};

export const CUBIT_TYPES = {
    Unknown: '',
    MovementOrthogonal: '4ca1291d-5298-ea4a-8b6b-6ffbfdeefda1',
    MovementDiagonal: 'b1cc8951-61af-0cf3-9e71-d2db03885226',
    MovementCardinal: 'a39e2c74-0968-eb73-7ea8-c71b21608685',
    MovementJump: '2ca5a85e-116a-7971-6bbb-693d17f6ce3f',
    MovementSideStep: 'd1f075a1-2d8c-8b2a-5776-b5c711134e67',
    MovementSwap: '0b6d75f8-a2c2-29dc-e32c-c53a0fb1aeea',
    DrawNegOne: '68308f8c-2087-b64d-7bd8-97b98488e5aa',
    DrawPlusOne: '1fa0d186-0237-e13e-7449-f54092211149',
    DoubleAction: '40617317-15e1-5aa3-8cdd-3d3d131e9b4f', 
    Knowledge: '0994b86a-4709-f096-63c9-07c6e1008bfd',
    Condemn: 'b0dca050-b7d4-f83a-554f-4cfc4f2c7854',
    KingOfHill: '99d4a12e-e368-7700-5cd0-46548040fced',
    Enrage: '765857db-7109-4b3a-b12f-2657ac4cc3cd',
    Passify: '93eeb236-e43a-4b72-9f1f-5fb3687474fe',
};

export const CLASSIFICATIONS = {
    Unknown: 0,
    Unit: 1,
    Royal: 2,
    Cubit: 3,
    Movement: 4,
    Trap: 5,
};

export const MOVEMENT_TYPES = {
    Unknown: 0,
    Orthogonal: 1,  // King, Queen, Rooks
    Diagonal: 2,    // King Queen, Bishop
    Jump: 3,        // Knights
    Fork: 4,        // Pawn
    Forward: 5,     // Pawn
    Castle: 6,      // King
    Swap: 7,        // [New]
    Backwards: 8,   // [NEW]
    Sidestep: 9,    // [NEW]
};

export const DURATION_TYPES = {
    Unknown: 0,
    Turn: 1,
    Move: 2,
};

export const DIMENSIONS = {
    Unknown: 0,
    Single: 1,
    Small: 2,
    Medium: 3,
    Large: 4,
};

export class Entity {
    constructor(type, name, ownership) {
        // unique identifier
        this.id = uuidv4();
        // own owns the cubit
        this.ownership = ownership;
        // type of the cubit
        this.type = type;
        // the name of the type
        this.name = name;
        this.alias = name.slice(0, 6);
        // english words for the Help (convert to transltions keys later)
        this.description = "";
        // for filtering
        this.classification = [];

        // track moves and turns
        this.moves = 0;
        this.turns = 0;

        // adictional movement options
        this.movement = [];
    }

    static isType(entity, type) {
        return entity.type === type;
    }
    static hasClassification(entity, classify) {
        return entity.classification.includes(classify);
    }
}