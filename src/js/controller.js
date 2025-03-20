import { Ship, Gameboard, Player } from "./model.js";
import view from "./views/view.js";
import gameView from "./views/gameView.js";
import { ShipPlacementView } from "./views/shipPlacementView.js";

const sea = document.querySelector('.sea');
const shipsEl = document.querySelectorAll('.ship');

function controlShipPlacement() {
    const shipPlacementView = new ShipPlacementView();

    shipPlacementView.createSea(sea);

    for (let shipEl of shipsEl) {
        shipEl.addEventListener('dragstart', function (e) {
            let selected = e.target;
            console.log(selected);

            sea.addEventListener('dragover', function (e) {
                e.preventDefault();
            })
            sea.addEventListener('drop', function (e) {
                console.log(e.target);
                const target = e.target;
                const x = +target.dataset.x;
                const y = +target.dataset.y;

                const currShip = new Ship(shipEl.dataset.shipElLength);
                console.log(currShip);
                console.log(shipEl.dataset.shipElLength);

                if (!player1.gameboard.isValidPlacement(currShip, [x, y]))
                    return;

                player1.gameboard.placeShip(currShip, [x, y]);

                target.style.backgroundColor = 'rgb(231, 106, 106)';
                if (currShip.stats.direction === 'horizontal') {
                    console.log(target.nextSibling);
                    console.log(currShip.stats.shipLength);
                    for (let i = 1; i < currShip.stats.shipLength; i++)
                        target.nextSibling.style.backgroundColor = 'rgb(231, 106, 106)';
                }
                // sea.appendChild(selected);
            })
        })
    }
}
controlShipPlacement();

const player1Ship1 = new Ship(5);
const player1Ship2 = new Ship(4);
const player1Ship3 = new Ship(3);
const player2Ship1 = new Ship(5);
const player2Ship2 = new Ship(4);
const player2Ship3 = new Ship(3);

const player1 = new Player('_', 'player1');
const player2 = new Player('_', 'player2');

player1.gameboard.placeShip(player1Ship1, [0, 0]);
player1.gameboard.placeShip(player1Ship2, [0, 1]);
player1.gameboard.placeShip(player1Ship3, [0, 2]);
player2.gameboard.placeShip(player2Ship1, [0, 0]);
player2.gameboard.placeShip(player2Ship2, [0, 1]);
player2.gameboard.placeShip(player2Ship3, [0, 2]);



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
controlGame();






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