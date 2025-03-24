import View from "./view.js";
import { getNext10thEl } from "../helper.js";

class ShipPlacementView extends View {

    shipPlacementPage = document.querySelector('.shipPlacementPage');
    whosTurn = document.querySelector('.whosTurn');
    sea = document.querySelector('.sea');
    seaBoxAll = document.querySelectorAll('.seaBox');
    shipsEl = document.querySelectorAll('.ship');
    readyBtn = document.querySelector('.shipPlacementPage-btn-ready');
    randomizeBtn = document.querySelector('.shipPlacementPage-btn-randomize');
    resetBtn = document.querySelector('.shipPlacementPage-btn-reset');

    controlShipPlacement(player, Ship) {
        // Display who's turn to place ships
        this.whosTurn.textContent = `${player.name.slice(0, 1).toUpperCase() + player.name.slice(1)}\'s Turn`;

        // Display ship Placement Page if hidden
        this.shipPlacementPage.classList.remove('hidden');

        // Create sea layout
        this.createSea(this.sea);

        for (let shipEl of this.shipsEl) {
            // Rotate ship when doubleclicked on it
            shipEl.addEventListener('dblclick', this.handleDoubleClick(player).bind(this))

            // Drag the ship element
            shipEl.addEventListener('dragstart', this.handleDragStart(player, Ship).bind(this))
        }

        // Ready to play button
        this.readyBtn.addEventListener('click', function (e) {
            if (!(player.gameboard.ships.length === 5)) {
                alert('Please place all the remaining ships! 🚢');
                return;
            }
        }.bind(this));

        this.randomizeBtn.addEventListener('click', this.handleRandomizeBtn(player, Ship).bind(this));

        this.resetBtn.addEventListener('click', this.handleResetBtn(player).bind(this));
    }

    handleDoubleClick(player) {
        return function curriedFunc(e) {
            // Prevent player1's gameboard movements after all the placements
            if (player.gameboard.ships.length === 5) return;

            let selectedEl = e.target.closest('.ship');
            this.rotateShip(selectedEl);
        }
    }

    handleDragStart(player, Ship) {
        return function curriedFunc(e) {
            // Prevent player1's gameboard movements after all the placements
            if (player.gameboard.ships.length === 5) return;

            let selectedEl = e.target;

            this.sea.addEventListener('dragover', this.handleDragOver)

            // Drop the ship element
            this.sea.addEventListener('drop', this.handleDrop(selectedEl, player, Ship))
        }.bind(this);
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDrop(selectedEl, player, Ship) {
        return function curriedFunc(e) {
            // Prevent player1's gameboard movements after all the placements
            if (player.gameboard.ships.length === 5 || !selectedEl) return;

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
            const shipIcon = selectedEl.dataset.shipicon;

            target.style.backgroundColor = 'rgb(231, 106, 106)';
            target.textContent = shipIcon;

            let nextEl = target;

            if (currShip.stats.direction === 'horizontal') {

                nextEl.style.borderRight = 'none';
                for (let i = 1; i < +selectedEl.dataset.shiplength; i++) {
                    nextEl = nextEl.nextSibling;
                    nextEl.style.backgroundColor = 'rgb(231, 106, 106)';
                    nextEl.style.borderRight = 'none';
                    nextEl.style.borderLeft = 'none';
                    nextEl.textContent = shipIcon;
                }

                // Clearing the placed ships from "shipHarbour"
                selectedEl.style.display = 'none';
            }

            if (currShip.stats.direction === 'vertical') {

                nextEl.style.borderBottom = 'none';
                for (let i = 1; i < +selectedEl.dataset.shiplength; i++) {
                    nextEl = getNext10thEl(nextEl);
                    nextEl.style.backgroundColor = 'rgb(231, 106, 106)';
                    nextEl.style.borderTop = 'none';
                    nextEl.style.borderBottom = 'none';
                    nextEl.textContent = shipIcon;
                }

                // Clearing the placed ships from "shipHarbour"
                selectedEl.style.display = 'none';
            }

            currShip = null;
            selectedEl = null;
        }
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

        this.shipsEl.forEach(ship => {
            ship.style.display = '';
            if (ship.dataset.direction === 'vertical')
                this.rotateShip(ship);
        })
        return;
    }


    handleRandomizeBtn(player, Ship) {
        return function curriedFunc(e) {
            const playerName = this.whosTurn.textContent.toLowerCase().slice(0, 7);
            if (playerName != player.name)
                return;

            const seaBoxAll = document.querySelectorAll('.seaBox');

            // Reset all
            player.gameboard.board = new Array(10).fill().map(() => Array(10).fill(null));
            player.gameboard.ships = [];
            seaBoxAll.forEach(seaBox => {
                seaBox.style.backgroundColor = '';
                seaBox.textContent = '';
                seaBox.style.border = '';
            });

            const board = player.gameboard.board;

            // Place all ships randomly
            for (let shipEl of this.shipsEl) {
                let currShip = new Ship(+shipEl.dataset.shiplength);
                player.gameboard.placeShipRandomly(currShip);
            }


            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {

                    // seaBoxAll.forEach(seaBox => {
                    for (let seaBox of seaBoxAll) {
                        const x = seaBox.dataset.x;
                        const y = seaBox.dataset.y;

                        if (board[y][x] != null) {
                            // console.log(board[y][x]);
                            seaBox.style.backgroundColor = 'rgb(231, 106, 106)';
                            seaBox.textContent = '+';

                            if (board[y][x].stats.direction === 'horizontal') {
                                seaBox.style.borderLeft = 'none';
                                seaBox.style.borderRight = 'none';
                            }
                            if (board[y][x].stats.direction === 'vertical') {
                                seaBox.style.borderTop = 'none';
                                seaBox.style.borderBottom = 'none';
                            }
                        }
                    }
                }
            }
            // Clear all ships from display
            this.shipsEl.forEach(shipEl => shipEl.style.display = 'none');
            console.log(board);
        }
    }

    handleResetBtn(player) {
        return function curriedFunc(e) {
            const playerName = this.whosTurn.textContent.toLowerCase().slice(0, 7);
            if (playerName != player.name)
                return;

            player.gameboard.ships = [];
            player.gameboard.board = new Array(10).fill().map(() => Array(10).fill(null));
            this.resetUI();
            this.createSea(this.sea);
        }
    }
}

export const shipPlacementView1 = new ShipPlacementView();
export const shipPlacementView2 = new ShipPlacementView();