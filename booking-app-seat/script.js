const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const infoText = document.querySelector('.text');
const warningText = document.querySelector('.warning-text');

// On document loaded
document.addEventListener('DOMContentLoaded', () => {});
populateUI();

// Select seat on click
container.addEventListener('click', (e) => {
	const elementClass = e.target.classList;
	if (movieSelect.value) {
		elementClass.contains('seat') &&
			!elementClass.contains('occupied') &&
			(elementClass.toggle('selected'), updateCountPrice());
	}
});

// Select/Change movie
movieSelect.addEventListener('change', (e) => {
	setMovieData(e.target.selectedIndex, e.target.value);
	updateCountPrice();
});

// Get data from localStorage and populate in UI
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selected-seats'));
	const movieInfo = JSON.parse(localStorage.getItem('movie-data'));

	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach(
			(seat, idx) =>
				selectedSeats.indexOf(idx) > -1 && seat.classList.add('selected')
		);
	}

	movieInfo !== null && (movieSelect.selectedIndex = movieInfo.movie);
}

// Update total ticket count & price
function updateCountPrice() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');

	const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

	localStorage.setItem('selected-seats', JSON.stringify(seatIndex));

	const seatsCount = selectedSeats.length;
	movieSelect.value &&
		((count.innerText = seatsCount),
		(total.innerText = seatsCount * +movieSelect.value));

	movieSelect.value && selectedSeats.length > 0
		? (infoText.classList.remove('hide'),
		  (warningText.innerText = 'Please select a movie.'),
		  warningText.classList.add('hide'))
		: (infoText.classList.add('hide'),
		  (warningText.innerText = 'You can select a seat.'),
		  warningText.classList.remove('hide'));
}

// Save selected movie(index) & price
function setMovieData(movie, price) {
	localStorage.setItem('movie-data', JSON.stringify({ movie: movie, price }));
}

updateCountPrice();
