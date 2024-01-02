class Node {
    constructor(name){
        this.symbols = []
        this.name = name;
        this.isFinal = false
        this.isInitial = false
        this.outgoingEdges = {}
        this.position = [40, 40]
        this.selected = false;
    }

    overNode=(x,y)=>((this.position[0] - 15 < x && x < this.position[0] + 15) &&
    (this.position[1] - 15 < y && y < this.position[1] + 15))

    show() {
        stroke(150)
        if(this.selected){
            stroke(230, 126, 34)
        } 
        strokeWeight(4);
        
        circle(this.position[0], this.position[1], 30)
        strokeWeight(1);
        text(this.name, this.position[0]-2, this.position[1]+5);
    }
    showSymbols(){
        strokeWeight(4);
        stroke(39, 174, 96)
        circle(this.position[0], this.position[1], 40)
    }
}