const sea = document.querySelector('.sea');


function createSea() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const div = document.createElement('div');
            sea.appendChild(div);
            div.classList.add('seaBox');
            div.setAttribute('data-coords', `${i}, ${j}`);
        }
    }
}
createSea();