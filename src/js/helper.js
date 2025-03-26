import { carrierColor, battleshipColor, cruiserColor, destroyerColor } from "./config.js";

export function getNext10thEl(el) {
    let nextEl = el;
    for (let i = 0; i < 10; i++) {
        if (!nextEl) return;
        nextEl = nextEl.nextSibling;
    }
    return nextEl;
}

export function updateSeaUI(board) {
    const seaBoxAll = document.querySelectorAll('.seaBox');
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {

            // seaBoxAll.forEach(seaBox => {
            for (let seaBox of seaBoxAll) {
                const x = seaBox.dataset.x;
                const y = seaBox.dataset.y;

                if (board[y][x] != null) {
                    const currShip = board[y][x];

                    let bgColor;
                    let iconClass;
                    if (currShip.stats.shipLength === 5) {
                        bgColor = carrierColor;
                        iconClass = 'carrierIcon';
                    }
                    if (currShip.stats.shipLength === 4) {
                        bgColor = battleshipColor;
                        iconClass = 'battleshipIcon';
                    }
                    if (currShip.stats.shipLength === 3) {
                        bgColor = cruiserColor;
                        iconClass = 'cruiserIcon';
                    }
                    if (currShip.stats.shipLength === 2) {
                        bgColor = destroyerColor;
                        iconClass = 'destroyerIcon';
                    }

                    // console.log(board[y][x]);
                    seaBox.style.backgroundColor = bgColor;
                    seaBox.classList.add(iconClass);
                    // seaBox.textContent = '+';

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
}

export function styleSeaBoxOnHit(seaBox, currShip) {
    let bgColor;
    let iconClass;
    if (currShip.stats.shipLength === 5) {
        bgColor = carrierColor;
        iconClass = 'carrierIcon';
    }
    if (currShip.stats.shipLength === 4) {
        bgColor = battleshipColor;
        iconClass = 'battleshipIcon';
    }
    if (currShip.stats.shipLength === 3) {
        bgColor = cruiserColor;
        iconClass = 'cruiserIcon';
    }
    if (currShip.stats.shipLength === 2) {
        bgColor = destroyerColor;
        iconClass = 'destroyerIcon';
    }

    // console.log(board[y][x]);
    seaBox.style.backgroundColor = bgColor;
    seaBox.classList.add(iconClass);
    seaBox.style.border = 'none';
}

function getprevious10thEl(el) {
    let nextEl = el;
    for (let i = 0; i < 10; i++)
        nextEl = nextEl.previousSibling;
    return nextEl;
}