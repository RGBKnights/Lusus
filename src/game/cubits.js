const uuidv4 = require('uuid/v4');

export class Location { 
    constructor(game) {
        this.id = uuidv4();
        this.game = game;
        this.controller = null;
        this.size = { width: 0, height: 0 };
        this.collection = [];
    }

    getSize() {
        return this.size;
    }

    getPositon(id) {
        let x = this.collection.findIndex(i => i.id === id);
        return {x: x, y: 0};
    }

    getItem(x,y) {
        return this.collection[x];
    }

    setItem(x,y,id) {
        this.collection[x].push(id);
    }
}

export class FieldLocation extends Location { 
    constructor(game) {
        super(game);

        this.size.width = 8;
        this.size.height = 8;

        for (let x = 0; x < this.size.width; x++) {
            let row = [];
            for (let y = 0; y < this.size.height; y++) {
                row.push([]);
            }
            this.collection.push(row);
        }
    }

    getPositon(id) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let result = this.collection[x][y].findIndex(i => i.id === id);
                if(result !== -1) {
                    return {x: x, y: y};
                }
            }
        }
    }

    getItem(x,y) {
        return this.collection[x][y];
    }

    setItem(x,y,id) {
        this.collection[x][y].push(id);
    }
}

export class UnitsLocation extends Location { 
    constructor(game, controller) {
        super(game);

        this.controller = controller;
    }

    getPositon(id) {
        let units = this.game.units.filter(u => u.ownership === this.controller);
        units.sort(function(lhs, rhs) { return lhs.name.localeCompare(rhs.name); });

        let index = units.findIndex(u => u.id === id);
        if(index !== -1) {
            return { x: 0, y: index };
        }

        for (let y = 0; y < units.length; y++) {
            const unit = units[y];
            
            for (let x = 0; x < unit.cubits.length; x++) {
                if(unit.cubits[x] === id) {
                    return { x: x + 1, y: y };
                }
            }
        }
    }

    getItem(x,y) {
        let units = this.game.units.filter(u => u.ownership === this.controller);
        units.sort(function(lhs, rhs) { return lhs.name.localeCompare(rhs.name); });

        let unit = units[y];
        if(unit) {
            if(x === 0) {
                return unit.id;
            } else {
                return unit.cubits[x-1];
            }
        } else{
            return null;
        }
    }

    setItem(x,y,id) {
        // NOTE: Dose this mean make sense... 
        // maybe just return instead since you can not set directly on this board
        // but then how do you add cubits to units

        // TODO: finish this be settings the ID on the something...
    }
}


export class HandLocation extends Location { 
    constructor(game, controller) {
        super(game);

        this.size.width = 5;
        this.size.height = 1;
        this.controller = controller;
        
    }
}

export class PlayerLocation extends Location { 
    constructor(game, controller) {
        super(game);

        this.size.width = 5;
        this.size.height = 1;
        this.controller = controller;
    }
}

export class game { 
    constructor() {
        this.id = uuidv4();
        this.cubits = [];
        this.units = [];
        this.locations = [
            new HandLocation(this, "0"),
            new HandLocation(this, "1"),
            new PlayerLocation(this, "0"),
            new PlayerLocation(this, "1"),
            new UnitsLocation(this, "0"),
            new UnitsLocation(this, "1"),
            new FieldLocation(this, "1"),
            // Arena
        ];
    }

    getStartingState(ctx) {
        return [];
    }
}