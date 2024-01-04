const mainResultContainer = document.querySelector('#result-container');
export function createAndAppendElement(element, content, container) {
  const el = document.createElement(element)
  container.append(el)

  if (element === 'img') el.src = content
  else el.innerText = content

  if (el.src === 'https://image.tmdb.org/t/p/w300null') {
    el.src = 'https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg'

  }

  if (element === 'button') {
    const searchType = document.querySelector('input[type="radio"]:checked').value;
    el.innerText = 'Details'
    el.addEventListener('click', () => {
      let id = content;
      if (searchType === 'movie') {
        removePrevSearchResult();
        DetailsFetch(searchType, id, displayDetailsMovies)
      }
      else if (searchType === 'person') {
        removePrevSearchResult();
        DetailsFetch(searchType, id, displayDetailsPerson)
      }
    })
  }
  return el;
}


function DetailsFetch(type, id, displayFunction) {
  const apiKey = '2458552afaedac046eaf59b5f10b357d';
  const basedetailsURL = `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=`;
  const detailsURL = basedetailsURL + apiKey;

  fetch(detailsURL)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw 'error';
      }
    })
    .then(data => {
      displayFunction(data);
    })
    .catch(displayErrorMsg);
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
    if (_.isNull(movie.poster_path)) {
      movieResultDiv.classList.add('extra-hidden')
    }
    createAndAppendElement('button', `${movie.id}`, movieResultDiv)
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
  createAndAppendElement('p', `Budget: ${movie.budget}`, detailsDiv)
  createAndAppendElement('p', `Revenue: ${movie.revenue}`, detailsDiv)
  createAndAppendElement('p', `Runtime: ${movie.runtime}`, detailsDiv)
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
  createAndAppendElement('h2', `${person.birthday}`, detailsDiv)
  createAndAppendElement('p', `${person.biography}`, detailsDiv)
  mainResultContainer.append(detailsDiv)
}
export function removePrevSearchResult() {
  const mainResultContainer = document.querySelector('#result-container');
  mainResultContainer.innerHTML = '';

  const errorContainer = document.querySelector('#error-container');
  errorContainer.classList.add('hidden');
}

function displayErrorMsg(error) {
  console.log(error);
  let msg;
  if (error === 'input error') msg = 'no results'
  else msg = 'something went wrong... please try again later'

  const errorMsgEl = document.querySelector('#error-msg')
  errorMsgEl.innerText = msg;

  const errorContainer = document.querySelector('#error-container')
  errorContainer.classList.remove('hidden')
}


