class State {
    constructor(name){
        this.name = name;
        this.isFinal = false
        this.isInitial = false
        this.transition = new Map()
        this.position = [40, 40]
        this.selected = false;
    }

    addTransistion=(on, to)=>{
        let d = dist(this.position[0], this.position[1], to.position[0], to.position[1]);
        let edge = {
            state:to,
            controlPoint1:[random(d),random(d)],
            controlPoint2:[random(d),random(d)]
        }
        this.transition.set(on, edge)
    }

    deleteTransistion=(on)=>this.transition.delete(on)

    overNode=(x,y)=>((this.position[0] - 15 < x && x < this.position[0] + 15) &&
    (this.position[1] - 15 < y && y < this.position[1] + 15))

    show() {
        // fill(255)
        stroke(150)
        if(this.selected){
            stroke(230, 126, 34)
        } 
        strokeWeight(4);
        
        circle(this.position[0], this.position[1], 30)
        strokeWeight(1);
        text(this.name, this.position[0]-2, this.position[1]+5);
    }
    showTransistion(){
        stroke(241, 196, 15)
        noFill();
        for (const [on, edge] of this.transition) {
            line(this.position[0], this.position[1], edge.state.position[0], edge.state.position[1])
        }
    }

    showSymbols(){
        strokeWeight(4);
        stroke(39, 174, 96)
        circle(this.position[0], this.position[1], 40)
    }
}