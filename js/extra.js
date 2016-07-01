// extra.js for controlling audio and displaying chicken jokes

var audio = {
	"toggle": "off",
    "traffic": "audio/traffic.ogg",
    "horn": "audio/horn.ogg"
};

var HTMLaudio1 = '<audio id="traffic" loop><source src='+audio.traffic+' type="audio/ogg">Your browser does not support the audio element.</audio>';
var HTMLaudio2 = '<audio id="horn"><source src='+audio.horn+' type="audio/ogg"></audio><button onclick="audio.soundOnOff()" type="button">Turn On/Off Sound</button>';

audio.display = function() {
	$("body").append(HTMLaudio1);
	$("body").append(HTMLaudio2);
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

function loadExtras() {
	audio.display()
}

loadExtras();


