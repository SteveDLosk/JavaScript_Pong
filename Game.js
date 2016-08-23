// This is the main code file for the CyberPong Game
// The key game logic and key objects are here

var canvas = new Object();
canvas = document.getElementById('gameCanvas');
canvasContext = canvas.getContext('2d');

// canvas properties
canvas.height = 600;
canvas.length = 800;
canvas.color = "#000";

// instantiate paddles and ball
var paddle1 = new Paddle("left");
var paddle2 = new Paddle("right");
var ball = new Ball(canvas.length / 2, canvas.height / 2, 10, '#ccf');

function Paddle(side)
{
    // properties
    this.color = "#fff";
    this.width = 12;
    this.height = 80;
    this.pos = 300; // paddle pos is the top of the paddle
    this.center = this.pos + (this.height / 2);
    this.speed = 4;  // raw speed; either direction
    this.velocity = 0;  // directional, pos is down, neg is up
    this.xPos;

    if (side == "left")
        this.xPos = 0;
    else if (side == "right")
        this.xPos = canvas.width - this.width;
    // methods
    this.Draw = function ()
    {
        this.Update();
        var context = canvas.getContext('2d');
        context.fillStyle = this.color;
        context.fillRect(this.xPos, this.pos, this.width, this.height);
    }

    this.Update = function()
    {
        this.pos += this.velocity;
        
        // Keep paddle on screen
        if (this.pos < 0)
            this.pos = 0;
        else if (this.pos + this.height > canvas.height)
            this.pos = canvas.height - this.height;
    }

    
}

function Ball(xPos, yPos, radius, color)
{
    // properties
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.color = color;

    this.xVel = 0;
    this.yVel = 0;

    // methods
    this.Draw = function ()
    {
        this.Update();
        var context = canvas.getContext('2d');
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 0;
        context.strokeStyle = '#003300';
        context.stroke();
    }

    this.Update = function ()
    {
        this.xPos += this.xVel;
        this.yPos += this.yVel;

        // vertical rebound
        if (this.yPos - this.radius <= 0 || this.yPos + this.radius >= canvas.height)
            this.yVel *= -1;
        // horizontal rebound
            // TODO
    }
}

function DrawCanvas()
{
    canvasContext.fillStyle = "#000";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.strokeStyle = "fff";
    canvasContext.moveTo(canvas.width / 2, 0);
    canvasContext.lineTo(canvas.width / 2, canvas.height);
    canvasContext.stroke();
}
function DrawEverything ()
{
    DrawCanvas();
    console.log("Drew canvas");
    paddle1.Draw();
    paddle2.Draw();
    ball.Draw();
    console.log("Drew ball");
}

function Main()
{
    DrawEverything();
}

Main();