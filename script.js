const currencyEl_one = document.querySelector("#currency-one");
const amountEl_one = document.querySelector("#amount-one");
const currencyEl_two = document.querySelector("#currency-two");
const amountEl_two = document.querySelector("#amount-two");

const rateEl = document.querySelector("#rate");
const swap = document.querySelector("#swap");

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  //
  const API_KEY = ""; // You need to create a free account from https://www.exchangerate-api.com/ to achieve an API KEY
  fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      const rate = data.conversion_rates[currency_two];
      rateEl.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event Listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
