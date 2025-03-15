class Ship {
    stats = {
        shipLength: 0,
        hitsTaken: 0,
        sunk: false,
        orientation: 'horizontal',
    }

    constructor(len) {
        this.stats.shipLength = len;
    }

    hit() {
        if (this.isSunk === true) return;

        this.stats.hitsTaken += 1;
        if (this.isSunk() === true)
            this.stats.sunk = true;
    }

    isSunk() {
        if (this.stats.hitsTaken === this.stats.shipLength)
            return true;
        return false;
    }

    rotate() {
        if (this.stats.orientation === 'horizontal')
            this.stats.orientation = 'vertical';
        else this.stats.orientation = 'horizontal';
    }
}

class Gameboard {
    board = []

    constructor() {
        this.board = new Array(100);
        // for (let i = 0; i <= 9; i++) {
        //     for (let j = 0; j <= 9; j++) {
        //         this.board.push([i, j]);
        //     }
        // }
    }

    place(ship, index) {
        if (this.stats.orientation === 'horizontal') {

        }
    }
}

module.exports = { Ship, Gameboard };