// Enemies our player must avoid
var allEnemies = [];

var Enemy = function(name,row,dir) {
    this.name = name;
    this.dir = dir;
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
        if (this.x > 0) {
            this.x-=1;
        } else {
            this.x = 555;
            }
    } else {
        if (this.x < 505) {
            this.x++;
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
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var boris = new Enemy("Boris",0,-1);
var natasha = new Enemy("Natasha",3,1);

var player = new Player();

console.log(allEnemies);



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
