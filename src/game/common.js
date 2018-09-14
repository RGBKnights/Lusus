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

// https://docs.google.com/spreadsheets/d/1zCMueghs-PBdr3HhSXKGGcOPpCqyDbhRKm_A3itCUCg/edit#gid=0
export const CUBIT_TYPES = {
    Unknown: '',
    MovementOrthogonal: '4ca1291d-5298-ea4a-8b6b-6ffbfdeefda1',
    // Units
    // adds orthogonal movement to unit
    // Passive - Movement
    MovementDiagonal: 'b1cc8951-61af-0cf3-9e71-d2db03885226',
    // Units
    // adds diagonal movement to unit
    // Passive - Movement
    MovementCardinal: 'a39e2c74-0968-eb73-7ea8-c71b21608685',
    // Units
    // adds cardinal movement to unit
    // Passive - Movement
    MovementJump: '2ca5a85e-116a-7971-6bbb-693d17f6ce3f',
    // Units
    // adds jump [2,1] movement to unit
    // Passive - Movement
    MovementSideStep: 'd1f075a1-2d8c-8b2a-5776-b5c711134e67',
    // Units
    // adds side step 1 movement to unit
    // Passive - Movement
    MovementSwap: '0b6d75f8-a2c2-29dc-e32c-c53a0fb1aeea',
    // Units
    // adds swap to unit
    // Passive - Movement
    DrawNegOne: '68308f8c-2087-b64d-7bd8-97b98488e5aa',
    // Avatar
    // -1 to draw to opppents draw
    // onPlay() => g.player[].draws--;
    DrawPlusOne: '1fa0d186-0237-e13e-7449-f54092211149',
    // Avatar
    // +1 to draw to players draw
    // onPlay() => g.player[].draws++;
    DoubleAction: '40617317-15e1-5aa3-8cdd-3d3d131e9b4f', 
    // Avatar
    // +1 action to the player
    // onPlay() => g.player[].actions.total++;
    Knowledge: '0994b86a-4709-f096-63c9-07c6e1008bfd',
    // Avatar
    // Reveral the oppents hand
    // Passive
    Condemn: 'b0dca050-b7d4-f83a-554f-4cfc4f2c7854',
    // Attach
    // onPlay() => unit.condemn = true;
    KingOfHill: '99d4a12e-e368-7700-5cd0-46548040fced',
    // Aerna
    // When King moves on to this cubit on the field then that play wins the game
    // onPlay() => add cubit to field at random location;
    // [Proxy] onMove() => if King moves on to this cubit on the field then that play wins the game
    Enrage: '765857db-7109-4b3a-b12f-2657ac4cc3cd',
    // Units
    // This unit can not make capture moves
    // Passive
    Passify: '93eeb236-e43a-4b72-9f1f-5fb3687474fe',
    // Units
    // This unit can not make passive moves
    // Passive
    AncientRevival: '10e38ff2-2954-43f5-9a06-b11fcc06fad9', 
    // Trap
    // When this piece is captured, return it to the board to an unoccupied space, of your choice, in your back line after your opponnets next turn
    // onCapture() => encapsulate Unit in Cubit (Revival); add Duration(turns, 0/1); move to Avator (if there is space in the []);
    // onActivate() w / target => reveal Unit in Cubit and move to target exile Cubit
    BacktoBasics: '3b9d5f24-daaa-485c-810d-7efc969024de',   
    // Aerna
    // All other cubies have no effect
    // onPlay() => set g.effects.basics = true; 
    // TODO: update all checks for this value when testing for Cubit affects
    BlinkDodge: 'a80cd286-9e00-4ea1-9356-744d663b9098',     
    // Trap
    // When this piece would be taken instead move it to a random unoccupied adjacent space. If none, it is taken
    // onCapture() => Move to random unoccupied adjacent space; if none move to afterlife
    CostofPower: '55168e9e-06f6-4cfe-bbdc-149a86173b5e',
    // *NEEDS WORK*  
    // Avatar
    // Each player draws an additional card and loses a random cubie from the bag
    // onDraw() => find Cubit; if exists remove random cubie;
    // HOW: loses a random cubie from the bag...?
    DarkMagic: '19c2696e-d456-482c-bb5b-d2abd8c80486',  
    // *NEEDS WORK*  
    // Trap 
    // On capture, you may take (select) a cubie from the afterlife and put it on this piece
    // onCapture() => g.players[].reaction = true; 
    // HOW: onReaction() /w target => move cubit from unit in afterlife to this unit (if able);
    Encumber: '35fb4558-7f55-46bb-afd8-78bee2d71d66',
    // *NEEDS WORK*  
    // Units
    // The unit gets -1 move for ever cubie on that unit
    // Passive   
    // HOW: 
    ForgottenPast: '269a550a-ea97-46a4-890f-395f45d3c440',  
    // Avatar 
    // Exile everything in the afterlife
    // onPlay() => find all cubits in the afterlife move them to exile
    Heirloom: '5f510368-b76e-4a9b-9f29-96ca821ba26b',       
    // Trap
    // When captured, put your cubies into bag instead of attached to piece in afterlife.
    // onCapture() => move cubits from unit to bag
    ArenaHole: '7ee25860-b996-442d-95da-9bd0a447cff3',   
    // *NEEDS WORK*   
    // Arena
    // Randomly select X unoccupied spaces not on the back lines, those are now Hole spaces.
    // onPlay() => add this cubits X times to field at random locations;
    // HOW:  You can move over but not land on a hole
    ArenaRock: 'e281b0bd-8a1f-4e9a-9db0-b1cdfe978151', 
    // *NEEDS WORK*  
    // Arena
    // Randomly select X unoccupied spaces not on the back lines, those are now Rock spaces. 
    // onPlay() => add this cubits X times to field at random locations;
    // HOW: Blocks movement, cannot land on rock
    ArenaIce: '88f8c963-c40e-4205-b10d-a540d2186177',  
    // *NEEDS WORK*       
    // Arena
    // Randomly select X spaces not on the back lines, those are now Ice spaces.
    // onPlay() => add this cubits X times to field at random locations;
    // HOW: Ice froces continus movement
    Immunity: '8faf8b97-5e47-4ac2-a5f2-0616120a4adb',   
    // *NEEDS WORK*
    // Units 
    // This piece cannot be targeted by opponents, other cubies on this piece cannot be targeted by opponnents
    // Passive
    // HOW: 
    Jump: '99d14233-f9c8-40d2-b4c6-6e3fe025829f',   
    // *NEEDS WORK*
    // Units
    // Cardinal phased movement; distance = 2;
    // Passive - Movement
    // HOW: CardinalMovement + Movement.phased = true;
    Looter: '9a226a0f-4d19-41e7-852e-856275875f89',      
    // Units   
    // On capture, put cubies into your bag instead of attached to piece in afterlife.
    // onCapture() => move cubits from this unit to bag
    Mulligan: '664882e5-df52-4396-b90c-77b84956342e',     
    // Avatar
    // You shuffle your hand back in and draw a new one, you get one additional action this turn
    // onPlay() => move cubits from hand to bag; move cubits from bag to hand; g.players[].actions.count--;
    Nab: 'e07970c5-a967-4c4a-903a-4b2502b2a9b1',
    // *NEEDS WORK*          
    // Avatar
    // Look at your opponents hand, you may play one of their cubies
    // onActivate() /w target => move from there hand to yours
    // HOW: update board if target location isHidden() then override to true
    Poisoned: 'abbc5454-2714-4e80-aa2e-674a4a19cc99',
    // Units
    // After this piece makes 3 moves it is removed
    // onMove() => unit.moves > 3 then move unit to afterlife
    Poof: '319017f3-f943-4c41-b465-15ceea4b9059',           
    // Board - Unit
    // Remove a piece from the board marking its location. It is gone until your next turn
    // onPlay() => encapsulate Unit in Cubit (Poof); move the cubit from the board to the field; 
    // onEoT() => reveal Unit in Cubit and move board at target location
    Reckless: '6b6b78fa-d42c-4713-ad1d-e3672786005e',       
    // Avatar
    // Once placed any player reachs 5 pieces in the afterlife you win
    // [Proxy] onCapture() => check afterlife for number of units if > 5 then you win the game
    Resourceful: '517c0bc3-1ed3-462e-ba23-018e61366005',   
    // Units 
    // Draw a new hand with one less card
    // onActivated() => moves cubits in hand to bag; draws new hand (-1);
    Revert: 'c647e8f2-3d4c-42cc-af90-9b0053617151',     
    // *NEEDS WORK*   
    // Units 
    // If unit is captured the move is reverted and revert Cubit is removed
    // onCapature() => remove this cubit from unit; [ShortCurit]
    RockThrow: '18301f0f-05e3-41f9-9f66-052a5485f0e1',    
    // *NEEDS WORK*   
    // Field
    // Select 3 unoccupid spaces. Those spaces act as if they are occupied by a peice
    // onPlay() => add 3 cubits to field based on the 3 targets
    // HOW: to select mulitple targets...?
    Sacrifice: 'b01a5d36-0f89-4264-a89a-a46554a1700a', 
    // *NEEDS WORK*     
    // Field
    // The unit must remove a Cubit to move away from this space
    // HOW: 
    StickyFeet: 'c74980b0-c356-4990-92fa-3b1a202770d0',
    // *NEEDS WORK*
    // Units
    // This piece cannot move more than one space
    // Passive
    // HOW: update getTarget() to focus movement
    Taunt: 'c2b27e7d-343e-416d-bac3-149fe48da9eb',   
    // *NEEDS WORK*       
    // Units
    // If the opposing team can take this piece as their move, they must do so
    // Passive
    // HOW: update getTarget() to focus movement
    ThunderDome: 'dea9abe7-230f-4448-a1c0-ecd37fb393aa',    
    // *NEEDS WORK* 
    // Arena
    // You cannot make passive moves if a capture is available
    // Passive
    // HOW: update getTarget() to focus movement
    Timebomb: '259d4841-a8a9-483b-ab78-bfb024184400',      
    // Fields
    // Start a 3 turn timer, count it down at end of each turn; at 0 detonate it destroying all pieces on that, and the sourrounding spaces
    // onPlay() => turns++; turns > 3; remove all units at location and sourrounding spaces
};

