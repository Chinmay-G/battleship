export default class View {
    createSea(parent) {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const div = document.createElement('div');
                parent.appendChild(div);
                div.classList.add('seaBox');
                div.setAttribute('data-x', j);
                div.setAttribute('data-y', i);
            }
        }
    }
}
