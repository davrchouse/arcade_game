// Udacity: Enemies our player must avoid
// drch: add array for all enemies;

var Enemy = function(row,direction) {
    // Udacity: Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.row = row;
    this.direction = direction;
    this.y = 65 + (row * rowHeight);
    if (direction < 0) {
        this.x = (101*columns);
    } else {
        this.x = -101;
    }
};

// Udacity: Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // drch ADDED ALTERNATE DIRECTION FOR BUG
    // Udacity: You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.direction < 0) {
        if (this.x > -101) {
            this.x+=this.speed*dt;
        } else {
            this.x = (101*columns);
            }
    } else {
        if (this.x < 101*columns) {
            this.x +=this.speed*dt;
        } else {
            this.x = -101;
        }
    }
};

// Udacity: Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // ctx.fillStyle = "rgba(100,100,100,0.5)"; // uncomment to highlight total png for each enemy
    // ctx.fillRect(this.x,this.y,101,171);
    // ctx.fillStyle = "rgba(255,0,255,0.75)"; // uncomment to highlight collision zone on each enemy
    // ctx.fillRect(this.x,this.y+78,101,65);
    // ctx.fillStyle = "red";   // uncomment to see goalLine
    // ctx.fillRect(0,132,500,4);
    // ctx.fillStyle = "blue"; // uncomment to see division lines (83 pixels apart)
    // ctx.fillRect(0,215,500,4);
    // ctx.fillRect(0,298,500,4);
    // ctx.fillRect(0,381,500,4);
    // ctx.fillRect(0,464,500,4);
    // ctx.fillRect(0,547,500,4);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Boris = function(row,direction) {
    Enemy.call(this,row,direction);
    if (direction < 0) {
        this.sprite = 'images/car_boris2.png'; // drch: ADDED ALTERNATE DIRECTION FOR BUG
    } else {
        this.sprite = 'images/car_boris.png';
    }
    this.speed = 23*direction;
};
Boris.prototype = Object.create(Enemy.prototype);
Boris.prototype.constructor = Enemy;

var Dmitri = function(row,direction) {
    Enemy.call(this,row,direction);
    if (direction < 0) {
        this.sprite = 'images/car_dmitri2.png'; // drch: ADDED ALTERNATE DIRECTION FOR BUG
    } else {
        this.sprite = 'images/car_dmitri.png';
    }
    this.speed = 58*direction;
};
Dmitri.prototype = Object.create(Enemy.prototype);
Dmitri.prototype.constructor = Enemy;

var Gregor = function(row,direction) {
    Enemy.call(this,row,direction);
    if (direction < 0) {
        this.sprite = 'images/car_gregor2.png'; // drch: ADDED ALTERNATE DIRECTION FOR BUG
    } else {
        this.sprite = 'images/car_gregor.png';
    }
    this.speed = 48*direction;
};
Gregor.prototype = Object.create(Enemy.prototype);
Gregor.prototype.constructor = Enemy;

var Igor = function(row,direction) {
    Enemy.call(this,row,direction);
    if (direction < 0) {
        this.sprite = 'images/car_igor2.png'; // drch: ADDED ALTERNATE DIRECTION FOR BUG
    } else {
        this.sprite = 'images/car_igor.png';
    }
    this.speed = 68*direction;
};
Igor.prototype = Object.create(Enemy.prototype);
Igor.prototype.constructor = Enemy;

var Ivan = function(row,direction) {
    Enemy.call(this,row,direction);
    if (direction < 0) {
        this.sprite = 'images/car_ivan2.png'; // drch: ADDED ALTERNATE DIRECTION FOR BUG
    } else {
        this.sprite = 'images/car_ivan.png';
    }
    this.speed = 78*direction;
};
Ivan.prototype = Object.create(Enemy.prototype);
Ivan.prototype.constructor = Enemy;

var Natasha = function(row,direction) {
    Enemy.call(this,row,direction);
    if (direction < 0) {
        this.sprite = 'images/car_natasha2.png'; // drch: ADDED ALTERNATE DIRECTION FOR BUG
    } else {
        this.sprite = 'images/car_natasha.png';
    }
    this.speed = 98*direction;
};
Natasha.prototype = Object.create(Enemy.prototype);
Natasha.prototype.constructor = Enemy;

var Theodor = function(row,direction) {
    Enemy.call(this,row,direction);
    if (direction < 0) {
        this.sprite = 'images/car_theodor2.png'; // drch: ADDED ALTERNATE DIRECTION FOR BUG
    } else {
        this.sprite = 'images/car_theodor.png';
    }
    this.speed = 88*direction;
};
Theodor.prototype = Object.create(Enemy.prototype);
Theodor.prototype.constructor = Enemy;

// drch: Player function for moving player from event listener for input keys (below)
// Udacity: Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.x = (101*(columns-1) / 2);
    this.y = 405;
    this.movementX = 0;
    this.movementY = 0;
    this.sprite = 'images/chicken.png';
};

