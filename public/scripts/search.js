let searchBtn = document.getElementById("searchButton");
searchBtn.addEventListener("click", searchAPI);

//Function to search SWAPI
function searchAPI() {
    let searchTerm = document.getElementById("searchInp").value;
    let searchType = document.getElementById("searchType").value;
    let url;
    let outputHead = document.getElementById("resultHeaders");
    let outputBody = document.getElementById("resultBody");

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
        case "species":
            url = "https://swapi.dev/api/species/?search=";
            break;
        case "starships":
            url = "https://swapi.dev/api/starships/?search=";
            break;
        case "vehicles":
            url = "https://swapi.dev/api/vehicles/?search=";
            break;
    }

    searchTerm = searchTerm.split(' ').join('+');
    url += searchTerm;

    fetch(url).then(response => response.json())
        .then(function (responseJson) {
            // If there is a response then tabulate else output no result message
            if (responseJson.count > 0) {
                tabulate(responseJson, searchType);
            } else {
                outputHead.innerHTML = "";
                outputBody.innerHTML = "Sorry, no results found!";
            }            
        }).catch(error => {
            outputHead.innerHTML = "";
            outputBody.innerHTML = `Error - ${error}`;
        });
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

        case "species":
            headHtml += `<th>Name</th><th>Language</th><th>Average Lifespan (years)</th>`;

            outputHead.innerHTML = headHtml;

            for (let i = 0; i < responseJson.results.length; i++) {
                let species = responseJson.results[i];
                bodyHtml += `<tr><td>${species.name}</td><td>${species.language}</td><td>${species.average_lifespan}</td>`;
            }

            outputBody.innerHTML = bodyHtml;
            break;

        case "starships":
            headHtml += `<th>Name</th><th>Model</th><th>Manufacturer</th>`;
            headHtml += `<th>Max speed (atmosphering)</th><th>Hyperdrive rating</th>`;

            outputHead.innerHTML = headHtml;

            for (let i = 0; i < responseJson.results.length; i++) {
                let starship = responseJson.results[i];
                bodyHtml += `<tr><td>${starship.name}</td><td>${starship.model}</td><td>${starship.manufacturer}</td>`;
                bodyHtml += `<td>${starship.max_atmosphering_speed}</td><td>${starship.hyperdrive_rating}</td>`;
            }

            outputBody.innerHTML = bodyHtml;
            break;

        case "vehicles":
            headHtml += `<th>Name</th><th>Model</th><th>Manufacturer</th>`;
            headHtml += `<th>Max speed (atmosphering)</th><th>Vehicle Class</th>`;

            outputHead.innerHTML = headHtml;

            for (let i = 0; i < responseJson.results.length; i++) {
                let vehicle = responseJson.results[i];
                bodyHtml += `<tr><td>${vehicle.name}</td><td>${vehicle.model}</td>`;
                bodyHtml += `<td>${vehicle.manufacturer}</td><td>${vehicle.max_atmosphering_speed}</td>`;
                bodyHtml += `<td>${vehicle.vehicle_class}</td>`;
            }

            outputBody.innerHTML = bodyHtml;
            break;
    }
}
