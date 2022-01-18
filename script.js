
const canvas = document.getElementById("field");
const context = canvas.getContext("2d");

class Area {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.fillColor = "#f2f2f2";
        this.balls = [];
        this.draw();
    };
    
    addBall() {
        const newBall = new Ball(this.canvas,this.context,20,randomColor());
        this.balls.push(newBall);
    };
    
    clear() {
        this.balls = [];
    };
    
    draw() {
        this.context.fillStyle = this.fillColor;
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.balls.forEach(ball => ball.draw());
        requestAnimationFrame(() => this.draw());
    };
}

class Ball {
    constructor(canvas, context, size, color) {
        this.canvas = canvas;
        this.context = context;
        this.size = size;
        this.color = color;
        this.pos = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };
        this.vel = {
            x: 1,
            y: 1,
            xspeed: random(10),
            yspeed: random(10)
        };
    };
    
    draw() {
        this.update();
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.pos.x, this.pos.y,this.size,0,Math.PI * 2);
        this.context.fill();
    };
    
    update() {
        this.pos.x += this.vel.x * this.vel.xspeed;
        this.pos.y += this.vel.y * this.vel.yspeed;
        if (this.pos.x < this.size || this.pos.x > this.canvas.width - this.size) {
            this.vel.x *= -1;
         }
        if (this.pos.y < this.size || this.pos.y > this.canvas.height - this.size) {
            this.vel.y *= -1;
        }
    };
}


function random(upper) {
    return Math.floor(Math.random() * upper + 1);
};

function randomColor() {
    const colors = ["#00aba9", "#ff0097","#f44747", "#1ba1e2","#f09609", "#ff71ce","#01cdfe", "#05ffa1","#b967ff", "#fffb96","#966842", "#4c833f"];
    return colors[random(colors.length) - 1];
};

function resize() {
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", 900);
}

window.onload = resize;

const generateButton = document.getElementById("generate");

const clearButton = document.getElementById("clear");

generateButton.addEventListener("click", function() {
    field.addBall();
});

clearButton.addEventListener("click", function() {
    field.clear();
});

const field = new Area(canvas, context);

