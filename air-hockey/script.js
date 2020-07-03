const canvas = document.getElementById('canvas');
if (canvas.getContext) {
	var ctx = canvas.getContext('2d');
	// drawing code here
} else {
	// canvas-unsupported code here
}

const cWidth = canvas.width;
const cHeight = canvas.height;
const centerX = canvas.width / 2 - 50;
const centerY = canvas.height / 2 - 50;

let ballX = cWidth / 2;
let ballY = cHeight / 2;
let BALL_SPEED_X = 15;
let BALL_SPEED_Y = 5;
let BALL_RADIUS = 10;

const FRAME_PER_SECOND = 60;

let PADDLE_WIDTH = 10;
let PADDLE_HEIGHT = 100;

const PADDLE_SPACE = 2;
let paddle1Y = centerY;
let paddle2Y = centerY;

let firstPaddleColor = 'orange';
let secondPaddleColor = 'magenta';

canvas.addEventListener('mousemove', (e) => {
	const mousePos = getMousePosition(e);
	if (mousePos.y >= cHeight - PADDLE_HEIGHT / 2) {
		paddle1Y = cHeight - PADDLE_HEIGHT;
		// paddle2Y = cHeight - PADDLE_HEIGHT; // ADD FOR MANUAL
	} else if (mousePos.y <= 0 + PADDLE_HEIGHT / 2) {
		paddle1Y = 0;
		// paddle2Y = 0; // ADD FOR MANUAL
	} else {
		paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
		// paddle2Y = mousePos.y - PADDLE_HEIGHT / 2; // ADD FOR MANUAL
	}
});

setInterval(() => {
	draw();
	computerMove(); // REMOVE for manual
	moveBall();
}, 1000 / FRAME_PER_SECOND);

function draw() {
	drawCanvas();
	drawPaddles(
		PADDLE_SPACE,
		paddle1Y,
		firstPaddleColor,
		PADDLE_WIDTH,
		PADDLE_HEIGHT
	);
	drawPaddles(
		cWidth - PADDLE_WIDTH - PADDLE_SPACE,
		paddle2Y,
		secondPaddleColor,
		PADDLE_WIDTH,
		PADDLE_HEIGHT
	);
	drawBall(ballX, ballY, BALL_RADIUS, 0, 'green');
}

// TODO: Refactor computer move with random values as realistic as possible.
function computerMove() {
	const paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;
	const rand = Math.floor(Math.random() * 30) + 30;
	const rand2 = Math.floor(Math.random() * 8) + 8;

	// console.log(rand, rand2);
	if (paddle2YCenter < ballY - rand) {
		paddle2Y += rand2;
	} else if (paddle2YCenter > ballY + rand) {
		paddle2Y -= rand2;
	}
}

function resetBall() {
	// if(BALL_SPEED_X > 0) {

	// }
	BALL_SPEED_X = -BALL_SPEED_X;
	ballX = cWidth / 2;
	ballY = cHeight / 2;
}

function getMousePosition(e) {
	const rect = canvas.getBoundingClientRect();
	const root = document.documentElement;
	let mouseX = e.clientX - rect.left - root.scrollLeft;
	let mouseY = e.clientY - rect.top - root.scrollTop;

	return {
		x: mouseX,
		y: mouseY,
	};
}

// TODO: BALL Y AXIS RANDOM?

function moveBall() {
	// Paddle 1 LOSE
	if (ballX <= 0 + BALL_RADIUS + PADDLE_SPACE + PADDLE_WIDTH) {
		// Check paddles top & bot collision
		if (
			ballY >= paddle1Y - BALL_RADIUS &&
			ballY < paddle1Y + PADDLE_HEIGHT + BALL_RADIUS
		) {
			BALL_SPEED_X = -BALL_SPEED_X;
		} else if (ballX <= 0 + BALL_RADIUS) {
			// If lose wait for ball touches end line
			resetBall();
		}
	}
	// Paddle 2 LOSE
	if (ballX >= cWidth - (BALL_RADIUS + PADDLE_SPACE + PADDLE_WIDTH)) {
		// Check paddles top & bot collision
		if (
			ballY >= paddle2Y - BALL_RADIUS &&
			ballY < paddle2Y + PADDLE_HEIGHT + BALL_RADIUS
		) {
			BALL_SPEED_X = -BALL_SPEED_X;
		} else if (ballX >= cWidth - BALL_RADIUS) {
			// If lose wait for ball touches end line
			resetBall();
		}
	}
	// Top and bottom edges of board
	if (ballY >= cHeight - BALL_RADIUS || ballY <= 0 + BALL_RADIUS) {
		BALL_SPEED_Y = -BALL_SPEED_Y;
	}
	ballX += BALL_SPEED_X;
	ballY += BALL_SPEED_Y;
}

function drawCanvas() {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, cWidth, cHeight);
}

function drawPaddles(x, y, color = 'gray', w, h) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, radius, angle = 0, color = 'gray') {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, radius, angle, Math.PI * 2, true);
	ctx.fill();
}
