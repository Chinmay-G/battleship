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


        // // const handleClickOnSea = (e) => {
        // //     const target = e.target;
        // //     this.shoot(player, target);
        // // }

        // const currClass = this;

        // // this.player1Sea.removeEventListener('click', handleClickOnSea);
        // // this.player2Sea.removeEventListener('click', handleClickOnSea);
        // if (who === true) {
        //     this.player2Sea.addEventListener('click', function handleClickOnSea(e) {
        //         const target = e.target;
        //         currClass.shoot(player2, target);
        //         this.removeEventListener('click', handleClickOnSea);

        //         currClass.player1Sea.addEventListener('click', function handleClickOnSea(e) {
        //             const target = e.target;
        //             currClass.shoot(player1, target);
        //             this.removeEventListener('click', handleClickOnSea);
        //         });

        //         return 'Done';
        //     });
        // }
        // if (who === false) {
        // }
    }

    addHandlerAttackSea1(handler) {
        this.player1Sea.addEventListener('click', handler);
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