/* Scale a value from one range to another
* Example of use:
*
* // Convert 33 from a 0-100 range to a 0-65535 range
* var n = scaleValue(33, [0,100], [0,65535]);
*
* // Ranges don't have to be positive
* var n = scaleValue(0, [-50,+50], [0,65535]);
*
* Ranges are defined as arrays of two values, inclusive
*
* The ~~ trick on return value does the equivalent of Math.floor, just faster.
*
*/
function scaleScore(value, from, to) {
	var scale = (to[1] - to[0]) / (from[1] - from[0]);
	var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
	return ~~(capped * scale + to[0]);
}

module.exports = {
	scaleScore,
}