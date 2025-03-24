const starterPage = document.querySelector('.starterPage');
const player1Input = document.querySelector('#player1Name');
const player2Input = document.querySelector('#player2Name');
const submitPlayersNameBtn = document.querySelector('.submitPlayersNameBtn');

class StarterPageView {
    returnPlayerNames() {
        const player1Name = player1Input.value ? player1Input.value : 'player1';
        const player2Name = player2Input.value ? player2Input.value : 'player2';
        starterPage.classList.add('hidden');
        return { player1Name, player2Name };
    }
}

export default new StarterPageView();