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
//var ball = new Ball(canvas.length / 2, canvas.height / 2, 10, '#ccf');

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
    this.score = 0;

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
        if (this.xPos - this.radius <= paddle1.width && this.xVel < 0)
        {
            if (this.yPos - this.radius >= paddle1.pos &&
                this.yPos + this.radius <= paddle1.pos + paddle1.height)
                this.ReboundX();
        }
        if (this.xPos + this.radius >= canvas.width - paddle2.width && this.xVel > 0)
        {
            if (this.yPos - this.radius >= paddle2.pos &&
                this.yPos + this.radius <= paddle2.pos + paddle2.height)
                this.ReboundX();
        }
    }
    this.ReboundX = function ()
    {
        this.xVel *= -1; //rebound
        this.xVel *= 1.1; // speedup
        document.getElementById("paddle collision").load();
        document.getElementById("paddle collision").play();

    }
}

function DrawCanvas()
{
    canvasContext.fillStyle = "#000";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.strokeStyle = "#fff";
    canvasContext.moveTo(canvas.width / 2, 0);
    canvasContext.lineTo(canvas.width / 2, canvas.height);
    canvasContext.stroke();
    DrawScore();
    
}

function DrawScore ()
{
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.color = "#fff";
    ctx.fillText("Hello World", 20, 50);
}

function DrawEverything ()
{
    DrawCanvas();
    paddle1.Draw();
    paddle2.Draw();
    ball.Draw();
    
}


function KeyDownHandler(key) {
    if (key.keyCode == "87")
        paddle1.velocity = paddle1.speed * -1;
    if (key.keyCode == "83")
        paddle1.velocity = paddle1.speed;
    if (key.keyCode == "38")
        paddle2.velocity = paddle2.speed * -1;
    if (key.keyCode == "40")
        paddle2.velocity = paddle2.speed;


}
function KeyUpHandler(key) {
    if (key.keyCode == "87")
        paddle1.velocity = 0;
    if (key.keyCode == "83")
        paddle1.velocity = 0;
    if (key.keyCode == "38")
        paddle2.velocity = 0;
    if (key.keyCode == "40")
        paddle2.velocity = 0;

}
function SpawnBall(direction)
{
    var horizVel = Math.random();
    var vertVel = (Math.random() * 2) - .5;
    ball = new Ball(canvas.length / 2, canvas.height / 2, 10, '#ccf');
    console.log(horizVel);
    console.log(vertVel);
    // set ball spawn horizontal direction and speed
    if (direction == "left")
        ball.xVel = -2.7;
    else if (direction == "right")
        ball.xVel = 2.7;
    else if (horizVel < .5)
        ball.xVel = 2.7;
    else
        ball.xVel = -2.7;
    // set random vertical velocity
    ball.yVel = vertVel;

}

function Main()
{
    
    //var window = document.getElementById(window);

    // initialize keyboard listening
    window.addEventListener("keydown", KeyDownHandler, false);
    // window.addEventListener("keypress", dealWithKeyboard, false);
    window.addEventListener("keyup", KeyUpHandler, false);
    // set frame rate
    var framesPerSecond = 38;
    setInterval(DrawEverything, (1000 / framesPerSecond));
    SpawnBall();
    DrawEverything();
}

Main();