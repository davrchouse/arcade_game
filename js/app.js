// Udacity: Enemies our player must avoid
// * Enemy Section *
var Enemy = function(row, direction, offset) {
    // Udacity: Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.row = row;
    this.direction = direction;
    this.offset = offset;
    this.y = 65 + (row * rowHeight);
    if (direction < 0) {
        this.x = (101 * columns) + offset;
    } else {
        this.x = -101 - offset;
    }
};

// Udacity: Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Udacity: You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // drch: add alternative directions for enemies
    if (this.direction < 0) {
        if (this.x > -101) {
            this.x += this.speed * dt;
        } else {
            this.x = (101 * columns) + 404;
        }
    } else {
        if (this.x < 101 * columns) {
            this.x += this.speed * dt;
        } else {
            this.x = -505;
        }
    }
};

// Udacity: Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // ctx.fillStyle = "rgba(255,0,255,0.75)"; // uncomment to highlight collision zone on each enemy
    // ctx.fillRect(this.x,this.y+78,101,65);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Boris = function(row, direction, offset) {
    Enemy.call(this, row, direction, offset);
    if (direction < 0) {
        this.sprite = 'images/car_boris2.png';
    } else {
        this.sprite = 'images/car_boris.png';
    }
    this.originalSpeed = 23 * direction;
    this.speed = this.originalSpeed;
};
Boris.prototype = Object.create(Enemy.prototype);
Boris.prototype.constructor = Enemy;

var Dmitri = function(row, direction, offset) {
    Enemy.call(this, row, direction, offset);
    if (direction < 0) {
        this.sprite = 'images/car_dmitri2.png';
    } else {
        this.sprite = 'images/car_dmitri.png';
    }
    this.originalSpeed = 88 * direction;
    this.speed = this.originalSpeed;
};
Dmitri.prototype = Object.create(Enemy.prototype);
Dmitri.prototype.constructor = Enemy;

var Gregor = function(row, direction, offset) {
    Enemy.call(this, row, direction, offset);
    if (direction < 0) {
        this.sprite = 'images/car_gregor2.png';
    } else {
        this.sprite = 'images/car_gregor.png';
    }
    this.originalSpeed = 38 * direction;
    this.speed = this.originalSpeed;
};
Gregor.prototype = Object.create(Enemy.prototype);
Gregor.prototype.constructor = Enemy;

var Igor = function(row, direction, offset) {
    Enemy.call(this, row, direction, offset);
    if (direction < 0) {
        this.sprite = 'images/car_igor2.png';
    } else {
        this.sprite = 'images/car_igor.png';
    }
    this.originalSpeed = 68 * direction;
    this.speed = this.originalSpeed;
};
Igor.prototype = Object.create(Enemy.prototype);
Igor.prototype.constructor = Enemy;

var Ivan = function(row, direction, offset) {
    Enemy.call(this, row, direction, offset);
    if (direction < 0) {
        this.sprite = 'images/car_ivan2.png';
    } else {
        this.sprite = 'images/car_ivan.png';
    }
    this.originalSpeed = 128 * direction;
    this.speed = this.originalSpeed;
};
Ivan.prototype = Object.create(Enemy.prototype);
Ivan.prototype.constructor = Enemy;

var Natasha = function(row, direction, offset) {
    Enemy.call(this, row, direction, offset);
    if (direction < 0) {
        this.sprite = 'images/car_natasha2.png'; // drch: ADDED ALTERNATE DIRECTION FOR BUG
    } else {
        this.sprite = 'images/car_natasha.png';
    }
    // this.speed = 168*direction;
    this.originalSpeed = 168 * direction;
    this.speed = this.originalSpeed;
};
Natasha.prototype = Object.create(Enemy.prototype);
Natasha.prototype.constructor = Enemy;

var Theodor = function(row, direction, offset) {
    Enemy.call(this, row, direction, offset);
    if (direction < 0) {
        this.sprite = 'images/car_theodor2.png'; // drch: ADDED ALTERNATE DIRECTION FOR BUG
    } else {
        this.sprite = 'images/car_theodor.png';
    }
    // this.speed = 88*direction;
    this.originalSpeed = 88 * direction;
    this.speed = this.originalSpeed;
};
Theodor.prototype = Object.create(Enemy.prototype);
Theodor.prototype.constructor = Enemy;


// * Player Section *

// drch: Player function for moving player from event listener for input keys (below)
// Udacity: Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = (101 * (columns - 1) / 2);
    this.y = 405;
    this.movementX = 0;
    this.movementY = 0;
    this.sprite = 'images/chicken.png';
};

// drch: translates input key into an x or y movement to add in the update function
Player.prototype.handleInput = function(inputKey) {
    if (keysOn === 1) {
        if (inputKey === "left") {
            this.movementX = -playerSpeed;
            this.sprite = "images/chicken2.png";
        } else if (inputKey === "right") {
            this.movementX = playerSpeed;
            this.sprite = "images/chicken.png";
        } else if (inputKey === "down") {
            this.movementY = playerSpeed;
        } else if (inputKey === "up") {
            this.movementY = -playerSpeed;
        }
    } else {
        this.movementX = 0;
        this.movementY = 0;
    }
};

// drch: keep player in bounds and provide movement
Player.prototype.update = function() {
    if (this.y > 405) {
        this.y = 405;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.x > (101 * 6)) {
        this.x = 101 * 6;
    } else {
        this.x += this.movementX;
        this.y += this.movementY;
        this.movementX = 0;
        this.movementY = 0;
    }
};

