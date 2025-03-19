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

async function controlGame() {
    // 1. render two seas
    gameView.renderGameSeas();
    // 2. Let players shoot alternatively till all of ships of one player is sunk

    let allSunk = false;

    await gameView.attackSea(true, player1, player2);

    const isDone = await gameView.attackSea(true, player1, player2);
    const wt = await gameView.attackSea(true, player1, player2);
    // await gameView.attackSea(false, player1);
    // // let done = isDone.then((el) => el);
    // setTimeout(() => console.log('Done? - ', isDone), 5000);
    // if (isDone === 'Done')
    console.log('later'); // executes right away

    if (player1.gameboard.isAllSunk() === true)
        allSunk = true;
    if (player2.gameboard.isAllSunk() === true)
        allSunk = true;

    // add handler to shoot Sea 1

    // remove handler to shoot Sea 1

    // add handler to shoot Sea 2

    // remove handler to shoot Sea 2

    // Repeat till one of players all ships are sunk

    // gameView.shoot(player1);

    // 3. Announce the winner
}
controlGame();

// Put this inside a function and make player1Sea a parameter--------
// player1Sea.addEventListener('click', function (e) {
//     const target = e.target;
//     gameView.shoot(player1, target);
// })

// gameView.addHandlerToSea(controlSea);