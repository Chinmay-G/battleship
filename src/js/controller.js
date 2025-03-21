import { Ship, Gameboard, Player } from "./model.js";
import view from "./views/view.js";
import gameView from "./views/gameView.js";
import { ShipPlacementView } from "./views/shipPlacementView.js";

const sea = document.querySelector('.sea');
const shipsEl = document.querySelectorAll('.ship');

const readyBtn = document.querySelector('.shipPlacementPage-btn-ready');

function controlShipPlacement() {
    const shipPlacementView = new ShipPlacementView();

    shipPlacementView.createSea(sea);



    for (let shipEl of shipsEl) {
        shipEl.addEventListener('dblclick', function (e) {
            let selectedEl = e.target.closest('.ship');
            console.log('double', selectedEl);
            if (selectedEl.dataset.direction === 'horizontal') {
                selectedEl.dataset.direction = 'vertical';
                selectedEl.style.alignContent = 'baseline';
            } else {
                selectedEl.dataset.direction = 'horizontal';
                selectedEl.style.alignContent = 'center';
            }

            let tempWidth = selectedEl.getBoundingClientRect().width;
            selectedEl.style.width = selectedEl.getBoundingClientRect().height + 'px';
            selectedEl.style.height = tempWidth + 'px';


        })

        shipEl.addEventListener('dragstart', function (e) {
            let selectedEl = e.target;

            sea.addEventListener('dragover', function (e) {
                e.preventDefault();
            })

            sea.addEventListener('drop', function (e) {
                console.log('drop area target - ', e.target);
                const target = e.target;
                const x = +target.dataset.x;
                const y = +target.dataset.y;

                let currShip = new Ship(+selectedEl.dataset.shiplength, selectedEl.dataset.direction);

                if (!player1.gameboard.isValidPlacement(currShip, [x, y])) {
                    currShip = null;
                    selectedEl = null;
                    return;
                }

                // Place ship in player's board
                player1.gameboard.placeShip(currShip, [x, y]);
                console.log('board - ', player1.gameboard.board);

                target.style.backgroundColor = 'rgb(231, 106, 106)';

                let nextEl = target;

                if (currShip.stats.direction === 'horizontal') {
                    // Styling first box of the ship after placement
                    target.style.borderTopLeftRadius = '50px';
                    target.style.borderBottomLeftRadius = '50px';

                    for (let i = 0; i < +selectedEl.dataset.shiplength; i++) {
                        nextEl.style.backgroundColor = 'rgb(231, 106, 106)';
                        nextEl.style.border = 'none';
                        nextEl.textContent = '+';
                        nextEl = nextEl.nextSibling;
                    }
                    // Styling last box of the ship after placement
                    nextEl.previousSibling.style.borderTopRightRadius = '50px';
                    nextEl.previousSibling.style.borderBottomRightRadius = '50px';

                    // Clearing the placed ships from "shipHarbour"
                    selectedEl.style.display = 'none';
                }
                if (currShip.stats.direction === 'vertical') {
                    // Styling first box of the ship after placement
                    target.style.borderTopLeftRadius = '50px';
                    target.style.borderTopRightRadius = '50px';

                    for (let i = 0; i < +selectedEl.dataset.shiplength; i++) {
                        nextEl.style.backgroundColor = 'rgb(231, 106, 106)';
                        nextEl.style.border = 'none';
                        nextEl.textContent = '+';
                        nextEl = getNext10thEl(nextEl);
                    }
                    // Styling last box of the ship after placement
                    getprevious10thEl(nextEl).style.borderBottomLeftRadius = '50px';
                    getprevious10thEl(nextEl).style.borderBottomRightRadius = '50px';

                    // Clearing the placed ships from "shipHarbour"
                    selectedEl.style.display = 'none';
                }

                function getNext10thEl(el) {
                    let nextEl = el;
                    for (let i = 0; i < 10; i++)
                        nextEl = nextEl.nextSibling;
                    return nextEl;
                }
                function getprevious10thEl(el) {
                    let nextEl = el;
                    for (let i = 0; i < 10; i++)
                        nextEl = nextEl.previousSibling;
                    return nextEl;
                }

                currShip = null;
                selectedEl = null;
            })
        })
    }

    readyBtn.addEventListener('click', function (e) {
        if (!(player1.gameboard.ships.length === 5)) {
            alert('Please place all the remaining ships!');
            return;
        }
        console.log('Clicked');
    })
}
controlShipPlacement();

// const player1Ship1 = new Ship(5);
// const player1Ship2 = new Ship(4);
// const player1Ship3 = new Ship(3);
// const player2Ship1 = new Ship(5);
// const player2Ship2 = new Ship(4);
// const player2Ship3 = new Ship(3);

const player1 = new Player('_', 'player1');
const player2 = new Player('_', 'player2');

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