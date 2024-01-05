/*The Main Fetch function used to get information from the Movie DataBase */
export async function fetchMovieDB(input, type) {
    const apiKey = '2458552afaedac046eaf59b5f10b357d';
    const apiBaseUrl = `https://api.themoviedb.org/3/search/${type}?query=${input}&include_adult=false&language=en-US&page=1&api_key=`

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
/*Movie list fetch function based on the list argument (the argument gets its value when i call in the function in Main.js) */
export async function movieListFetch(list) {
    const apiKey = '2458552afaedac046eaf59b5f10b357d';
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

/*Error meassge handler ps- its also in the functionality.js */
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