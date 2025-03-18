import view from "./views/view.js";
import { Ship, Gameboard, Player } from "./model.js";

const sea = document.querySelector('.sea');
const player1Sea = document.querySelector('.player1Sea');
const player2Sea = document.querySelector('.player2Sea');

view.createSea(player1Sea);
view.createSea(player2Sea);

const player1Ship1 = new Ship(4);
const player2Ship1 = new Ship(4);

const player1 = new Player();
const player2 = new Player();

player1.gameboard.placeShip(player1Ship1, [0, 0]);
player2.gameboard.placeShip(player2Ship1, [0, 0]);

player1Sea.addEventListener('click', function (e) {
    const target = e.target;
    shoot(target);
})

function shoot(target) {
    const x = +target.dataset.x;
    const y = +target.dataset.y;
    const coords = [x, y];
    const missedShots = JSON.parse(JSON.stringify(player1.gameboard.missedShots));
    console.log('Missed Shots - ', missedShots);

    if (target.style.backgroundColor === 'lightblue' || target.style.backgroundColor === 'grey') {
        console.log('Arldjd');
        return;
    }
    console.log('MS Original - ', player1.gameboard.missedShots);
    console.log(target);

    player1.gameboard.receiveAttack([x, y]);

    if (player1.gameboard.board[y][x] === null) {
        // target.classList.add('shotMissed');
        target.style.backgroundColor = 'lightblue';
        target.textContent = 'x';
    } else {
        target.style.backgroundColor = 'grey';

    }
}