Jokes.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {

    var lines = text.split("\n");

    for (var i = 0; i < lines.length; i++) {

        var words = lines[i].split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = this.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                this.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }

        this.fillText(line, x, y);
        y += lineHeight;
    }
};



var myCanvas = document.getElementById("canvas");
var ctx = myCanvas.getContext("2d");

// Background.
// ctx.fillStyle = "black";
// ctx.fillRect(0, 0, 400, 200);

// Line at 180px width to see demonstrate maximum line length. (20x + 160 width)
// ctx.strokeStyle = "red";
// ctx.moveTo (180.5,0);
// ctx.lineTo (180.5,200);
// ctx.stroke();

// Multi-line text.
ctx.fillStyle = "black";
ctx.font = "12px sans-serif";
ctx.textBaseline = "top";
ctx.wrapText("Hello World!\n\nLet's stop taking line breaks for granted.\n\n\nLet's thank the inventors of line breaks for all they went through.",20,20,160,16);
 