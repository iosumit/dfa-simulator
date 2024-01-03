
const nodes = [];
const inputs = [];

/**
 * Viewport sectors settings
 */
const sectorSize = 40
let viewWidth = 600;
let viewHeight = 600;
let sectorsHorizontal = 0;
let sectorsVertical = 0;

/**
 * Nodes And Edges settings
 */

let selected = null;

function setup() {
    // viewWidth = displayWidth;
    // viewHeight = displayWidth;
    createCanvas(viewWidth, viewHeight);
    sectorsHorizontal = viewWidth / sectorSize;
    sectorsVertical = viewHeight / sectorSize;
    // textFont(font);

    for (let i = 0; i < 2; i++) {
        let n = new Node(i);
        n.position[0] = int(random(sectorsHorizontal)) * sectorSize
        n.position[1] = int(random(sectorsVertical)) * sectorSize
        nodes.push(n);
    }
}

function draw() {
    frameRate(30);
    drawViewport()
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].show()
    }
    if(selected!=null && keyIsDown(17) ){
        selected.showSymbols();
    }
}

function keyPressed() {
    console.log(key, keyCode);
    if (selected!=null && keyCode==18){
        selected.showSymbols();
    }
}

function mousePressed() {
    selectNode()
}

function touchMoved() {
    moveNode()
    return false;
}

function mouseReleased() {
    if (selected!=null){
        if(!selected.overNode(mouseX, mouseY)){
            selected.selected = false;
            selected.drawSymbols = false;
            selected = null;
        }
    }
}

function moveNode() {
    if (selected != null) {
        let newPosition = [0, 0];
        newPosition[0] = mouseX > viewWidth ? viewWidth : mouseX;
        newPosition[1] = mouseY > viewHeight ? viewHeight : mouseY
        selected.position = newPosition;
    }
}

function selectNode() {
    if(selected!=null){
        selected.selected=false;
    }
    let newPosition = [0, 0];
    newPosition[0] = mouseX > viewWidth ? viewWidth : mouseX;
    newPosition[1] = mouseY > viewHeight ? viewHeight : mouseY
    for (const n of nodes) {
        if ((n.position[0] - 15 < newPosition[0] && newPosition[0] < n.position[0] + 15) &&
            (n.position[1] - 15 < newPosition[1] && newPosition[1] < n.position[1] + 15)) {
            selected = n;
            selected.selected = true;
            break;
        }
    }
}


function drawViewport() {
    background(240)
    stroke(200)
    strokeWeight(1);
    for (let i = 0; i < sectorsHorizontal; i++) {
        let x = i * sectorSize;
        line(x, 0, x, viewHeight);
    }
    for (let i = 0; i < sectorsVertical; i++) {
        let y = i * sectorSize;
        line(0, y, viewWidth, y);
    }
}

