var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
	var temp = new five.Temperature({
		controller: "TMP36",
		pin: "A0"
	});

	var rgb = new five.Led.RGB({
		pins: [3, 5, 6],
		isAnode: true
	});

	temp.on("change", function(err, data) {
		// Write an algorithm that converts temperature (F, K or C)
		// into an RGB hex value.
		var value = data.kelvin % 100;
		console.log('value', value);
		var red, green, blue;
		if (value <= 66) {
			red = 255;
		} else {
			red = value - 60;
			red = 329.698727446 * (red ^ -0.1332047592);
			if (red < 0) {
				red = 0;
			}
			if (red > 255) {
				red = 255;
			}
		}

		if (value <= 66) {
			green = value;
			green = 99.4708025861 * Math.log(green) - 161.1195681661;
			if (green < 0) {
				green = 0;
			}
			if (green > 255) {
				green = 255;
			}
		} else {
			green = value - 60;
			green = 288.1221695283 * (green ^ -0.0755148492);
			if (green < 0) {
				green = 0;
			}
			if (green > 255) {
				green = 255;
			}
		}

		if (value >= 66) {
			blue = 255;
		} else {
			blue = value - 10;
			blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
			if (blue < 0) { blue = 0; }
			if (blue > 255) { blue = 255; }
		}

		function componentToHex(c) {
			var hex = c.toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		}

		function rgbToHex(r, g, b) {
			return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}

		rgb.color(rgbToHex(red, green, blue));
	});
});
