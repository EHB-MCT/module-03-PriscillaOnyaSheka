let container = document.querySelector('#canvas-container');

let buildings = [];
let numBuildings = 10;
let buildingWidth;
let groundLevel;
let startX;
let animationOffset = 0; // Bonus variabele

function setup() {
    let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent(container);

    // Calculate layout
    buildingWidth = (width * 0.8) / numBuildings;
    startX = width * 0.1;
    groundLevel = height * 0.8;

    // Initialize data
    resetData();

    // 2. Add Event Listeners
    document.getElementById('btn-grow').addEventListener('click', growCity);
    document.getElementById('btn-shrink').addEventListener('click', shrinkCity);
    document.getElementById('btn-reset').addEventListener('click', resetData);
}

function draw() {
    background(255);

    // Draw ground line
    stroke(0);
    line(startX, groundLevel, startX + (numBuildings * buildingWidth), groundLevel);
    noStroke();

    // Bonus: Increment animationOffset
    animationOffset += 0.05;

    // 3. Visualize the Loop
    buildings.forEach((heightVal, index) => {
        let x = startX + (index * buildingWidth);
        
        // Challenge: Map color to height (taller = darker)
        let col = map(heightVal, 0, 150, 220, 50); 
        fill(col);

        // Bonus: Animate height
        let animatedHeight = heightVal + map(sin(animationOffset + index), -1, 1, -10, 10);
        
        let y = groundLevel - animatedHeight;
        rect(x, y, buildingWidth - 2, animatedHeight);
    });
}

function resetData() {
    buildings = [];
    for (let i = 0; i < numBuildings; i++) {
        buildings.push(random(20, 120));
    }
    updateDOM();
}

function growCity() {
    // 4. Grow the City
    buildings = buildings.map(h => h * 1.1);
    updateDOM();
}

function shrinkCity() {
    // 5. Shrink the City
    buildings = buildings.map(h => h * 0.9);
    updateDOM();
}

function updateDOM() {
    let output = document.getElementById('data-output');
    // Rond de getallen mooi af voor de weergave
    output.innerText = buildings.map(b => Math.round(b)).join(", ");
}