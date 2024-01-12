const mainResultContainer = document.querySelector('#result-container');
import { detailsFetch } from "./fetches.js";

export function createAndAppendElement(element, content, container) {
  const el = document.createElement(element)
  container.append(el)

  if (element === 'img') el.src = content
  else el.innerText = content
  if (element === 'a') {
    el.href = content
    el.target = "_blank"
    el.innerText = 'IMDB Page'
  }
  /*Details Button functionality */
  if (element === 'button') {
    const detailsType = document.querySelector('input[type="radio"]:checked').value;
    el.innerText = 'Details'
    el.addEventListener('click', () => {
      let id = content; /*Delaring the content of the button as "id" to use as an argument for my detailsFetch function*/
      if (detailsType === 'movie') {
        removePrevSearchResult();
        detailsFetch(detailsType, id, displayDetailsMovies)
      }
      else if (detailsType === 'person') {
        removePrevSearchResult();
        detailsFetch(detailsType, id, displayDetailsPerson)
      }
    })
  }
  return el;
}

export function displayResultsMovie(fetchdata) {
  for (const movie of fetchdata.results) {
    const movieResultDiv = document.createElement('div')
    const detailsDiv = document.createElement('div')
    movieResultDiv.classList.add('card-style')
    createAndAppendElement('h1', movie.title, movieResultDiv)
    createAndAppendElement('h2', `Release date: ${movie.release_date}`, movieResultDiv)
    createAndAppendElement('p', `Overview: ${movie.overview}`, movieResultDiv)
    createAndAppendElement('img', `https://image.tmdb.org/t/p/w300${movie.poster_path}`, movieResultDiv)
    /*Certin objects from the api are missing images here is the fix with the help of underscore.js*/
    if (_.isNull(movie.poster_path)) {
      movieResultDiv.classList.add('extra-hidden')
    }
    createAndAppendElement('button', `${movie.id}`, movieResultDiv)/*this is where i make the id as content for each button*/
    movieResultDiv.append(detailsDiv)
    mainResultContainer.append(movieResultDiv)
  }
}

export function displayResultsPerson(fetchdata) {
  for (const person of fetchdata.results) {
    const personResultDiv = document.createElement('div')
    const personWorkList = document.createElement('ul')
    personResultDiv.classList.add('actor-card-style')
    createAndAppendElement('img', `https://image.tmdb.org/t/p/w300${person.profile_path}`, personResultDiv)
    /*Certin objects from the api are missing images here is the fix with the help of underscore.js*/
    if (_.isNull(person.profile_path)) {
      personResultDiv.classList.add('extra-hidden')
    }
    createAndAppendElement('h1', person.name, personResultDiv)
    createAndAppendElement('h2', `Department: ${person.known_for_department}`, personResultDiv)
    for (const value of person.known_for) {
      if (value.media_type === 'movie') {
        createAndAppendElement('li', `Movie: ${value.title}`, personWorkList)
      }
      else if (value.media_type === 'tv') {
        createAndAppendElement('li', `TV: ${value.name}`, personWorkList)
      }
    }
    personResultDiv.append(personWorkList)
    createAndAppendElement('button', `${person.id}`, personResultDiv)
    mainResultContainer.append(personResultDiv)
  }
}

function displayDetailsMovies(movie) {
  const detailsDiv = document.createElement('div')
  const genreList = document.createElement('ul')
  const companiesList = document.createElement('ul')
  detailsDiv.classList.add('movie-details-style')
  createAndAppendElement('img', `https://image.tmdb.org/t/p/w300${movie.poster_path}`, detailsDiv)
  createAndAppendElement('h1', `${movie.title}`, detailsDiv)
  createAndAppendElement('p', `Budget: ${movie.budget.toLocaleString()} $`, detailsDiv)
  createAndAppendElement('p', `Revenue: ${movie.revenue.toLocaleString()} $`, detailsDiv)
  createAndAppendElement('p', `Runtime: ${movie.runtime} Minutes.`, detailsDiv)
  createAndAppendElement('h2', 'Genres:', detailsDiv)
  detailsDiv.append(genreList)
  for (const value of movie.genres) {
    createAndAppendElement('li', `${value.name}`, genreList)
  }
  createAndAppendElement('h3', 'Produced by:', detailsDiv)
  for (const value of movie.production_companies) {
    createAndAppendElement('li', value.name, companiesList)
  }
  detailsDiv.append(companiesList)
  mainResultContainer.append(detailsDiv)
}
function displayDetailsPerson(person) {
  const detailsDiv = document.createElement('div')
  detailsDiv.classList.add('actor-details-style')
  createAndAppendElement('img', `https://image.tmdb.org/t/p/w300${person.profile_path}`, detailsDiv)
  createAndAppendElement('h1', `${person.name}`, detailsDiv)
  createAndAppendElement('a', `https://www.imdb.com/name/${person.imdb_id}`, detailsDiv)
  createAndAppendElement('h2', `Biography`, detailsDiv)
  createAndAppendElement('p', `${person.biography}`, detailsDiv)
  mainResultContainer.append(detailsDiv)
}

/*Every time i want the search results to be cleard i use this function */
export function removePrevSearchResult() {
  const mainResultContainer = document.querySelector('#result-container');
  mainResultContainer.innerHTML = '';

  const errorContainer = document.querySelector('#error-container');
  errorContainer.classList.add('hidden');
}
