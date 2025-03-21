export function getNext10thEl(el) {
    let nextEl = el;
    for (let i = 0; i < 10; i++) {
        if (!nextEl) return;
        nextEl = nextEl.nextSibling;
    }
    return nextEl;
}

function getprevious10thEl(el) {
    let nextEl = el;
    for (let i = 0; i < 10; i++)
        nextEl = nextEl.previousSibling;
    return nextEl;
}