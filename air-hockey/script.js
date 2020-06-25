const canvas = document.getElementById('canvas');
if (canvas.getContext) {
	var ctx = canvas.getContext('2d');
	// drawing code here
} else {
	// canvas-unsupported code here
}

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
