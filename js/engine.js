/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = (101*columns);
    canvas.height = 606;

    doc.getElementById("game").appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */

     // drch: add functionality for different game states
    function update(dt) {
        if (pauseNum === 0) {
            updateEntities(dt);
            player.checkCollisions();
        }
        if (pauseNum === 1) {
            player.crash();
        }
        if (pauseNum === 2) {
            player.goalLine();
        }
        if (pauseNum == 3) {
            gameover();
        }
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */

        ctx.drawImage(Resources.get('images/sky.png'), 0, 0);

        var rowImages = [
                'images/grass-block.png',   // Top row is water
                'images/upper-road0.png',   // Row 1 of 4 of stone
                'images/upper-road1.png',   // Row 2 of 4 of stone
                'images/upper-road0.png',   // Row 3 of 4 of stone
                'images/upper-road2.png',   // Row 4 of 4 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 7,
            numCols = columns,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
        renderMessages(pauseNum);
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        extra.update(pauseNum);
        extra.render();

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();

        // drch: add pause for adding jokes to the screen
        if (pauseNum === 2) {
            funny.update(player);
            funny.render();
        }
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        pushRestart();
    }

    // drch: custom functions for messages and waiting to reset the game
    function renderMessages(pauseNum) {
        if (pauseNum === 3) {
            if (counter  < 300)
                ctx.fillStyle = "rgba(255,255,255,0.95)";
                ctx.fillRect(101,160,101*(columns-2),108);
                ctx.textAlign = "center";
                ctx.font = "60px sans-serif";
                ctx.fillStyle = "red";
                ctx.fillText("GAME OVER", (101*columns / 2), 235);
            }
        if (pauseNum === 4) {
            ctx.fillStyle = "rgba(255,255,255,0.95)";
            ctx.fillRect(101,160,101*(columns-2),108);
            ctx.textAlign = "center";
            ctx.fillStyle = "blue";
            ctx.fillText("Congratulations!", (101*columns / 2), 200);
            ctx.fillText("From the other side!", (101*columns / 2), 240);
        }
    }

    function gameover() {
        player.sprite = 'images/chicken.png';
        player.x = (101*(columns-1) / 2);
        player.y = 405;
        if (counter > 300) {
            reset();
        }
        counter+=1;
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/bang.png',              // modified from freeiconspng.com/free-images/explosion-icon-9152
        'images/chicken.png',           // modified from opengameart.org/content/lil-chick (CC0, Public Domain)
        'images/chicken2.png',
        'images/upper-road1.png',       // modified from opengameart.org/content/golgotha-textures-tunnelroad.jpg (CC0, Public Domain)
        'images/upper-road2.png',
        'images/upper-road0.png',
        'images/car_ivan.png',          // cars from iconarchive.com/show/car-icons-by-bevel-and-emboss.html (Freeware)
        'images/car_ivan2.png',
        'images/car_dmitri.png',
        'images/car_dmitri2.png',
        'images/car_natasha.png',
        'images/car_natasha2.png',
        'images/car_igor.png',
        'images/car_igor2.png',
        'images/car_boris.png',
        'images/car_boris2.png',
        'images/car_gregor.png',
        'images/car_gregor2.png',
        'images/car_theodor.png',
        'images/car_theodor2.png',
        'images/sky.png',
        'images/caption-balloon1.png',  // modified from openclipart.org/detail/173492/caption-balloon-4 (Public Domain)
        'images/caption-balloon2.png',
        'images/full-heart.png',
        'images/empty-heart.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
