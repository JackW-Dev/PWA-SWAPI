let searchBtn = document.getElementById("searchButton");
searchBtn.addEventListener("click", searchAPI);

//Function to search SWAPI
function searchAPI() {
    let searchTerm = document.getElementById("searchInp").value;
    let searchType = document.getElementById("searchType").value;
    let url;

    console.log(`Search term: ${searchTerm}`);

    switch (searchType) {
        case "movies":
            url = "https://swapi.dev/api/films/?search=";
            break;
        case "characters":
            url = "https://swapi.dev/api/people/?search=";
            break;
        case "planets":
            url = "https://swapi.dev/api/planets/?search=";
            break;
        case "starships":
            url = "https://swapi.dev/api/starships/?search=";
            break;
    }

    searchTerm = searchTerm.split(' ').join('+');
    url += searchTerm;
    console.log(`URL ${url}`);

    fetch(url).then(response => response.json())
        .then(function (responseJson) {
            tabulate(responseJson, searchType);
        }).catch(error => console.log(`Error - ${error}`));
}

//Function to tabulate results from SWAPI responses
function tabulate(responseJson, searchType) {
    let outputHead = document.getElementById("resultHeaders");
    let outputBody = document.getElementById("resultBody");

    let headHtml = "";
    let bodyHtml = "";

    switch (searchType) {
        case "movies":
            headHtml += `<th>Title</th><th>Episode</th><th>Director</th><th>Released</th><th>Producer(s)</th>`;

            outputHead.innerHTML = headHtml;

            for (let i = 0; i < responseJson.results.length; i++) {
                let movie = responseJson.results[i];
                bodyHtml += `<tr><td>${movie.title}</td><td>${movie.episode_id}</td>`;
                bodyHtml += `<td>${movie.director}</td><td>${movie.release_date}</td>`;
                bodyHtml += `<td>${movie.producer}</td></tr>`;
            }

            outputBody.innerHTML = bodyHtml;
            break;
        case "characters":
            headHtml += `<th>Name</th><th>Birth year</th><th>Gender</th><th>Height (Cm)</th><th>Weight (Kg)</th>`;

            outputHead.innerHTML = headHtml;

            for (let i = 0; i < responseJson.results.length; i++) {
                let character = responseJson.results[i];
                bodyHtml += `<tr><td>${character.name}</td><td>${character.birth_year}</td>`;
                bodyHtml += `<td>${character.gender}</td><td>${character.height}</td>`;
                bodyHtml += `<td>${character.mass}</td>`;
            }

            outputBody.innerHTML = bodyHtml;
            break;
        case "planets":
            headHtml += `<th>Name</th><th>Climate</th><th>Terrain</th>`;
            headHtml += `<th>Gravity</th><th>Rotational Period (Days)</th><th>Orbital Period (Days)</th>`;

            outputHead.innerHTML = headHtml;

            for (let i = 0; i < responseJson.results.length; i++) {
                let planet = responseJson.results[i];
                bodyHtml += `<tr><td>${planet.name}</td><td>${planet.climate}</td>`;
                bodyHtml += `<td>${planet.terrain}</td><td>${planet.gravity}</td>`;
                bodyHtml += `<td>${planet.rotation_period}</td><td>${planet.orbital_period}</td>`;
            }

            outputBody.innerHTML = bodyHtml;
            break;
        case "starships":
            headHtml += `<th>Name</th><th>Model</th><th>Manufacturer</th>`;
            headHtml += `<th>Max speed (atmosphering)</th><th>Hyperdrive rating</th>`;
            headHtml += `<th>Cargo capacity</th><th>Cost (credits)</th>`;

            outputHead.innerHTML = headHtml;

            for (let i = 0; i < responseJson.results.length; i++) {
                let starship = responseJson.results[i];
                bodyHtml += `<tr><td>${starship.name}</td><td>${starship.model}</td><td>${starship.manufacturer}</td>`;
                bodyHtml += `<td>${starship.max_atmosphering_speed}</td><td>${starship.hyperdrive_rating}</td>`;
                bodyHtml += `<td>${starship.cargo_capacity}</td><td>${starship.cost_in_credits}</td>`;
            }

            outputBody.innerHTML = bodyHtml;
            break;
    }
}
