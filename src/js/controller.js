import { Ship, Gameboard, Player } from "./model.js";
import view from "./views/view.js";
import starterPageView from "./views/starterPageView.js";
import { shipPlacementView1, shipPlacementView2 } from "./views/shipPlacementView.js";
import gameView from "./views/gameView.js";

const enterBattleBtn = document.querySelector('.submitPlayersNameBtn');
const shipPlacementPage = document.querySelector('.shipPlacementPage');
const readyBtn = document.querySelector('.shipPlacementPage-btn-ready');
const gamePage = document.querySelector('.gamePage');

// function 
enterBattleBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const { player1Name, player2Name } = starterPageView.returnPlayerNames();
    controlShipPlacementMain(player1Name, player2Name);
});

let player1;
let player2;

function controlShipPlacementMain(player1Name, player2Name) {

    player1 = new Player('_', player1Name);
    player2 = new Player('_', player2Name);

    shipPlacementView1.controlShipPlacement(player1, Ship);

    readyBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo(0, 0);

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
}



function controlGame() {
    // 1. render two seas
    gameView.renderGameSeas(player1.name, player2.name);

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
        console.log(alreadyAttacked);
        if (alreadyAttacked === true) {
            // gameView.addHandlerAttackSea(handleClickOnSea);
            if (!turn)
                gameView.player1Sea.addEventListener('click', handleClickOnSea);
            else gameView.addHandlerAttackSea(handleClickOnSea);
            return;
        }

        // Remove handler to shoot current Sea
        this.removeEventListener('click', handleClickOnSea);

        // When one of either player's all ships are sunk, end game and show winner
        if (player.gameboard.isAllSunk() === true) {
            console.log(player.name, 'Loses!!');
            gameView.showWinner(player1, player2, player.name);
            return;
        }

        // Change turns
        turn = !turn;
        console.log('Turn - ', turn);


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