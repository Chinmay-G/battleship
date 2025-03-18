import View from "./view.js";

class GameView extends View {
    player1Sea = document.querySelector('.player1Sea');
    player2Sea = document.querySelector('.player2Sea');

    renderGameSeas() {
        this.createSea(this.player1Sea);
        this.createSea(this.player2Sea);
    }

    shoot(player, target) {
        const x = +target.dataset.x;
        const y = +target.dataset.y;

        if (target.style.backgroundColor === 'rgb(195, 195, 255)' || target.style.backgroundColor === 'rgb(231, 106, 106)') {
            return;
        }

        player.gameboard.receiveAttack([x, y]);

        if (player.gameboard.board[y][x] === null) {
            target.style.backgroundColor = 'rgb(195, 195, 255)';
            target.textContent = 'x';
        } else {
            target.style.backgroundColor = 'rgb(231, 106, 106)';
            target.textContent = '+';
        }
        console.log(player.gameboard.missedShots);
    }
}

export default new GameView();