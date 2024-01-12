const apiKey = '2458552afaedac046eaf59b5f10b357d';

/*main fetch function for searching movies and actors*/
export async function fetchMovieDB(input, type) {
    const apiBaseUrl = `https://api.themviedb.org/3/search/${type}?query=${input}&include_adult=false&language=en-US&page=1&api_key=`

    const url = apiBaseUrl + apiKey;

    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json();
        /*using the underscore.js object function "._isEmpty" to check if the results returned from my promise is empty or not.and if its empty throw an error */
        if (_.isEmpty(data.results)) {
            throw 'input error'
        }
        return data;
    }
    else throw 'error';
};
/*Fetch function for movie lists 'Top rated' and 'Popular' movies*/
export async function movieListFetch(list) {
    const baseListUrl = `https://api.themoviedb.org/3/movie/${list}?language=en-US&api_key=`
    const fullUrl = baseListUrl + apiKey;
    const response = await fetch(fullUrl)
    if (response.ok) {
        const listData = await response.json();
        listData.results.splice(10, 10)
        return listData;
    }
    else throw 'error';
}
/*Details functionality fetch function*/
export function detailsFetch(type, id, displayFunction) {
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

/*Error meassge handler*/
export function displayErrorMsg(error) {
    console.log(error);
    let msg;
    if (error === 'input error') msg = 'no results'
    else msg = 'something went wrong... please try again later'

    const errorMsgEl = document.querySelector('#error-msg')
    errorMsgEl.innerText = msg;

    const errorContainer = document.querySelector('#error-container')
    errorContainer.classList.remove('hidden')
}