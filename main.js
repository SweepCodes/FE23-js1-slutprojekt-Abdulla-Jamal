/*
 * Abdulla Jamal, 2023 
 * 
 * Search Movies and Actors with the help of TheMovieDataBase API.
 * API Link - https://developer.themoviedb.org/reference/intro/getting-started
 * 
 * Fetches All Movies and Actors based on user search input.
 * Fetches current Top10 list of Movies and a list of the Top10 most popular movies of all time by a simply clicking on them.
 * User can search by Movie name or actor name.  
 * Information displayed for each Movie:
 * - Movie Title:
 * - Release date:
 * - Overview:
 * - Movie Poster.
 * Information displayed for each Actor:
 * - Actor name:
 * - Department that they are know to be working in.
 * - a list of the top movies or TV-show they have worked on.
 * 
 * 
 * 
 * - Links used as help for building this website are listed below.
 * https://devdevout.com/css/css-cards
 * https://www.freepik.com/free-vector
 * https://getcssscan.com/css-buttons-examples
 * https://underscorejs.org/#
 */


import { fetchMovieDB } from "./modules/fetchAPI.js";
import { displayResultsMovie } from "./modules/display.js";
import { displayResultsPerson } from "./modules/display.js";
import { displayErrorMsg } from "./modules/fetchAPI.js";
import { movieListFetch } from "./modules/fetchAPI.js";
import { removePrevSearchResult } from "./modules/display.js";
const form = document.querySelector('form');
const listEls = document.querySelectorAll('.list-el')

form.addEventListener('submit', searchHandler)

async function searchHandler(event) {
    event.preventDefault();
    removePrevSearchResult();
    const searchInput = document.querySelector('#input').value;
    const searchType = document.querySelector('input[type="radio"]:checked').value;
    if (searchType === 'movie') {
        await fetchMovieDB(searchInput, searchType).then(displayResultsMovie).catch(displayErrorMsg)
    }
    else if (searchType === 'person') {
        await fetchMovieDB(searchInput, searchType).then(displayResultsPerson).catch(displayErrorMsg)
    }
    form.reset();
}




listEls.forEach((element) => {
    element.addEventListener('click', () => {
        if (element.textContent === 'Top Rated') {
            removePrevSearchResult();
            movieListFetch("top_rated").then(displayResultsMovie).catch(displayErrorMsg)
        }
        else if (element.textContent === 'Popular') {
            removePrevSearchResult();
            movieListFetch("popular").then(displayResultsMovie).catch(displayErrorMsg)
        }
    })
})










