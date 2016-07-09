// extra.js for controlling audio and displaying chicken jokes

var audio = {
	"toggle": "off",
    "traffic": "audio/traffic.ogg",
    "horn": "audio/horn.ogg",
    "chicken": "audio/chicken.ogg"
};

var HTMLaudio1 = '<audio id="traffic" loop><source src='+audio.traffic+' type="audio/ogg">Your browser does not support the audio element.</audio>';
var HTMLaudio2 = '<audio id="horn"><source src='+audio.horn+' type="audio/ogg"></audio><button onclick="audio.soundOnOff()" type="button">Turn On/Off Sound</button>';
var HTMLaudio3 = '<audio id="chicken"><source src='+audio.chicken+' type="audio/ogg"></audio>';



audio.display = function() {
	// $("body").append(HTMLaudio1, HTMLaudio2, HTMLaudio3);
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

var question = {
	"question": "Why did the chicken cross the road?",
	"font": "36px sans-serif",
	"color": "white",
	"Xpos": columns*101 / 2,
	"Ypos": 100
}

question.update = function(pauseNum) {
	if (pauseNum === 2) {
		if (counter < 45) {
			//noop
		}
		// counter+=1;
	} else {
		question.color = "white";
		question.Ypos = 100;
	}
};

question.render = function() {
	ctx.font = question.font;
	ctx.fillStyle = question.color;
	ctx.textAlign = "center";
	ctx.lineWidth = 3;
	ctx.fillText(question.question, question.Xpos, question.Ypos);
}


var jokes = {
	"punchlines":[
		"She wanted to lay it on the line.",
		"It was half-past hen!",
		"For fowl purposes.",
		"Someone was egging her on.",
		"Because she was poultry in motion.",
		"She was winging it.",
		"She wanted to fly the coop.",
		"She was free range.",
		"Ask the chicken!",
		"To avoid Colonel Saunders.",
		"Because the armadillo told him it was safe.",
		"In protest of current roadkill legislation.",
		"I dream of a world where chickens can cross the road without having their motives questioned!",
		"I just felt like crossing the road, ok?",
		"50 to maximum of 60 characters ----- - --- ------ --- _-_-_-",
		"40 to 49 characters - ---- _-- ---_-- -_- -- -_--",
		"30 to 39 characters --- - --S-- --- -K-",
		"20 to 29 chars to work -- -S-",
		"10 to 19 chars work",
		"< than 10"],
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
 	jokes.wrapText(4, this.x, this.y, 140, player);

};

function loadExtras() {
	audio.display()
}

loadExtras();


