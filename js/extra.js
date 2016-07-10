// extra.js for controlling audio and displaying chicken jokes

var audio = {
	"toggle": "off",
    "traffic": "audio/traffic.ogg",
    "horn": "audio/horn.ogg",
    "chicken": "audio/chicken.ogg",
    "won": "audio/tada.ogg"
};

var HTMLaudio1 = '<audio id="traffic" loop><source src='+audio.traffic+' type="audio/ogg">Your browser does not support the audio element.</audio>';
var HTMLaudio2 = '<audio id="horn"><source src='+audio.horn+' type="audio/ogg"></audio>';
var HTMLaudio3 = '<audio id="chicken"><source src='+audio.chicken+' type="audio/ogg"></audio>';
var HTMLaudio4 = '<audio id="tada"><source src='+audio.won+' type="audio/ogg"></audio>';



audio.display = function() {
	$("#sidebar").append(HTMLaudio1, HTMLaudio2, HTMLaudio3, HTMLaudio4);
};

audio.soundOnOff = function() {
	if (audio.toggle === "on") {
	document.getElementById("traffic").pause();
	audio.toggle = "off";
	}
	else {
	document.getElementById("traffic").play();
	audio.toggle = "on";
	}
};

audio.playHorn = function() {
	crash = document.getElementById("horn");
	crash.volume = 0.3;
	crash.play();
}

audio.playChicken = function() {
	goal = document.getElementById("chicken");
	goal.volume = 0.3;
	goal.play();
}

audio.playTada = function() {
	won = document.getElementById("tada");
	won.volume = 0.5;
	won.play();
}

var extra = {
	"question": {
		"textQ": "Why did the chicken cross the road?",
		"font": "36px sans-serif",
		"color": "white",
		"Xpos": columns*101 / 2,
		"Ypos": 100
	},
	"end": {
		"textEnd": ["Congratulations!", "The chicken has crossed the road!"],
		"color": "blue"
	}
};

extra.update = function(pauseNum) {
	if (pauseNum !== 2) {
		extra.question.color = "white";
		extra.question.Ypos = 100;
	}
};

extra.render = function() {
	ctx.font = extra.question.font;
	ctx.fillStyle = extra.question.color;
	ctx.textAlign = "center";
	ctx.lineWidth = 3;
	ctx.fillText(extra.question.textQ, extra.question.Xpos, extra.question.Ypos);
	ctx.fillStyle = "rgba(255,255,255,0.5)"; // uncomment to highlight collision zone on each enemy
	ctx.fillRect(15,560,305,38);
	ctx.fillRect(545,560,150,38)
	ctx.textAlign = "left";
	ctx.font = "30px sans-serif";
	ctx.fillStyle = "black";
	ctx.fillText("Level", 22,590)
	for (var x = 0; x < 10; x++) {
		ctx.beginPath();
    	ctx.arc(120+(x*20), 580, 8, 0, 2 * Math.PI, false);
    	if (x < level-1) {
    		ctx.fillStyle = 'green';
    	} else {
    		ctx.fillStyle = 'black';
    	}
    	ctx.fill();
    	ctx.lineWidth = 2;
    	ctx.strokeStyle = '#003300';
    	ctx.stroke();
    	ctx.closePath();
    }
    for (var x = 0; x < totalLives; x++) {
    	if (x < lives) {
    		ctx.drawImage(Resources.get('images/full-heart.png'), 553+(x*27), 566);
    	} else {
    		ctx.drawImage(Resources.get('images/empty-heart.png'), 553+(x*27), 566);
    	}
    }
};


var jokes = {
	"punchlines":[
		"She was winging it.",
		"The cluck said it was half-past hen!",
		"For fowl purposes.",
		"Someone was egging her on.",
		"Because she was poultry in motion.",
		"She wanted to fly the coop.",
		"She was free range.",
		"Ask the chicken!",
		"In protest of current roadkill legislation.",
		"I just felt like crossing the road, OK?"],
	"lengths":[],
	"modH": [],
	"lineH": [],
	"fontsize": []
};


// modified from html5 tutorial on wrap text for canvas
jokes.measure = function() {
	for (joke in jokes.punchlines) {
		var jokeLength = jokes.punchlines[joke].length;
		// console.log("joke",jokes.punchlines[joke]);
		// console.log("length",jokeLength);

		jokes.lengths = jokeLength;
		// // jokes.totalLines[5]=6;
		// console.log("test",	jokes.totalLines[5]);
		if (jokeLength < 50) {
			if (jokeLength < 40) {
				if (jokeLength < 30) {
					if (jokeLength < 20) {
						if (jokeLength < 10) {
							jokes.modH[joke] = 1;
							jokes.fontsize[joke] = "30px sans-serif";
							jokes.lineH[joke] = 30;
						} else {
							jokes.modH[joke] = 1.7; //lineH 26 x -0 y -10
							jokes.fontsize[joke] = "26px sans-serif";
							jokes.lineH[joke] = 26;
						}
					} else {
						jokes.modH[joke] = 2.5;
						jokes.fontsize[joke] = "22px sans-serif"; //lineH 22 x -0 y -22
						jokes.lineH[joke] = 22;
						}
				} else {
					jokes.modH[joke] = 2.5;
					jokes.fontsize[joke] = "20px sans-serif";
					jokes.lineH[joke] = 20;
				}
			} else {
				jokes.modH[joke] = 3.5;
				jokes.fontsize[joke] = "18px sans-serif";
				jokes.lineH[joke] = 18;
			}
		} else {
			jokes.modH[joke] = 3.5; //lineH 16 x -88 -38
			jokes.fontsize[joke] = "17px sans-serif";
			jokes.lineH[joke] = 17;
		}
	}
};

jokes.wrapText = function(jokeNum, x, y, maxWidth, player) {
	// for (joke in jokes.punchlines) {
    var lines = jokes.punchlines[jokeNum].split("\n"); //splits the text words into an array with entries separated by a double \n\n
     for (var i = 0; i < lines.length; i++) {
		var words = lines[i].split(' '); //split lines ino a words array that has each word as a separate entry
       	var line = '';
       	ctx.font = jokes.fontsize[jokeNum];
        var modH = jokes.modH[jokeNum];
        var lineH = jokes.lineH[jokeNum];
     	var modX;
        if (player.x >= 202.5) {
			modX = 90 + x;
		} else {
			modX = 120 + x;
		}
        var modY = y - (lineH*(modH)) + 90;
        ctx.textAlign = "center";
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' '; // add the next word in the array to the test line

            var metrics = ctx.measureText(testLine); // see how wide the test line is
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
               	ctx.fillText(line, modX, modY); // add a line if it is greater than the maxwidth
                line = words[n] + ' ';
                modY += lineH;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, modX, modY);
        modY += lineH;
    }
};

jokes.measure();

var Joke = function(punchlines) {
    this.sprite = 'images/caption-balloon1.png';
    this.x = 0;
    this.y = 0;
};


var funny = new Joke;

Joke.prototype.update = function(player) {
	if (player.x >= 202.5) {
		this.sprite = 'images/caption-balloon1.png';
 		this.x = player.x - 190;
 		this.y = player.y + 120;
	} else {
		this.sprite = 'images/caption-balloon2.png';
		this.x = player.x + 100;
		this.y = player.y + 120;
	}
};

Joke.prototype.render = function() {
 	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 	ctx.fillStyle = "black";
 	jokes.wrapText(level-1, this.x, this.y, 140, player);

};

function loadExtras() {
	audio.display()
}

loadExtras();