Player.prototype.checkCollisions = function() {
    // set collision boundaries
    var goalLine = 130;
    var playerLeft = this.x + 5;
    var playerRight = this.x + 95;
    var playerTop = this.y + 72;
    var playerBottom = this.y + 132;
    var playerMiddle = this.y + 102;
    allEnemies.forEach(function(enemy) {
        var enemyLeft = enemy.x;
        var enemyRight = enemy.x + 101;
        var enemyTop = enemy.y + 78;
        var enemyBottom = enemy.y + 143;
        // look for collisions
        if (
            (
                ((playerTop <= enemyBottom) && (playerTop >= enemyTop)) ||
                ((playerBottom >= enemyTop) && (playerBottom <= enemyBottom)) ||
                ((playerMiddle >= enemyTop) && (playerMiddle <= enemyBottom))
            ) &&
            (
                ((playerLeft >= enemyLeft) && (playerLeft <= enemyRight)) ||
                ((playerRight >= enemyLeft) && (playerRight <= enemyRight))
            )
        ) {
            pauseNum = 1;
        } else if (playerBottom <= goalLine) {
            pauseNum = 2;
        }
    });
};

Player.prototype.crash = function() {
    keysOn = 0;
    if (lives > 1) {
        if (audio.toggle === "on") {
            audio.playHorn();
        }
        // add a delay for seeing the bang image
        if (counter < 30) {
            this.sprite = 'images/bang.png';
            counter += 1;
        } else {
            this.resetPlayer();
            lives -= 1;
            allEnemies.forEach(function(enemy) {
                if (enemy.direction < 0) {
                    enemy.x = (101 * columns) + enemy.offset;
                } else {
                    enemy.x = -101 - enemy.offset;
                }
            });
        }
        // game over
    } else {
        if (counter < 30) {
            this.sprite = 'images/bang.png';
        } else {
            pauseNum = 3;
            lives -= 1;
            allEnemies.forEach(function(enemy) {
                if (enemy.direction < 0) {
                    enemy.x = (101 * columns) + enemy.offset;
                } else {
                    enemy.x = -101 - enemy.offset;
                }
            });
        }
        counter += 1;
    }
};

Player.prototype.resetPlayer = function() {
    this.sprite = 'images/chicken.png';
    this.x = (101 * (columns - 1) / 2);
    this.y = 405;
    keysOn = 1;
    pauseNum = 0;
    counter = 0;
    allEnemies.forEach(function(enemy) {
        if (enemy.direction < 0) {
            enemy.x = (101 * columns) + enemy.offset;
        } else {
            enemy.x = -101 - enemy.offset;
        }
    });
};

Player.prototype.goalLine = function() {
    keysOn = 0;
    if (counter < 320) {
        if (counter < 20) {
            extra.question.color = "black";
            extra.question.Ypos -= 3;
        }
        if (this.x >= 202.5) {
            this.sprite = 'images/chicken2.png';
        } else {
            this.sprite = 'images/chicken.png';
        }
        if (audio.toggle === "on" && counter === 30) {
            if (level < 10) {
                audio.playChicken();
            } else {
                audio.playTada();
            }
        }
        counter += 1;
    } else {
        level += 1;
        this.resetPlayer();
        StartLevel();
    }
};

Player.prototype.render = function() {
    // ctx.fillStyle = "rgba(255,255,0,0.75)"; // uncomment to highlight collision zone for player
    // ctx.fillRect(this.x+5,this.y+72,90,60);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// * Instantiate Section *

// Udacity: Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// drch: make multiple enemies with row, direction, and offset info

var ivanL0 = new Ivan(0, -1, 0);
var theodorL0 = new Theodor(0, -1, 200);
var dmitriL0 = new Dmitri(0, -1, 400);

var borisR1 = new Boris(1, 1, 0);
var natashaR1 = new Natasha(1, 1, 200);
var igorR1 = new Igor(1, 1, 400);

var dmitriL2 = new Dmitri(2, -1, 500);
var gregorL2 = new Gregor(2, -1, 0);
var natashaL2 = new Natasha(2, -1, 800);

var theodorR3 = new Theodor(3, 1, 200);
var igorR3 = new Igor(3, 1, 0);
var ivanR3 = new Ivan(3, 1, 200);

var allEnemies = [];

var player = new Player();


// add more enemies with each coming level
function StartLevel() {
    if (level === 1) {
        allEnemies = [ivanL0, borisR1, gregorL2, igorR3];
    } else if (level === 2) {
        allEnemies.push(dmitriL2, theodorL0);
    } else if (level === 3) {
        allEnemies.push(ivanR3, natashaR1);
    } else if (level === 5) {
        allEnemies.push(theodorR3, natashaL2);
    } else if (level === 6) {
        allEnemies.push(igorR1);
    } else if (level === 10) {
        allEnemies.push(dmitriL0);
    } else if (level === 11) {
        pauseNum = 4;
        keys = 0;
    }
    allEnemies.forEach(function(enemy) {
        enemy.speed = enemy.speed + (2 * level * enemy.direction * difficulty);
    });
}

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

function pushRestart() {
    player.sprite = 'images/chicken.png';
    player.x = (101 * (columns - 1) / 2);
    player.y = 405;
    allEnemies.forEach(function(enemy) {
        if (enemy.direction < 0) {
            enemy.x = (101 * columns) + enemy.offset;
        } else {
            enemy.x = -101 - enemy.offset;
        }
        enemy.speed = enemy.originalSpeed;
    });
    allEnemies = [];
    keysOn = 1;
    pauseNum = 0;
    counter = 0;
    level = 1;
    lives = 5;
    StartLevel();
}