import view from "./views/view.js";
import gameView from "./views/gameView.js";
import { Ship, Gameboard, Player } from "./model.js";

const sea = document.querySelector('.sea');

const player1Ship1 = new Ship(4);
const player2Ship1 = new Ship(4);

const player1 = new Player();
const player2 = new Player();

player1.gameboard.placeShip(player1Ship1, [0, 0]);
player2.gameboard.placeShip(player2Ship1, [0, 0]);

function controlGame() {
    // 1. render two seas
    gameView.renderGameSeas();
    // 2. Let players shoot alternatively till all of ships of one player is sunk
    // gameView.shoot(player1);
    const allSunk = false;
    // while (!allSunk) {

    // }

    // 3. Announce the winner
}
controlGame();

// player1Sea.addEventListener('click', function (e) {
//     const target = e.target;
//     gameView.shoot(player1, target);
// })

// gameView.addHandlerToSea(controlSea);