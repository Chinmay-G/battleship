class Ship {
    stats = {
        shipLength: 0,
        hitsTaken: 0,
        sunk: false,
        direction: 'horizontal',
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
        if (this.stats.direction === 'horizontal')
            this.stats.direction = 'vertical';
        else this.stats.direction = 'horizontal';
    }
}

class Gameboard {
    board = [];
    ships = [];
    missedShots = [];

    constructor() {
        this.board = new Array(10).fill().map(() => Array(10).fill(null));
    }

    isValidPlacement(ship, [x, y]) {
        if (ship.stats.direction === 'horizontal') {
            if (x + ship.stats.shipLength > 10) return false;
        } else {
            if (y + ship.stats.shipLength > 10) return false;
        }

        for (let i = 0; i < ship.stats.shipLength; i++) {
            if (ship.stats.direction === 'horizontal') {
                if (this.board[y][x + i] != null) return false;
            } else {
                if (this.board[y + i][x] != null) return false;
            }
        }

        return true;
    }

    placeShip(ship, [x, y]) {
        if (!this.isValidPlacement(ship, [x, y]))
            return;

        this.ships.push(ship);

        if (ship.stats.direction === 'horizontal') {
            for (let i = 0; i < ship.stats.shipLength; i++) {
                this.board[y][x + i] = ship;
            }
        }
        else {
            for (let i = 0; i < ship.stats.shipLength; i++) {
                this.board[y + i][x] = ship;
            }
        }
    }

    placeShipRandomly(ship) {
        let placed = false;

        while (!placed) {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            ship.stats.direction = Math.floor(Math.random()) > 0.5 ? 'horizontal' : 'vertical';

            if (this.isValidPlacement(ship, [x, y])) {
                this.placeShip(ship, [x, y]);
                placed = true;
            }
        }
    }

    receiveAttack([x, y]) {
        const ship = this.board[y][x];
        if (ship) {
            ship.hit();
        } else {
            this.missedShots.push([x, y]);
        }
    }

    isAllSunk() {
        if (this.ships.every(ship => ship.stats.sunk === true))
            return true;
        return false;
    }
}

class Player {
    gameboard = new Gameboard();

    constructor(type) {

    }
}

module.exports = { Ship, Gameboard };