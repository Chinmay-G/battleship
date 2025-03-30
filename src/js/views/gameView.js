import View from "./view.js";
import { styleSeaBoxOnHit } from "../helper.js";
import { iconClasses } from "../config.js";

const whosTurn = document.querySelector('.gamePage-WhosTurn');
const player1Board = document.querySelector('.player1Board');
const player2Board = document.querySelector('.player2Board');
const restartBtn = document.querySelector('.restart-btn');

class GameView extends View {
    player1Sea = document.querySelector('.player1Sea');
    player2Sea = document.querySelector('.player2Sea');

    renderGameSeas(player1Name, player2Name) {
        whosTurn.textContent = `${player1Name.slice(0, 1).toUpperCase() + player1Name.slice(1)}'s Turn!`;
        player1Board.textContent = `${player1Name.slice(0, 1).toUpperCase() + player1Name.slice(1)}'s Board`;
        player2Board.textContent = `${player2Name.slice(0, 1).toUpperCase() + player2Name.slice(1)}'s Board`;
        this.createSea(this.player1Sea);
        this.createSea(this.player2Sea);
        restartBtn.addEventListener('click', function (e) {
            window.location.reload();
        })
    }

    // Recieve Attack
    addHandlerAttackSea(handler) {
        this.player2Sea.addEventListener('click', handler);
    }

    // May use LATER for refactoring // TEMP
    addHandlerAttackSea1(handler) {
        this.player1Sea.addEventListener('click', handler);
    }


    shoot(player, target) {
        const x = +target.dataset.x;
        const y = +target.dataset.y;

        console.log(iconClasses.some(iconClass => target.classList.contains(iconClass)));
        // if (target.style.backgroundColor === 'rgb(195, 195, 255)' || target.style.backgroundColor === 'rgb(231, 106, 106)') {
        if (!(target.textContent === '') || iconClasses.some(iconClass => target.classList.contains(iconClass))) {
            return true;
        }

        player.gameboard.receiveAttack([x, y]);

        let missedIcon = 'x';
        // const randomNum = Math.random();
        // // if (randomNum <= 0.25) missedIcon = '🪼';
        // if (randomNum <= 0.5) missedIcon = '🌊';
        // if (randomNum > 0.5 && randomNum <= 0.75) missedIcon = '🐬';
        // if (randomNum > 0.75) missedIcon = '🐳';

        if (player.gameboard.board[y][x] === null) {
            // target.style.backgroundColor = 'rgb(195, 195, 255)';
            target.textContent = missedIcon;
            target.style.color = 'whitesmoke';
        } else {
            const currShip = player.gameboard.board[y][x];
            const img = document.createElement('img');
            // img.src = 'https://media.tenor.com/2FL76f6q7u8AAAAi/explosion.gif';
            img.src = 'src/imgs/explosion.gif';
            // img.width = '100px';
            target.appendChild(img);
            setTimeout(() => {
                target.removeChild(img)

                // target.style.backgroundColor = ship.stats.backgroundColor;
                // target.textContent = `${ship.stats.shipIcon}`;
                // target.style.border = 'none';
                styleSeaBoxOnHit(target, currShip);
            }, 1000);
        }
        whosTurn.textContent = `${player.name.slice(0, 1).toUpperCase() + player.name.slice(1)}'s Turn!`;
    }
}

export default new GameView();