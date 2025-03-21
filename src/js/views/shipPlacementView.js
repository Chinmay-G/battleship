import View from "./view.js";
import { getNext10thEl } from "../helper.js";

class ShipPlacementView extends View {
    shipPlacementPage = document.querySelector('.shipPlacementPage');
    gamePage = document.querySelector('.gamePage');

    whosTurn = document.querySelector('.whosTurn');
    sea = document.querySelector('.sea');
    shipsEl = document.querySelectorAll('.ship');

    readyBtn = document.querySelector('.shipPlacementPage-btn-ready');

    shipPlacementPageHTML = this.shipPlacementPage.innerHTML;


    controlShipPlacement(player, Ship) {

        this.whosTurn.textContent = `${player.name.slice(0, 1).toUpperCase() + player.name.slice(1)}\'s Turn`;

        // Create sea layout
        this.createSea(this.sea);

        for (let shipEl of this.shipsEl) {

            // Let ships be displayed
            // shipEl.style.display = '';

            // Rotate ship when doubleclicked on it
            shipEl.addEventListener('dblclick', function (e) {
                let selectedEl = e.target.closest('.ship');
                console.log(e.target.closest('.ship'));
                this.rotateShip(selectedEl);
            }.bind(this))

            // Drag the ship element
            shipEl.addEventListener('dragstart', function (e) {
                let selectedEl = e.target;

                this.sea.addEventListener('dragover', function (e) {
                    e.preventDefault();
                    console.log(player.name);
                }.bind(this))

                // Drop the ship element
                this.sea.addEventListener('drop', function (e) {
                    const target = e.target; // drop area
                    const x = +target.dataset.x;
                    const y = +target.dataset.y;

                    let currShip = new Ship(+selectedEl.dataset.shiplength, selectedEl.dataset.direction);

                    if (!player.gameboard.isValidPlacement(currShip, [x, y])) {
                        currShip = null;
                        selectedEl = null;
                        return;
                    }

                    // Place ship in player's board
                    player.gameboard.placeShip(currShip, [x, y]);
                    console.log('board - ', player.gameboard.board);

                    target.style.backgroundColor = 'rgb(231, 106, 106)';

                    let nextEl = target;

                    if (currShip.stats.direction === 'horizontal') {

                        for (let i = 0; i < +selectedEl.dataset.shiplength; i++) {
                            nextEl.style.backgroundColor = 'rgb(231, 106, 106)';
                            nextEl.style.borderRight = 'none';
                            nextEl.style.borderLeft = 'none';
                            nextEl.textContent = '+';
                            nextEl = nextEl.nextSibling;
                        }

                        // Clearing the placed ships from "shipHarbour"
                        selectedEl.style.display = 'none';
                    }

                    if (currShip.stats.direction === 'vertical') {
                        for (let i = 0; i < +selectedEl.dataset.shiplength; i++) {
                            nextEl.style.backgroundColor = 'rgb(231, 106, 106)';
                            nextEl.style.borderTop = 'none';
                            nextEl.style.borderBottom = 'none';
                            nextEl.textContent = '+';
                            nextEl = getNext10thEl(nextEl);
                        }

                        // Clearing the placed ships from "shipHarbour"
                        selectedEl.style.display = 'none';
                    }

                    currShip = null;
                    selectedEl = null;
                })
            }.bind(this))
        }

        // Ready to play button
        this.readyBtn.addEventListener('click', function (e) {
            if (!(player.gameboard.ships.length === 5)) {
                alert('Please place all the remaining ships!');
                return;
            }
            else if (player.name === 'player1') {
                this.sea.innerHTML = '';
                // return;
            }
            if (player.name === 'player2') {
                this.shipPlacementPage.display = 'none';
                this.gamePage.display = '';
            }
            console.log('Clicked');
        }.bind(this));
    }

    rotateShip(selectedEl) {
        // if (selectedEl.getBoundingClientRect().height === '50px') {
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
    }

    resetUI() {
        this.sea.innerHTML = '';
        // this.createSea(this.sea);

        this.shipsEl.forEach(ship => {
            ship.style.display = '';
            if (ship.dataset.direction === 'vertical')
                this.rotateShip(ship);
        })
        // this.shipPlacementPage.innerHTML = this.shipPlacementPageHTML;
        return;
    }
}

export const shipPlacementView1 = new ShipPlacementView();
export const shipPlacementView2 = new ShipPlacementView();