var inc = 0.1;
var scale;
var rows, cols;
var vector_field = [[]];
var particles = [];

var seed = 0;

function setup() {
    var canvas = createCanvas(600,600);
    canvas.parent("test-holder");

    scale = 30;
    cols = floor(width/scale);
    rows = floor(height/scale);

    for(var x = 0; x < cols; x++) {
        for(var y = 0; y < rows; y++) {
            vector_field.push([]);
        }
    }

    for(var i = 0; i < 100; i++) {
        particles[i] = new Particle();
    }
    generate_vector_field();

    /* noLoop(); */
    background(255,250,250);
}


function draw() {

    /* generate_vector_field(); */
    /* draw_vector_field(); */
    draw_particles();

    seed++;
}

class perlin_vector {
    constructor(v, r) {
        this.v = v;
        this.r = r;
    }
}

function Particle() {
    this.pos = createVector(random(width),random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);

    this.update = function() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        // wrap around position
        if(this.pos.x < 0)
            this.pos.x += width;
        if(this.pos.x > width)
            this.pos.x -= width;
        if(this.pos.y < 0)
            this.pos.y += height;
        if(this.pos.y > height)
            this.pos.y -= height;
    }

    this.apply_force = function(force) {
        this.acc.add(force.mult(0.5));
    }

    this.show = function() {
        stroke(0);
        ellipse(this.pos.x, this.pos.y,3);
    }
}


function generate_vector_field() {
    var xoff = 0;
    for(var x = 0; x < rows; x++) {
        var yoff = 0;
        for(var y = 0; y < cols; y++) {
            var r = noise(xoff,yoff);
            var v = p5.Vector.fromAngle(r*10 + seed/360*10);
            vector_field[x][y] = new perlin_vector(v, r);
            yoff += inc;
        }
        xoff += inc;
    }
}

function draw_particles() {
    for(let i = 0; i < particles.length; i++) {
        var p = particles[i];
    
        var vector = vector_field[floor(p.pos.x / scale)][floor(p.pos.y / scale)];
        p.apply_force(vector.v);
        p.update();
        p.show();
    }    
}

function draw_vector_field() {
    for(var x = 0; x < cols; x++) {
        for(var y = 0; y < rows; y++) {
            vector = vector_field[x][y];

            push();
            translate(x * scale, y * scale);
            stroke(0);
            line(0,0,scale*vector.v.x*cos(seed/100),scale*vector.v.y*sin(seed/100));
            pop();
        }
    }
}
