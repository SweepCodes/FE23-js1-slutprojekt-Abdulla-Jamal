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
        movieDetailsFetch(searchType, id)
      }
      else if (searchType === 'person') {

      }
    })

  }
  return el;
}



function movieDetailsFetch(type, id) {
  const apiKey = '2458552afaedac046eaf59b5f10b357d';
  const basedetailsURL = `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=`
  const detailsURL = basedetailsURL + apiKey;
  fetch(detailsURL).then((res => {
    if (res.ok) {
      return res.json();
    }
    else throw 'error'
  })).then(movie => {
    displayDetailsMovies(movie);
  }).catch()
}
function personDetailsFetch(type, id) {
  const apiKey = '2458552afaedac046eaf59b5f10b357d';
  const basedetailsURL = `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=`
  const detailsURL = basedetailsURL + apiKey;
  fetch(detailsURL).then(movie => {
    displayDetailsMovies(movie);
  }).then().catch
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
    createAndAppendElement('button', `${movie.id}`, movieResultDiv)
    movieResultDiv.append(detailsDiv)
    mainResultContainer.append(movieResultDiv)
  }
}


export function displayResultsPerson(fetchdata) {
  for (const actor of fetchdata.results) {
    const actorResultDiv = document.createElement('div')
    const actorWorkList = document.createElement('ul')
    actorResultDiv.classList.add('actor-card-style')
    createAndAppendElement('img', `https://image.tmdb.org/t/p/w300${actor.profile_path}`, actorResultDiv)
    createAndAppendElement('h1', actor.name, actorResultDiv)
    createAndAppendElement('h2', `Department: ${actor.known_for_department}`, actorResultDiv)
    for (const value of actor.known_for) {
      if (value.media_type === 'movie') {
        createAndAppendElement('li', `Movie: ${value.title}`, actorWorkList)
      }
      else if (value.media_type === 'tv') {
        createAndAppendElement('li', `TV: ${value.name}`, actorWorkList)
      }
    }
    actorResultDiv.append(actorWorkList)
    createAndAppendElement('button', 'Details', actorResultDiv)
    mainResultContainer.append(actorResultDiv)
  }
}

export function displayDetailsMovies(movie) {
  const detailsDiv = document.createElement('div')
  const genreList = document.createElement('ul')
  const companiesList = document.createElement('ul')
  detailsDiv.classList.add('movie-details')
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
export function displayDetailsPerson(fetchdata) {
  for (const id of fetchdata) {
    const detailsDiv = document.createElement('div')
    detailsDiv.classList.add('actor-details')
    createAndAppendElement('h1', `${id.name}`, detailsDiv)
    createAndAppendElement('h2', `Bio: ${id.birthday}`, detailsDiv)
    createAndAppendElement('p', `Bio: ${id.biography}`, detailsDiv)

  }
}
export function removePrevSearchResult() {
  const mainResultContainer = document.querySelector('#result-container');
  mainResultContainer.innerHTML = '';

  const errorContainer = document.querySelector('#error-container');
  errorContainer.classList.add('hidden');
}


