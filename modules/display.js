const mainResultContainer = document.querySelector('#result-container');

export function createAndAppendElement(element, content, container) {
  const el = document.createElement(element)
  container.append(el)

  if (element === 'img') el.src = content
  else el.innerText = content

  if (el.src === 'https://image.tmdb.org/t/p/w300null') {
    el.src = 'https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg'
  }
  /*Här om jag klickar på en knapp så  klickas alla knappar i divven*/
  if (element === 'button') {
    addEventListener('click', () => {
      console.log('hello');
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
    createAndAppendElement('button', `${movie.id}`, movieResultDiv) /*Här kan jag nå id också */
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
export function removePrevSearchResult() {
  const mainResultContainer = document.querySelector('#result-container');
  mainResultContainer.innerHTML = '';

  const errorContainer = document.querySelector('#error-container');
  errorContainer.classList.add('hidden');
}


