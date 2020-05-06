const currencyFrom = document.getElementById('currency-from');
const currencyTo = document.getElementById('currency-to');
const amountFrom = document.getElementById('amount-from');
const amountTo = document.getElementById('amount-to');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// ADD YOUR API KEY
// https://www.exchangerate-api.com
const API_KEY = 'YOUR_API_KEY';
let globalRates;

//LATER:
//TODO: onload fetch once then till next rate update change again global rates
//TODO: interval fetch & timer next fetch maybe
//TODO: show some rates top left/right
//TODO: show last fetched time and next update
//TODO: on base currency change also change right table
//TODO: MAYBE? Swap currency amount from globalRates without new FETCH!!
// response: {
//  conversion_rates: {}
//  time_last_update: 1588636800
//  time_next_update: 1588723320
//  time_zone: "UTC"
// }
//LATER:

// Event Listeners
document.addEventListener('DOMContentLoaded', getRates());
currencyFrom.addEventListener('change', async () => {
	calculateRates();
	await getRates(currencyFrom.value);
});
currencyTo.addEventListener('change', calculateRates);
amountFrom.addEventListener('input', calculateRates);
amountTo.addEventListener('input', calculateRates);
swap.addEventListener('click', swapCurrencies);

// Swap currencies
async function swapCurrencies() {
	[currencyFrom.value, currencyTo.value] = [
		currencyTo.value,
		currencyFrom.value,
	];
	// Fetch with new BASE CURRENCY
	await getRates(currencyFrom.value);
	calculateRates();
}

// Update rates & dom
async function calculateRates() {
	const [inputAmount, outputCurrency, inputCurrency] = [
		amountFrom.value,
		currencyTo.value,
		currencyFrom.value,
	];
	const exchangeRate = globalRates[outputCurrency];

	// Exchange Rate
	rate.innerText = `1 ${inputCurrency} = ${exchangeRate.toFixed(
		4
	)} ${outputCurrency}`;
	// Last value of amount
	amountTo.value = (inputAmount * exchangeRate).toFixed(2);
}

// Fetch exchange rates & update dom ~~default TRY
async function getRates(currency = 'TRY') {
	const response = await fetch(
		`https://prime.exchangerate-api.com/v5/${API_KEY}/latest/${currency}`
	);
	const rates = await response.json();
	globalRates = rates.conversion_rates;
	calculateRates();
}
