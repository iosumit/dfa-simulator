
const states = [];
const inputs = [];

/**
 * Viewport sectors settings
 */
const sectorSize = 40
let viewWidth = 400;
let viewHeight = 400;
let sectorsHorizontal = 0;
let sectorsVertical = 0;

/**
 * Nodes And Edges settings
 */

const attachingKeyCode = 38;

let selectedState = null;


function setup() {
    // viewWidth = displayWidth;
    // viewHeight = displayWidth;
    const canvas  = createCanvas(viewWidth, viewHeight);
    canvas.parent(document.getElementById('canvas-container'))
    canvas.mousePressed(mousePressedCanvas)
    canvas.mouseReleased(mouseReleasedCanvas)
    canvas.elt.addEventListener("contextmenu", (e) => e.preventDefault())
    sectorsHorizontal = viewWidth / sectorSize;
    sectorsVertical = viewHeight / sectorSize;
}

const getRandomPosition=() => [
    int(random(sectorsHorizontal)) * sectorSize,
    int(random(sectorsVertical)) * sectorSize
]
    


function draw() {
    frameRate(30);
    drawViewport()
    for (let i = 0; i < states.length; i++) {
        states[i].show()
        states[i].showTransistion()
    }
    if(selectedState!=null && keyIsDown(attachingKeyCode)){
        selectedState.showSymbols();
    }
}

let onTransistionKey = null

function keyPressed() {
    // console.log(key, keyCode, onTransistionKey);
    if (selectedState!=null && keyIsDown(attachingKeyCode) && keyCode!=attachingKeyCode){
        onTransistionKey = key;
    }
}

function mousePressedCanvas() {
    if(selectedState!=null && keyIsDown(attachingKeyCode)){
        let toState = selectNode()
        attachState(selectedState, toState, onTransistionKey);
        selectedState.selected = false
        selectedState=null;
        onTransistionKey=null;
    } else {
        if(selectedState!=null){
            selectedState.selected=false;
        }
        selectedState =  selectNode()
        if (selectedState){
            selectedState.selected = true;
            onStateSelect()
        } else {
            onStateReleased()
        }
    }
}

function touchMoved() {
    moveNode()
    return false;
}

function attachState(from, to, on) {
    if(inputs.includes(on) && from!=null && to !=null){
        from.addTransistion(on, to)
        console.log("Attached", from.transition, to.name)
    }
}

function mouseReleasedCanvas() {
    if (selectedState!=null){
        if(!selectedState.overNode(mouseX, mouseY)){
            selectedState.selected = false;
            selectedState = null;
        }
    }
}

function moveNode() {
    if (selectedState!= null && mouseX<viewWidth && mouseY<viewHeight) {
        selectedState.position = [mouseX, mouseY];
    }
}

function selectNode() {
    let newPosition = [0, 0];
    newPosition[0] = mouseX > viewWidth ? viewWidth : mouseX;
    newPosition[1] = mouseY > viewHeight ? viewHeight : mouseY
    for (const n of states) {
        if ((n.position[0] - 15 < newPosition[0] && newPosition[0] < n.position[0] + 15) &&
            (n.position[1] - 15 < newPosition[1] && newPosition[1] < n.position[1] + 15)) {
            return n;
        }
    }
    return null;
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

