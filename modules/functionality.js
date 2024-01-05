const mainResultContainer = document.querySelector('#result-container');

export function createAndAppendElement(element, content, container) {
  const el = document.createElement(element)
  container.append(el)

  if (element === 'img') el.src = content
  else el.innerText = content
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

/*Details button fetch function */
/*type: based on the user choice between movie or person*/
/*id: the id of the movie or person */
/*displayFunction: The manner the data fetched is displayed in */
function detailsFetch(type, id, displayFunction) {
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

/*How the result of the search for movies is displayed */
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

/*How the result of the search for persons is displayed */
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

/*How the details for movies is displayed if the details button is pressed */
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
/*How the details for persons is displayed if the details button is pressed */
function displayDetailsPerson(person) {
  const detailsDiv = document.createElement('div')
  detailsDiv.classList.add('actor-details-style')
  createAndAppendElement('img', `https://image.tmdb.org/t/p/w300${person.profile_path}`, detailsDiv)
  createAndAppendElement('h1', `${person.name}`, detailsDiv)
  createAndAppendElement('h2', `${person.birthday}`, detailsDiv)
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

/*My error message handler for how my error are displayed-
PS- this function is here because i wanted to pass it in my catch for the detailsFunction. it is also in the fetches.js*/
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


