import './css/styles.css';
import ToGetCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;
const textInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
textInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
function onSearch(e) {
  const searchCountry = e.target.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (searchCountry !== '') {
    ToGetCountries.fetchUsers(searchCountry)
      .then(renderUserList)
      .catch(onErrorCountry);
  }
}
function renderUserList(users) {
  if (users.length >= 10) {
    Notify.info(`Too many matches found. Please enter a more specific name.`);
  }
  if (1 < users.length < 10) {
    const markup = users
      .map(({ name, flags }) => {
        return `<li><p><img style="width: 30px; margin-right: 20px" src="${flags.svg}">${name.official}</p></li>`;
      })
      .join('');
    countryList.insertAdjacentHTML('beforeend', markup);
  }
  if (users.length === 1) {
    const countryOnly = users
      .map(({ name, capital, population, flags, languages }) => {
        return `
  <h1><img style="width: 30px; margin-right: 20px" src="${flags.svg}">${
          name.official
        }</h1>
  <p><span>Capital: </span>${capital}</p>
  <p><span>Population: </span>${population}</p>
  <p><span>Languages: </span>${Object.values(languages)}</p>
        `;
      })
      .join('');
    countryInfo.insertAdjacentHTML('beforeend', countryOnly);
  }
}
function onErrorCountry(error) {
  Notify.warning('Oops, there is no country with that name');
  console.log(1011);
}
