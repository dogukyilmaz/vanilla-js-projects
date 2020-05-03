const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');

// Event Listeners
form.addEventListener('submit', function (e) {
	e.preventDefault();

	checkLengthFields(username, 3, 15);
	checkLengthFields(password, 6, 12);
	isValidEmail(email);
	checkPasswordsMathc(password, repassword);
	checkRequiredFields([username, email, password, repassword]);
	submitCorrect();
});

// Display Success Border
function showSuccess(element) {
	const formControl = element.parentElement;
	formControl.className = 'form-control success';
}

// Display Error Message
function showError(element, message) {
	const formControl = element.parentElement;
	const smallElement = formControl.querySelector('small');
	formControl.className = 'form-control error';
	smallElement.innerText = message;
}

// Check if email is valid
function isValidEmail(element) {
	const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	regexEmail.test(String(element.value.trim()).toLowerCase())
		? showSuccess(email)
		: showError(email, 'Enter a valid email!');
}

// Check if fields empty
function checkRequiredFields(elementsArr) {
	elementsArr.forEach((element) => {
		element.value.trim() === '' &&
			showError(element, `${element.name} is required.`);
		// : showSuccess(element);
	});
}

// Check fields length
function checkLengthFields(element, min, max) {
	element.value.length < min || element.value.length > max
		? showError(
				element,
				`${element.name} has to be between ${min}-${max} characters.`
		  )
		: showSuccess(element);
}

// Check match passwords
function checkPasswordsMathc(pass1, pass2) {
	pass1.value !== pass2.value
		? showError(pass2, 'Passwords do not match!')
		: showSuccess(pass2);
}

// All validated then Spinner or sth. etc. ~~Thank you.
function submitCorrect() {
	if (document.querySelectorAll('.success').length === 4) {
		const afterMessage = document.querySelector('#title');
		afterMessage.innerText = `Thank You!`;
		afterMessage.className = 'validated-form';
	}
}
