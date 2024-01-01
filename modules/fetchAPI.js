
export async function fetchMovieDB(input, type) {
    const apiKey = '2458552afaedac046eaf59b5f10b357d';
    const apiBaseUrl = `https://api.themoviedb.org/3/search/${type}?query=${input}&include_adult=false&language=en-US&page=1&api_key=`
    const url = apiBaseUrl + apiKey;

    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json();
        if (_.isEmpty(data.results)) {
            throw 'input error'
        }
        for (const value of data.results) {
            const id = value.id;
            const basedetailsURL = `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=`
            const detailsURL = basedetailsURL + apiKey;
            const res = await fetch(detailsURL)
            if (res.ok) {
                const detailsData = await res.json()
                console.log(detailsData);
            }
            else throw 'error'
        }
        return data;

    }
    else throw 'error';

};

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