export const GAME_PHASES = {
    Unknown: '',
    Action: 'Action',
    Move: 'Move',
    Draw: 'Draw',
}

export const CLASSIFICATIONS = {
    Unknown: 0,
    Unit: 1,
    Royal: 2,
    Cubit: 3,
    Movement: 4,
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

export const MOVEMENT_CONSTRAINTS = {
    Unknown: 0,
    Either: 1,
    Passive: 2,
    Agressive: 3,
};

export const DURATION_TYPES = {
    Unknown: 0,
    Turn: 1,
    Move: 2,
};

export const DIMENSIONS = {
    Unknown: 0,
    Tiny: 1,
    Single: 2,
    Small: 3,
    Medium: 4,
    Large: 5
};

export const LOCATIONS = {
    Unknown: 0,
    Board: 1,
    Field: 2,
    Units: 3,
    Afterlife: 4,
    Bag: 5,
    Exile: 6,
    Arena: 7,
    Avatar: 8,
    Hand: 9,
};

export const TARGETING = {
    Unknown: 0,
    Any: 1,
    Self: 2,
    Opponent: 3,
};

export const TARGET_TYPES = {
    Unknown: 0,
    Play: 1,
    Passive: 2,
    Agressive: 3,
};

export class Movement {
    constructor(type, constraint, distance = null, steps = null) {
        this.type = type;
        this.constraints = constraint;
        this.distance = distance == null ? 1 : distance;
        this.steps = steps == null ? [] : steps;
    }
}

export class Target {
    constructor(where, whom, what = null, filter = null) {
        this.where = where;
        this.whom = whom;
        this.what = what;
        this.filter = filter;
    }
}

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
        // can this cubit be activated or consumed
        this.activatable = false;       
        // track moves and turns
        this.moves = 0;
        this.turns = 0;
        // adictional movement options
        this.movement = [];
        this.obstruction = true;
        // targets options
        this.targets = [];
    }

    static isType(entity, type) {
        return entity.type === type;
    }
    static hasClassification(entity, classify) {
        return entity.classification.includes(classify);
    }
}