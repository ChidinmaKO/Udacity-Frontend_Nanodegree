const btnRestart = document.getElementsByClassName('btn_restart');
const btnBegin = document.querySelector('.btn_begin');
const players = document.getElementsByName('player');
const canvas = document.querySelector('.canvas');
const endGame = document.querySelector('.end_game');
const beginGame = document.querySelector('.begin_game');

let endPlayer = document.querySelector('.end_player');
let endMessage = document.querySelector('.end_message');
let totalLives = document.querySelectorAll('.lives');
let totalPoints = document.querySelectorAll('.points');

let pointsCount = 0;
let collisionCount = 0;
let allPoints = [];



const Game = function() {
    this.width = 505;
    this.height = 606;
    this.speed  = 150;
    this.x = 202;
    this.y = 405;
}

const game = new Game();

// Basic stuff we need to begin the game
Game.prototype.begin = function() {
    beginGame.classList.add('conceal');
    endGame.classList.add('conceal');
    canvas.classList.remove('conceal');
    collisionCount = 0;
    pointsCount = 0;
    totalLives.innerHTML = 3 - collisionCount;
    totalPoints.innerHTML = pointsCount;
}

// To restart the game... second and third container
Game.prototype.restart = function() {
    canvas.classList.add('conceal');
    beginGame.classList.remove('conceal');
    endGame.classList.add('conceal');
}

Game.prototype.end = function() {
    canvas.classList.add('conceal');
    beginGame.classList.add('conceal');
    endGame.classList.remove('conceal');
}

const start = () => {
    player.x = 202;
    player.y = 405;
    allPoints = [];
}

/*
* 1. the user can select the player character before the game start.
* 2. There are gems which the player has to get before getting to the river.
* 3. There are 3 lives which decreases when the player collides with the bugs.
* 4. There are points which increases when the player gets the gems and finally gets to the river.
* 5. The game ends when the 3 lives are exhausted.
* 6. There is a pop up at the end of the game.
*/



// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.gameWidth = 505;
    this.gameHeight = 606;
    this.speed = 150;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // console.log(dt);
    // You should multiply any movement by the dt parameter
    this.x += this.speed * dt;
    // this.x += 1;
    // console.log(this.x);
    
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x > this.gameWidth) {
        this.x = -100;
        this.speed = 150 + Math.floor(Math.random() * 220);
        // console.log(this.speed);
    }

    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    }
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    }
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (keyPress == 'down' && this.y < 405) {
        this.y +=83;
    }
    
    if (this.y < 0) {
        setTimeout(function () {
            player.x = 202;
            player.y = 405;
        }, 500);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(-200, 58), new Enemy(-150, 145), new Enemy(-300, 224), new Enemy(605, 141)];
// Place the player object in a variable called player
var player = new Player(202, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
