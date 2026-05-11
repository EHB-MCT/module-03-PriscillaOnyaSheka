let container = document.querySelector('#canvas-container');

let characters = [];
let cols = 60;
let rows = 40;
let cellW, cellH;

function setup() {
    let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent(container);

    textFont('Share Tech Mono');
    textAlign(CENTER, CENTER);

    cellW = width / cols;
    cellH = height / rows;

    // 2. Initialize Data
    for (let i = 0; i < (rows * cols); i++) {
        let x = (i % cols) * cellW + cellW / 2;
        let y = floor(i / cols) * cellH + cellH / 2;
        let randomChar = String.fromCharCode(floor(random(65, 91)));
        
        characters.push({
            char: randomChar,
            x: x,
            y: y,
            found: false
        });
    }

    // Luister naar input veranderingen
    let searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', updateSearch);
}

function draw() {
    background(255);

    // 3. Draw the Grid
    characters.forEach(item => {
        if (item.found) {
            fill(0);
            textStyle(BOLD);
        } else {
            fill(200);
            textStyle(NORMAL);
        }
        text(item.char, item.x, item.y);
    });
}

function updateSearch() {
    // Eerst: Reset alle objecten
    characters.forEach(item => item.found = false);

    let inputVal = this.value.toUpperCase();
    let searchChars = inputVal.split('');
    let lastFoundIndex = -1;

    // Loop door de ingetypte letters
    for (let i = 0; i < searchChars.length; i++) {
        let targetChar = searchChars[i];
        
        // Zoek de index van het matching karakter, MAAR de index moet hoger zijn dan lastFoundIndex
        let foundIdx = characters.findIndex((item, index) => {
            return item.char === targetChar && index > lastFoundIndex;
        });

        // Als we de letter in de juiste volgorde vinden, updaten we de status
        if (foundIdx !== -1) {
            characters[foundIdx].found = true;
            lastFoundIndex = foundIdx; // Update de index voor de volgende letter!
        }
    }
}