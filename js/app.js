// Enemies our player must avoid
var allEnemies = [];

var Enemy = function(name,row,dir,speed) {
    this.name = name;
    this.dir = dir;
    this.speed = speed;
    if (dir < 0) {
        this.x = 555;
        this.sprite = 'images/enemy-bug2.png'; // ADDED ALTERNATE DIRECTION FOR BUG
    } else {
        this.x = 0;
        this.sprite = 'images/enemy-bug.png';
    }
    this.y = 60 + (row * 83);
    allEnemies.push(this);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // ADDED ALTERNATE DIRECTION FOR BUG
    if (this.dir < 0) {
        if (this.x > -100) {
            this.x-=this.speed*dt;
        } else {
            this.x = 555;
            }
    } else {
        if (this.x < 555) {
            this.x +=this.speed*dt;
        } else {
            this.x = 0;
        }
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.x = (405 / 2);
    this.y = 405;
    this.movementX = 0;
    this.movementY = 0;
    this.sprite = 'images/char-boy.png';
};

// handleInput function of each player that translates input key into
// an x or y movement to add in the update function
Player.prototype.handleInput = function(inputKey) {
    if (inputKey === "left") {
        this.movementX = -30;
    }
    else if (inputKey === "right") {
        this.movementX = 30;
    }
     else if (inputKey === "down") {
        this.movementY = 30;
    }
     else if (inputKey === "up") {
        this.movementY = -30;
    }
};

Player.prototype.update = function() {
    if (this.y > 435) {
        this.y = 435;
    } else if (this.x < -10) {
        this.x = -10;
    } else if (this.y < -10) {
        this.y = -10;
    } else if (this.x > 412) {
        this.x = 412;
    } else {
    this.x += this.movementX;
    this.y += this.movementY;
    this.movementX = 0;
    this.movementY = 0;
    }
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var boris = new Enemy("Boris",0,-1,200);
var natasha = new Enemy("Natasha",3,1,50);
var igor = new Enemy("Igor",2,-1,150);
var dmitri = new Enemy("Dmitri",1,1,100);

var player = new Player();

console.log(allEnemies);
console.log(player);



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
