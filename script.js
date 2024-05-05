const numericValue = document.querySelector(".numeric-value");
const from = document.querySelector(".from");
const To = document.querySelector(".to");
const output = document.querySelector(".output-from");
const baseUnit = document.querySelector(".base-unit-value");
const result = document.querySelector(".show");

let numericValues;
let fromCurrencyAgainstUSD;
let toCurrencyAgainstUSD;

function show() {
  numericValues = numericValue.value;
  makeCall();
}

function showAns() {
  result.style.display = "block";
  let numericValuesAgainstUSD = numericValues / fromCurrencyAgainstUSD;
  let converted = (numericValuesAgainstUSD * toCurrencyAgainstUSD).toFixed(2);
  let toBase = (converted / numericValues).toFixed(5);
  output.textContent = `${numericValues} ${from.value.toUpperCase()} = ${converted} ${To.value.toUpperCase()}`;
  baseUnit.textContent = `1 ${from.value.toUpperCase()} = ${toBase} ${To.value.toUpperCase()}`;
}

function makeCall() {
  fetch("https://api.fastforex.io/fetch-all?api_key=d5eacaf814-dd77f097dd-sd0nr9")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const currencyData = data.results;
      fromCurrencyAgainstUSD = currencyData[from.value.toUpperCase()];
      toCurrencyAgainstUSD = currencyData[To.value.toUpperCase()];
      if (numericValue.value === "" || from.value === "" || To.value === "") {
        alert("Please fill all fields");
      } else if (isNaN(numericValue.value)) {
        alert("Enter numeric value to convert");
      } else if (isNaN(fromCurrencyAgainstUSD) || isNaN(toCurrencyAgainstUSD)) {
        alert("Sorry, enter valid currency abbreviation");
      } else {
        showAns();
      }
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch
      console.error("There was a problem with the fetch operation:", error);
    });
}
