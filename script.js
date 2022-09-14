let elForm = document.querySelector(".form-js");
let elInput = elForm.querySelector(".input-js");
let elResultBox = document.querySelector(".result-box-js");


const renderCountry = data => {
  elResultBox.innerHTML = "";

  data.forEach(data => {
    let elCountryInfo = document.createElement("div");
    elCountryInfo.classList.add("box");
    elCountryInfo.innerHTML = `
      <img class="rounded-5" src=${data.flags.png} alt=${data.name.common} width="300" height="200">
      <h5 class="mt-2">Name: ${data.name.common}</h5>
      <p class="d-block m-0 mb-1">Capital: ${data.capital}</p>
      <p class="d-block m-0 mb-1">Area: ${data.area}</p>
      <p class="d-block m-0 mb-1">Population: ${data.population}</p>`

      elResultBox.appendChild(elCountryInfo);
  })
};

const renderErrors = function (error) {
  let elCountryInfo = document.createElement("div");
  elCountryInfo.innerHTML = `
    <h5 class="mt-2 h1">${error}</h5>
  `

  elResultBox.appendChild(elCountryInfo);
};

const renderCountries = country => {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => {
    if (res.status != 200) {
      throw new Error(renderErrors('Country was not found!'));
    }

    return res.json()})
    .then(data => renderCountry(data))
};

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let inputVal = elInput.value.trim().toLowerCase();


  renderCountries(inputVal);

  elInput.value = '';
});