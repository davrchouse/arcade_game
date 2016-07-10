// global variables for all js files and to easily change features

var keysOn = 1; // turns on or off keyboard after collision or goal line crossing
var rowHeight = 83; // set row height for different size game background tiles
var speedInput = 3; // speed of player movement
var playerSpeed = rowHeight/speedInput; // adjust speed of player here to stay inside each row
var pauseNum = 0; // to switch updating and rendering for different game states
var counter = 0; // to delay running the engine for messages
var columns = 7; // number of game columns is adjustable (number of rows is not b/c of dependence of player/enemy movement)
var level = 1;
var lives = 5;
var totalLives = 5; // in progress: to change number of lives available on reset
var difficulty = 1; // how quickly enemies speed up each increasing level