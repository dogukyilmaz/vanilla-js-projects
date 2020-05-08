const currencyFrom = document.getElementById('currency-from');
const currencyTo = document.getElementById('currency-to');
const amountFrom = document.getElementById('amount-from');
const amountTo = document.getElementById('amount-to');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// Left Right info panes
const lastUpdate = document.getElementById('last-update');
const nextUpdate = document.getElementById('next-update');
const date = document.getElementById('date');

// Right pane currencies
const currency_usd = document.getElementById('usd');
const currency_eur = document.getElementById('eur');
const currency_gbp = document.getElementById('gbp');
const currency_try = document.getElementById('try');

// ADD YOUR API KEY
// https://www.exchangerate-api.com
const API_KEY = 'YOUR API KEY';
let globalRates;
const STATIC_RATES = {
	base: 'TRY',
	conversion_rates: {
		AED: 0.5105,
		ARS: 9.3245,
		AUD: 0.2159,
		BGN: 0.2513,
		BRL: 0.8,
		BSD: 0.139,
		CAD: 0.1961,
		CHF: 0.1359,
		CLP: 116.6803,
		CNY: 0.9863,
		COP: 555.4762,
		CZK: 3.4879,
		DKK: 0.9593,
		DOP: 7.756,
		EGP: 2.1865,
		EUR: 0.1291,
		FJD: 0.3132,
		GBP: 0.1129,
		GTQ: 1.0713,
		HKD: 1.0803,
		HRK: 0.9722,
		HUF: 45.026,
		IDR: 2065.2755,
		ILS: 0.4892,
		INR: 10.5407,
		ISK: 20.4461,
		JPY: 14.8219,
		KRW: 170.047,
		KZT: 58.325,
		MXN: 3.3675,
		MYR: 0.6,
		NOK: 1.4294,
		NZD: 0.2303,
		PAB: 0.139,
		PEN: 0.476,
		PHP: 7.0067,
		PKR: 21.968,
		PLN: 0.585,
		PYG: 897.3077,
		RON: 0.62,
		RUB: 10.2931,
		SAR: 0.5235,
		SEK: 1.371,
		SGD: 0.1972,
		THB: 4.4979,
		TRY: 1,
		TWD: 4.1743,
		UAH: 3.7155,
		USD: 0.1394,
		UYU: 5.9485,
		ZAR: 2.5978,
	},
	documentation: 'https://www.exchangerate-api.com/docs',
	result: 'success',
	terms_of_use: 'https://www.exchangerate-api.com/terms',
	time_last_update: 1588896004,
	time_next_update: 1588982524,
	time_zone: 'UTC',
};

//LATER:
//TODO: onload fetch once then till next rate update change again global rates
//TODO: interval fetch & timer next fetch maybe
//TODO: stlyes of left/right panes
//TODO: MAYBE? Swap currency amount from globalRates without new FETCH!!

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

// Set Main/Top Currencies on the right pane
function setTopCurrencies() {
	[currency_usd, currency_eur, currency_gbp, currency_try].forEach(
		(currency) =>
			(currency.innerText = globalRates[`${currency.id.toUpperCase()}`].toFixed(
				3
			))
	);
}

// Set & change dates
function setDates(rates) {
	console.log(rates);
	const lastUpdatedDate = new Date(rates.time_last_update);
	const nextUpdateDate = new Date(
		rates.time_next_update - rates.time_last_update
	);

	// Today's date
	date.innerText = `${new Date().toLocaleDateString().toString()}`;

	// Last update & next update
	lastUpdate.innerText = `${dateFormatter(lastUpdatedDate)}`;
	nextUpdate.innerText = `${dateFormatter(nextUpdateDate)}`;
}

// Custom Date format
function dateFormatter(date) {
	const formattedDate = [
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
	].map((d) => {
		return +d < 10 ? (d = `0${d}`) : d;
	});

	return `${formattedDate[0]}:${formattedDate[1]}:${formattedDate[2]}`;
}

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
	try {
		const response = await fetch(
			`https://prime.exchangerate-api.com/v5/${API_KEY}/latest/${currency}`
		);
		const rates = await response.json();
		globalRates = rates.conversion_rates;
		// globalRates = STATIC_RATES.conversion_rates;
		calculateRates();
		setDates(rates);
		setTopCurrencies();
	} catch (err) {
		console.log(err);
		alert('Server Error. Try again later.');
	}
}
