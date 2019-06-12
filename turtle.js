/***************
 ** Turtle.js **
 **************/

class Turtle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.heading = 0;       // Heading in degrees
        this.penState = 0;     // 0 for pen down, 1 for pen up
        this.steps = 0;         // Keeps track of the amount of steps
        this.stack = [];
    }

    forward(step) {
        // polar to cartesian based on step and heading:
        let x1 = this.x + step*cos(radians(this.heading));
        let y1 = this.y + step*sin(radians(this.heading));

        if(this.penState == 0)
            line(this.x, this.y, x1, y1); // connect the old and the new

        // update the turtle's position:
        this.x = x1;
        this.y = y1;

        this.steps++;
    }

    right(angle) {
        this.heading += angle;
    }

    left(angle) {
        this.heading -= angle;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    setHeading(angle) {
        this.heading = angle;
    }

    penDown() {
        this.penState = 0;
    }

    penUp() {
        this.penState = 1;
    }

    push() {
        let state = new TurtleState(this.x, this.y, this.heading);
        this.stack.push(state);
    }

    pop() {
        let state = this.stack.pop();
        this.x = state.x;
        this.y = state.y;
        this.heading = state.heading;
    }

    stackLength() {
        return this.stack.length;
    }
}

class TurtleState {
    constructor(x, y, heading) {
        this.x = x;
        this.y = y;
        this.heading = heading;
    }
}

