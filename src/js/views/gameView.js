import View from "./view.js";

class GameView extends View {
    player1Sea = document.querySelector('.player1Sea');
    player2Sea = document.querySelector('.player2Sea');

    renderGameSeas() {
        this.createSea(this.player1Sea);
        this.createSea(this.player2Sea);
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

        // if (target.style.backgroundColor === 'rgb(195, 195, 255)' || target.style.backgroundColor === 'rgb(231, 106, 106)') {
        if (!(target.textContent === '')) {
            return true;
        }

        player.gameboard.receiveAttack([x, y]);

        let missedIcon;
        const randomNum = Math.random();
        // if (randomNum <= 0.25) missedIcon = '🪼';
        if (randomNum <= 0.5) missedIcon = '🌊';
        if (randomNum > 0.5 && randomNum <= 0.75) missedIcon = '🐬';
        if (randomNum > 0.75) missedIcon = '🐳';

        if (player.gameboard.board[y][x] === null) {
            // target.style.backgroundColor = 'rgb(195, 195, 255)';
            target.textContent = missedIcon;
        } else {
            const ship = player.gameboard.board[y][x];
            const img = document.createElement('img');
            img.src = 'https://media.tenor.com/2FL76f6q7u8AAAAi/explosion.gif';
            // img.width = '100px';
            target.appendChild(img);
            setTimeout(() => {
                target.removeChild(img)

                target.style.backgroundColor = ship.stats.backgroundColor;
                target.textContent = `${ship.stats.shipIcon}`;
                target.style.border = 'none';
            }, 1000);
        }
        // console.log(player.gameboard.missedShots);
    }
}

export default new GameView();