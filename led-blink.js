var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function () {
	var led = new five.Led(11);
	led.blink(500);
	this.repl.inject({
		led: led
	});
});
