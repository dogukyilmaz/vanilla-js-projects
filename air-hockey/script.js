const canvas = document.getElementById('canvas');
if (canvas.getContext) {
	var ctx = canvas.getContext('2d');
	// drawing code here
} else {
	// canvas-unsupported code here
}

const cWidth = canvas.width;
const cHeight = canvas.height;

let firstPlayerScore = 0;
let secondPlayerScore = 0;
const WIN_SCORE = 10;

let showResultSection = false;

let ballX = cWidth / 2;
let ballY = cHeight / 2;
let BALL_SPEED_X = 15;
let BALL_SPEED_Y = getRandomVelocityY();
let BALL_RADIUS = 10;

const FRAME_PER_SECOND = 60;

let PADDLE_WIDTH = 10;
let PADDLE_HEIGHT = 100;

const PADDLE_SPACE = 2;

let paddle1Y = canvas.height / 2 - 50;
let paddle1X = PADDLE_SPACE + 0;

let paddle2Y = canvas.height / 2 - 50;
let paddle2X = cWidth - PADDLE_WIDTH - PADDLE_SPACE;

let firstPaddleColor = 'orange';
let secondPaddleColor = 'magenta';

canvas.addEventListener('mousedown', handleGameResult);

// Paddle Shake
canvas.addEventListener('click', () => {
	paddle1X = 20;
	// paddle2X = cWidth - PADDLE_WIDTH - PADDLE_SPACE - 20; // Paddle 2 test
	setTimeout(() => {
		paddle1X = PADDLE_SPACE + 0;
		// paddle2X = cWidth - PADDLE_WIDTH - PADDLE_SPACE; // Paddle 2 test
	}, 100);
});

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
	computerMove(); // REMOVE for manuel
	moveBall();
}, 1000 / FRAME_PER_SECOND);

function handleGameResult(e) {
	if (showResultSection) {
		firstPlayerScore = 0;
		secondPlayerScore = 0;
		showResultSection = false;
	}
}

function draw() {
	drawCanvas();
	drawScores();
	drawNet();

	// Check if there is winner
	// If there show restart button add event listener etc.
	if (showResultSection) {
		drawResult();
		return;
	}
	drawPaddles(
		paddle1X,
		paddle1Y,
		firstPaddleColor,
		PADDLE_WIDTH,
		PADDLE_HEIGHT
	);
	drawPaddles(
		paddle2X,
		paddle2Y,
		secondPaddleColor,
		PADDLE_WIDTH,
		PADDLE_HEIGHT
	);
	drawBall(ballX, ballY, BALL_RADIUS, 0, 'green');
}

function drawScores() {
	ctx.fillStyle = 'rgba(255,165,0, .2)';
	ctx.font = '200px Montserrat';
	ctx.fillText(firstPlayerScore, cWidth / 2 - 260, cHeight / 2 + 70);

	ctx.fillStyle = 'rgba(255,0,255, .2)';
	ctx.fillText(secondPlayerScore, cWidth - cWidth / 2 + 100, cHeight / 2 + 70);
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
	if (firstPlayerScore >= WIN_SCORE || secondPlayerScore >= WIN_SCORE) {
		// Show result screen it will run handleGameResult function
		// Reset stats and game
		showResultSection = true;
	}
	BALL_SPEED_X = -BALL_SPEED_X;
	BALL_SPEED_Y = getRandomVelocityY(); // Random y ~~ Each turn random Y velocity

	// Reset Ball Position Each Turn
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

function moveBall() {
	// Check if there is winner?
	if (showResultSection) {
		return;
	}

	// Paddle 1 LOSE
	if (ballX <= 0 + BALL_RADIUS + paddle1X + PADDLE_WIDTH) {
		// Check paddles top & bot collision
		if (
			ballY >= paddle1Y - BALL_RADIUS &&
			ballY < paddle1Y + PADDLE_HEIGHT + BALL_RADIUS
		) {
			BALL_SPEED_X = -BALL_SPEED_X;

			const deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
			BALL_SPEED_Y = deltaY * 0.35;
		} else if (ballX <= 0 + BALL_RADIUS) {
			// If lose wait for ball touches end line
			secondPlayerScore++;
			resetBall();
		}
	}
	// Paddle 2 LOSE
	if (ballX >= paddle2X - BALL_RADIUS) {
		// Check paddles top & bot collision
		if (
			ballY >= paddle2Y - BALL_RADIUS &&
			ballY < paddle2Y + PADDLE_HEIGHT + BALL_RADIUS
		) {
			BALL_SPEED_X = -BALL_SPEED_X;

			const deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
			BALL_SPEED_Y = deltaY * 0.35;
		} else if (ballX >= cWidth - BALL_RADIUS) {
			// If lose wait for ball touches end line
			firstPlayerScore++;
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

function drawNet() {
	ctx.fillStyle = 'gray';
	for (let i = 0; i < cHeight; i += 40) {
		ctx.fillRect(cWidth / 2 - 2, -20 + i, 4, 30);
	}
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

function drawResult() {
	const winner = firstPlayerScore > secondPlayerScore ? true : false;

	ctx.font = '50px Montserrat';
	ctx.fillStyle = winner ? firstPaddleColor : secondPaddleColor;
	ctx.fillText(
		`${winner ? 'First' : 'Second'} Player Won!`,
		cWidth / 2 - 200,
		150
	);

	ctx.font = '30px Montserrat';
	ctx.fillStyle = 'green';
	ctx.fillText('Click to continue...', cWidth / 2 - 120, 200);
}

function getRandomVelocityY() {
	return Math.floor(Math.random() * 14) + 1;
}
