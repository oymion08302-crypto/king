let currentCountry = null;

document.querySelectorAll('#map path').forEach(p => {
    p.addEventListener('click', () => {
        currentCountry = p.id;
        console.log(currentCountry); // "ria"
    });
});


const riabtn = document.querySelector('.riabtn');
const viewer = document.getElementById('viewer');

riabtn.addEventListener('click', () => {
    viewer.classList.remove('hidden');

    if (!window.p5Started) {
        startP5();
        window.p5Started = true;
    }
});

document.getElementById('close3d').addEventListener('click', () => {
    viewer.classList.add('hidden');
});