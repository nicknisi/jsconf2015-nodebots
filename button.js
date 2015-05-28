var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function () {
	var button = new five.Button(2);
	var led = new five.Led(11);

	button.on('press', function () {
		console.log('button Pressed');
		led.on();
	});

	button.on('hold', function () {
		led.blink(50);
	});

	button.on('release', function () {
		console.log('Button Released!');
		led.stop().off();
	});
});
