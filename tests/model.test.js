// const { default: test } = require('node:test');
const { Ship, Gameboard } = require('../src/js/model');

describe('Ship\'s hit() increases number of hits in the ship', () => {
    it('Ship.hits() works', () => {
        const ship1 = new Ship(1);
        ship1.hit();
        ship1.hit();
        expect(ship1.stats.hitsTaken).toBe(2);
    })
})

describe('Ship.isSunk() calculates whether a ship is sunk or not', () => {
    it('When ship is not hit', () => {
        const ship1 = new Ship(1);
        expect(ship1.isSunk()).toEqual(false);
    })
    it('When ship is hit once but length is 2', () => {
        const ship1 = new Ship(2);
        ship1.hit();
        expect(ship1.isSunk()).toEqual(false);
    })
    it('When ship is hit twice and length is 2', () => {
        const ship1 = new Ship(2);
        ship1.hit();
        ship1.hit();
        expect(ship1.isSunk()).toEqual(true);
    })
})

describe('Gameboard', () => {
    it('A ship is placed', () => {
        const ship1 = new Ship(3);
        const p1 = new Gameboard();
        p1.placeShip(ship1, [1, 4]);
        expect(p1.board[4][1]).toEqual(ship1);
    })
    it('Three ships are placed', () => {
        const ship1 = new Ship(5);
        const ship2 = new Ship(3);
        ship2.rotate();
        const ship3 = new Ship(2);
        const p1 = new Gameboard();
        p1.placeShip(ship1, [2, 1]);
        p1.placeShip(ship2, [2, 3]);
        p1.placeShip(ship3, [5, 6]);
        expect(p1.board[1][2]).toEqual(ship1);
        expect(p1.board[3][2]).toEqual(ship2);
        expect(p1.board[6][5]).toEqual(ship3);
    })
    it('A ship is placed randomly', () => {
        const ship1 = new Ship(3);
        const p1 = new Gameboard();
        p1.placeShipRandomly(ship1);
        expect(p1.board.some(el => el.some(sh => sh === ship1))).toBe(true);
    })
    it('Three ships are placed randomly', () => {
        const ship1 = new Ship(5);
        const ship2 = new Ship(3);
        ship2.rotate();
        const ship3 = new Ship(2);
        const p1 = new Gameboard();
        p1.placeShipRandomly(ship1);
        p1.placeShipRandomly(ship2);
        p1.placeShipRandomly(ship3);
        expect(p1.board.some(el => el.some(sh => sh === ship1))).toBe(true);
        expect(p1.board.some(el => el.some(sh => sh === ship2))).toBe(true);
        expect(p1.board.some(el => el.some(sh => sh === ship3))).toBe(true);
    })

    it('Recieved attack on empty cell', () => {
        const gboard = new Gameboard();
        gboard.receiveAttack([1, 2]);
        expect(gboard.missedShots).toEqual([[1, 2]]);
    })
    it('Recieved attack on a ship', () => {
        const ship1 = new Ship(3);
        const gboard = new Gameboard();
        gboard.placeShip(ship1, [2, 1]);
        gboard.receiveAttack([2, 1]);
        gboard.receiveAttack([3, 1]);
        expect(ship1.stats.hitsTaken).toEqual(2);
    })
    it('Recieved attack on a ship and sunk it', () => {
        const ship1 = new Ship(2);
        const ship2 = new Ship(1);
        const gboard = new Gameboard();
        gboard.placeShip(ship1, [2, 1]);
        gboard.placeShip(ship2, [4, 1]);
        gboard.receiveAttack([2, 1]);
        gboard.receiveAttack([3, 1]);
        gboard.receiveAttack([4, 1]);
        expect(ship1.stats.sunk).toEqual(true);
        expect(gboard.isAllSunk()).toEqual(true);
    })
})