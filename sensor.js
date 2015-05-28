var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function () {
	var led = new five.Led(11);
	var servo = new five.Servo(11);
	var rotary = new five.Sensor('A0');
	rotary.scale(0, 180).on('change', function () {
		servo.to(this.value);
	});
});
