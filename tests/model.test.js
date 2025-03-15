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

test('Gameboard\'s length is 100', () => {
    const game = new Gameboard();
    expect(game.board[12]).toEqual([1, 2]);
})