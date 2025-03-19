import view from "./views/view.js";
import gameView from "./views/gameView.js";
import { Ship, Gameboard, Player } from "./model.js";

const sea = document.querySelector('.sea');

const player1Ship1 = new Ship(4);
const player2Ship1 = new Ship(4);

const player1 = new Player('_', 'player1');
const player2 = new Player('_', 'player2');

player1.gameboard.placeShip(player1Ship1, [0, 0]);
player2.gameboard.placeShip(player2Ship1, [0, 0]);

let gameEnds = false;

function controlGame() {
    // 1. render two seas
    gameView.renderGameSeas();

    // 2. Let players shoot alternatively till all of ships of one player is sunk

    // May use LATER for refactoring // TEMP
    // function handleClickOnSea(e) {
    //     clickedOnSea(player2, this, e);
    //     console.log(this);
    //     if (gameEnds) return;

    //     gameView.addHandlerAttackSea1(handleClickOnSea1);
    //     if (gameEnds) return;

    //     gameView.addHandlerAttackSea(handleClickOnSea);
    // }

    // function clickedOnSea(player, thiss, e) {
    //     const target = e.target;
    //     gameView.shoot(player, target);

    //     // thiss.removeEventListener('click', thiss === gameView.player2Sea ? controlGame.handleClickOnSea : handleClickOnSea1);
    //     // gameView.player2Sea.removeEventListener('click', handleClickOnSea);
    //     // gameView.player1Sea.removeEventListener('click', handleClickOnSea1);
    //     // console.log(player, player2);
    //     // console.log(player === player2);

    //     if (player.gameboard.isAllSunk() === true) {
    //         console.log('Player 1 Wins!!');
    //         // gameView.showWinner(player1);
    //         gameEnds = true;
    //         return true;
    //     }
    //     return false
    // }

    // function handleClickOnSea1(e) {
    //     clickedOnSea(player1, this, e);
    // }


    function handleClickOnSea(e) {
        const target = e.target;
        gameView.shoot(player2, target);

        // Remove handler to shoot Sea 2
        this.removeEventListener('click', handleClickOnSea);

        if (player2.gameboard.isAllSunk() === true) {
            console.log('Player 1 Wins!!');
            // gameView.showWinner(player1);
            return;
        }

        // Add event handler to shoot Sea 1
        gameView.player1Sea.addEventListener('click', function handleClickOnSea1(e) {
            const target = e.target;
            gameView.shoot(player1, target);

            // Remove event handler to shoot Sea 1
            this.removeEventListener('click', handleClickOnSea1);

            if (player1.gameboard.isAllSunk() === true) {
                console.log('Player 2 Wins!!');
                // gameView.showWinner(player2);
                return;
            }

            // Repeat till one of players all ships are sunk
            gameView.addHandlerAttackSea(handleClickOnSea);
        })
    }

    // Add handler to shoot Sea 2
    gameView.addHandlerAttackSea(handleClickOnSea);

    // 3. Announce the winner
}
controlGame();

// Put this inside a function and make player1Sea a parameter--------
// player1Sea.addEventListener('click', function (e) {
//     const target = e.target;
//     gameView.shoot(player1, target);
// })

// gameView.addHandlerToSea(controlSea);

// let arr = [];
// function demoOutside() {
//     console.log('start');
//     if (demoInside(this) === true)
//         return;
//     console.log('end');
// }
// function demoInside(thiss) {
//     console.log(thiss);
//     arr.push(1);
//     return true;
// }
// gameView.player1Sea.addEventListener('click', demoOutside);
// // demoOutside();
// console.log(arr);