// drch: handleInput function of each player that translates input key into
// an x or y movement to add in the update function
Player.prototype.handleInput = function(inputKey) {
    if (keysOn === 1) {
        if (inputKey === "left") {
            this.movementX = -playerSpeed;
            this.sprite = "images/chicken2.png";
        }
        else if (inputKey === "right") {
            this.movementX = playerSpeed;
            this.sprite = "images/chicken.png";
        }
         else if (inputKey === "down") {
            this.movementY = playerSpeed;
        }
         else if (inputKey === "up") {
            this.movementY = -playerSpeed;
        }
    } else {
        this.movementX = 0;
        this.movementY = 0;
    }
};

Player.prototype.update = function() {
    if (this.y > 435) {
        player.y = 435;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.y < -playerSpeed) {
        this.y = -playerSpeed;
    } else if (this.x > (101*6)) {
        this.x = 101*6;
    } else {
        this.x += this.movementX;
        this.y += this.movementY;
        this.movementX = 0;
        this.movementY = 0;
    }
};

Player.prototype.checkCollisions = function() {
    var player = this;
    // set boundaries in png for the player and each enemy
    var goalLine = 130;
    var playerLeft = player.x+5;
    var playerRight = player.x+95;
    var playerTop = player.y+72;
    var playerBottom = player.y+132;
    var playerMiddle = player.y+102;
    allEnemies.forEach(function(enemy) {
        var enemyLeft = enemy.x;
        var enemyRight = enemy.x+101;
        var enemyTop = enemy.y+78;
        var enemyBottom = enemy.y+143;
        // look for a collision if the player touches any of the enemies
        if (
            (
                ((playerTop <= enemyBottom) && (playerTop >= enemyTop))
                ||
                ((playerBottom >= enemyTop) && (playerBottom <= enemyBottom))
                ||
                ((playerMiddle >= enemyTop) && (playerMiddle <= enemyBottom))
            )
            &&
            (
                ((playerLeft >= enemyLeft) && (playerLeft <= enemyRight))
                ||
                ((playerRight >= enemyLeft) && (playerRight <= enemyRight))
            )
        ) {
            pauseNum = 1;
        } else if (playerBottom <= goalLine) {
            pauseNum = 2;
        };
    });
};

Player.prototype.crash = function() {
    keysOn = 0;
    if (audio.toggle === "on") {
            audio.playHorn();
        }
    if (counter < 30) {
        this.sprite = 'images/bang.png';
        counter+=1;
    } else {
    this.resetPlayer();
    }
};

Player.prototype.resetPlayer = function() {
    this.sprite = 'images/chicken.png';
    this.x = (101*(columns-1) / 2);
    this.y = 405;
    keysOn = 1;
    pauseNum = 0;
    counter = 0;
    StartLevel();
};



Player.prototype.goalLine = function() {
    keysOn = 0;
    if (counter < 320) {
        if (counter < 20) {
            question.color = "black";
            question.Ypos-=3;
        }
        if (this.x >= 202.5) {
            this.sprite = 'images/chicken2.png';
        } else {
            this.sprite = 'images/chicken.png';
        }
         if (audio.toggle === "on" && counter === 30) {
            audio.playChicken();
        }
        counter+=1;
    } else {
        if (level < 10) {
            level+=1;
            this.resetPlayer();
        } else {
            console.log("YOU DID IT");
        }
    }
};

Player.prototype.render = function() {
    // ctx.fillStyle = "rgba(255,255,255,0.5)"; // uncomment to highlight total png for player
    // ctx.fillRect(this.x,this.y,101,171);
    // ctx.fillStyle = "rgba(255,255,0,0.75)"; // uncomment to highlight collision zone for player
    // ctx.fillRect(this.x+5,this.y+72,90,60);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// drch: make multiple enemies with row, speed and direction info
// Udacity: Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


// var boris = new Enemy("Boris",0,50);
// var dmitri = new Enemy("Dmitri",1,-100);
// var igor = new Enemy("Igor",2,150);
// var natasha = new Enemy("Natasha",3,-50);
var natashaL0 = new Natasha(0,-1);
var igorL0 = new Igor(0,-1);


var borisR1 = new Boris(1,1);
var gregorR1 = new Gregor(1,1);

var ivanL2 = new Ivan(2,-1);
var dmitriL2 = new Dmitri(2,-1);
// var natashaL2 = new Natasha(2,-300);

var theodorR3 = new Theodor(3,1);
// var borisR3 = new Boris(3,50);

// var natasha = new Enemy()

var allEnemies = [];

var player = new Player()

function StartLevel() {
    if (level < 5) {
        allEnemies = [
            natashaL0,
            igorL0,
            gregorR1,
            borisR1,
            ivanL2,
            dmitriL2,
            theodorR3
        ];
    }
    else if (level >= 5) {
        allEnemies = [
            natashaL0,
            // igorL0,
            borisR1,
            // gregorR1,
            // ivanL2,
            // dmitriL2,
            // theodorR3
        ];
    }
    allEnemies.forEach(function(enemy) {
        enemy.speed = enemy.speed+(2*level*enemy.direction);
        console.log(enemy.speed);
    });

}

StartLevel();





// console.log(allEnemies);

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
