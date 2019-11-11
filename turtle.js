/* turtle.js */

const DOWN = 0;
const UP   = 1;

class Turtle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.heading = 0;       
        this.penState = DOWN;
        this.steps = 0;
        this.stack = [];
        this.stroke = null;
    }

    forward(step) {
        // polar to cartesian based on step and heading
        let x = this.x + step * cos(radians(this.heading));
        let y = this.y + step * sin(radians(this.heading));

        if(this.stroke != null) stroke(this.stroke);
        if(this.penState == DOWN) {
            line(this.x, this.y, x, y);
        }

        // update the turtle's position
        this.x = x;
        this.y = y;

        this.steps++;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    moveToAndDraw(x, y) {
        if(this.stroke != null) stroke(this.stroke);

        if(this.penState == DOWN) {
            line(this.x, this.y, x, y);
        }

        this.x = x;
        this.y = y;

        this.steps++;
    }

    right(angle) {
        this.heading += angle;
    }

    left(angle) {
        this.heading -= angle;
    }


    setHeading(angle) {
        this.heading = angle;
    }

    pointTowards(x, y) {

        let adjacent = this.y - y;
        let hypotenuse = dist(this.x, this.y, x, y);
        let theta = degrees(cos(adjacent / hypotenuse));
        
        console.log(theta);

        if(this.x < x) {
            if(this.y < y) {
                this.heading = 90 - theta;
            }
            else if(this.y > y) {
                this.heading = 270 + theta;
            }
        }
        else if(this.x > x) {
            if(this.y < y) {
                this.heading = 90 + theta; 
            }
            else if(this.y > y) {
                this.heading = 180 + theta;
            }
        }

    }

    penDown() {
        this.penState = DOWN;
    }

    penUp() {
        this.penState = UP;
    }

    setStroke(color) {
        this.stroke = color;
    }

    noStroke() {
        this.stroke = null;
    }

    push() {
        this.stack.push({
            "x": this.x,
            "y": this.y,
            "heading": this.heading,
            "penState": this.penState
        });
    }

    pop() {
        let state = this.stack.pop();
        this.x = state.x;
        this.y = state.y;
        this.heading = state.heading;
        this.penState = state.penState;
    }

    clearStack() {
        this.stack = [];
    }
}

