function onBtn() {
    document.location = 'index.html';
}

function listers() {
    brn = document.getElementById('play');
    brn.addEventListener('click', onBtn);
}

document.addEventListener('DOMContentLoaded', listers);
