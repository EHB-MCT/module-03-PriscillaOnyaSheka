let sizes = [];
let cols = 10;
let rows = 10;
let numCircles = cols * rows;

// Stores index for find function
let foundIndex = -1;

function setup() {
    let container = document.getElementById('canvas-container');
    let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('canvas-container');
    textAlign(CENTER, CENTER);

    resetData();

    // DOM Listeners
    document.getElementById('btn-find').addEventListener('click', findValue);
    document.getElementById('btn-sort-up').addEventListener('click', sortUp);
    document.getElementById('btn-sort-down').addEventListener('click', sortDown);
    document.getElementById('btn-reset').addEventListener('click', resetData);
}

function draw() {
    background(255); 

    let cellW = width / cols;
    let cellH = height / rows;

    // Loop door de sizes en teken de grid
    for(let i = 0; i < sizes.length; i++) {
        let x = (i % cols) * cellW + cellW / 2;
        let y = floor(i / cols) * cellH + cellH / 2;
        
        // Highlight in het rood als het de gevonden index is
        if (i === foundIndex) {
            fill(255, 0, 0);
        } else {
            fill(100, 150, 255);
        }
        
        ellipse(x, y, sizes[i], sizes[i]);
        
        fill(0);
        textSize(10);
        text(Math.round(sizes[i]), x, y);
    }
}

function resetData() {
    sizes = [];
    foundIndex = -1;
    for(let i = 0; i < numCircles; i++) {
        sizes.push(random(10, 40));
    }
    calculateStats();
}

function findValue() {
    let inputVal = Number(document.getElementById('find-input').value);
    
    // Zoek het eerste getal dat groter of gelijk is aan de input (bijvoorbeeld)
    // Of zoek exact door Math.round(val) === inputVal te gebruiken.
    foundIndex = sizes.findIndex(val => Math.round(val) === inputVal);

    if (foundIndex === -1) {
        alert("Value not found!");
    }
}

function sortUp() {
    sizes.sort((a, b) => a - b);
    foundIndex = -1; // Reset de index omdat posities veranderd zijn
}

function sortDown() {
    sizes.sort((a, b) => b - a);
    foundIndex = -1; // Reset de index omdat posities veranderd zijn
}

function calculateStats() {
    // 4. Bereken statistieken met .reduce()
    let totalMass = sizes.reduce((acc, currentVal) => acc + currentVal, 0);
    let avgSize = totalMass / sizes.length;

    document.getElementById('total-mass').innerText = Math.round(totalMass);
    document.getElementById('avg-size').innerText = Math.round(avgSize);
}