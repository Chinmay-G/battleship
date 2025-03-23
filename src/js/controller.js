import { Ship, Gameboard, Player } from "./model.js";
import view from "./views/view.js";
import gameView from "./views/gameView.js";
import { shipPlacementView1, shipPlacementView2 } from "./views/shipPlacementView.js";


const shipPlacementPage = document.querySelector('.shipPlacementPage');
const readyBtn = document.querySelector('.shipPlacementPage-btn-ready');
const gamePage = document.querySelector('.gamePage');

// function 

const player1 = new Player('_', 'player1');
const player2 = new Player('_', 'player2');

shipPlacementView1.controlShipPlacement(player1, Ship);

readyBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // When player1 has finished placing and it's player 2's turn next
    if (player1.gameboard.ships.length === 5 && player2.gameboard.ships.length === 0) {
        shipPlacementView1.resetUI();
        shipPlacementView2.controlShipPlacement(player2, Ship);
    }

    // When both player1 and player2 has finished placing all ships
    if (player1.gameboard.ships.length === 5 && player2.gameboard.ships.length === 5) {
        shipPlacementPage.classList.add('hidden');
        gamePage.classList.remove('hidden');
        controlGame();
    }
})

// const player1Ship1 = new Ship(5);
// player1.gameboard.placeShipRandomly(player1Ship1);
// console.log(player1.gameboard.board);
// console.log(player1Ship1.stats);

// const player1Ship2 = new Ship(4);
// const player1Ship3 = new Ship(3);
// const player2Ship1 = new Ship(5);
// const player2Ship2 = new Ship(4);
// const player2Ship3 = new Ship(3);


// player1.gameboard.placeShip(player1Ship1, [0, 0]);
// player1.gameboard.placeShip(player1Ship2, [0, 1]);
// player1.gameboard.placeShip(player1Ship3, [0, 2]);
// player2.gameboard.placeShip(player2Ship1, [0, 0]);
// player2.gameboard.placeShip(player2Ship2, [0, 1]);
// player2.gameboard.placeShip(player2Ship3, [0, 2]);



function controlGame() {
    // 1. render two seas
    gameView.renderGameSeas();

    // 2. Let players shoot alternatively till all of ships of one player is sunk and show the winner
    let turn = true; // Start from player 1's turn

    function handleClickOnSea(e) {
        const target = e.target;

        // Set the player recieving attack
        let player;
        if (turn) player = player2;
        else player = player1;

        // Shoot the player
        let alreadyAttacked = gameView.shoot(player, target);
        if (alreadyAttacked === true) {
            gameView.addHandlerAttackSea(handleClickOnSea);
            return;
        }

        // Remove handler to shoot current Sea
        this.removeEventListener('click', handleClickOnSea);

        // When one of either player's all ships are sunk, end game and show winner
        if (player.gameboard.isAllSunk() === true) {
            console.log(player.name, 'Loses!!');
            // gameView.showWinner(player);
            return;
        }

        // Change turns
        turn = !turn;

        if (!turn)
            gameView.player1Sea.addEventListener('click', handleClickOnSea);
        else gameView.addHandlerAttackSea(handleClickOnSea);
    }

    // Add handler to shoot Sea 2
    gameView.addHandlerAttackSea(handleClickOnSea);
}







// Previous version of handleClickOnSea in controlGame()
// function handleClickOnSea(e) {
//     const target = e.target;
//     gameView.shoot(player2, target);

//     // Remove handler to shoot Sea 2
//     this.removeEventListener('click', handleClickOnSea);

//     if (player2.gameboard.isAllSunk() === true) {
//         console.log('Player 1 Wins!!');
//         // gameView.showWinner(player1);
//         return;
//     }

//     // Add event handler to shoot Sea 1
//     gameView.player1Sea.addEventListener('click', function handleClickOnSea1(e) {
//         const target = e.target;
//         gameView.shoot(player1, target);

//         // Remove event handler to shoot Sea 1
//         this.removeEventListener('click', handleClickOnSea1);

//         if (player1.gameboard.isAllSunk() === true) {
//             console.log('Player 2 Wins!!');
//             // gameView.showWinner(player2);
//             return;
//         }

//         // Repeat till one of players all ships are sunk
//         gameView.addHandlerAttackSea(handleClickOnSea);
//     })
// }