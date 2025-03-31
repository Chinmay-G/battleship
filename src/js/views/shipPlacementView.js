import View from "./view.js";
import { getNext10thEl, updateSeaUI } from "../helper.js";

class ShipPlacementView extends View {

    shipPlacementPage = document.querySelector('.shipPlacementPage');
    whosTurn = document.querySelector('.whosTurn');
    sea = document.querySelector('.sea');
    seaBoxAll = document.querySelectorAll('.seaBox');
    shipsEl = document.querySelectorAll('.ship');
    readyBtn = document.querySelector('.shipPlacementPage-btn-ready');
    randomizeBtn = document.querySelector('.shipPlacementPage-btn-randomize');
    resetBtn = document.querySelector('.shipPlacementPage-btn-reset');
    buttons = document.querySelectorAll('button');

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
            const board = player.gameboard.board;
            const shipIcon = selectedEl.dataset.shipicon;

            // Update Sea's display
            updateSeaUI(board);
            // let bgColor;
            // if (currShip.stats.shipLength === 5) bgColor = carrierColor;
            // if (currShip.stats.shipLength === 4) bgColor = battleshipColor;
            // if (currShip.stats.shipLength === 3) bgColor = cruiserColor;
            // if (currShip.stats.shipLength === 2) bgColor = destroyerColor;

            // target.style.backgroundColor = bgColor;
            // target.textContent = shipIcon;

            // let nextEl = target;

            // if (currShip.stats.direction === 'horizontal') {

            //     nextEl.style.borderRight = 'none';
            //     for (let i = 1; i < +selectedEl.dataset.shiplength; i++) {
            //         nextEl = nextEl.nextSibling;
            //         nextEl.style.backgroundColor = bgColor;
            //         nextEl.style.borderRight = 'none';
            //         nextEl.style.borderLeft = 'none';
            //         nextEl.textContent = shipIcon;
            //     }

            //     // Clearing the placed ships from "shipHarbour"
            //     selectedEl.style.display = 'none';
            // }

            // if (currShip.stats.direction === 'vertical') {

            //     nextEl.style.borderBottom = 'none';
            //     for (let i = 1; i < +selectedEl.dataset.shiplength; i++) {
            //         nextEl = getNext10thEl(nextEl);
            //         nextEl.style.backgroundColor = bgColor;
            //         nextEl.style.borderTop = 'none';
            //         nextEl.style.borderBottom = 'none';
            //         nextEl.textContent = shipIcon;
            //     }

            //     // Clearing the placed ships from "shipHarbour"
            //     selectedEl.style.display = 'none';
            // }

            selectedEl.style.display = 'none';
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
            const playerName = this.whosTurn.textContent.toLowerCase().slice(0, -7);
            if (playerName != player.name)
                return;

            const seaBoxAll = document.querySelectorAll('.seaBox');

            // Reset all
            player.gameboard.board = new Array(10).fill().map(() => Array(10).fill(null));
            player.gameboard.ships = [];
            seaBoxAll.forEach(seaBox => {
                seaBox.style.backgroundColor = '';
                seaBox.textContent = '';
                seaBox.classList.remove('carrierIcon', 'battleshipIcon', 'cruiserIcon', 'destroyerIcon');
                seaBox.style.border = '';
            });

            const board = player.gameboard.board;

            // Place all ships randomly
            for (let shipEl of this.shipsEl) {
                let currShip = new Ship(+shipEl.dataset.shiplength);
                player.gameboard.placeShipRandomly(currShip);
            }

            // Update Sea's display
            updateSeaUI(board);

            // Clear all ships from display
            this.shipsEl.forEach(shipEl => shipEl.style.display = 'none');
            console.log(board);
        }
    }

    handleResetBtn(player) {
        return function curriedFunc(e) {
            const playerName = this.whosTurn.textContent.toLowerCase().slice(0, -7);
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