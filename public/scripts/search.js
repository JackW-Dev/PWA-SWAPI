//Connection will be equal to the suitable connection type
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
connection.addEventListener("change", connectionChanged);

function connectionChanged() {
    let networkMsg = document.getElementById("networkMessage")
    switch(connection.effectiveType){
        case "3g" || "4g":
            networkMsg.style.display = "none";
            break;
        default:
            networkMsg.style.display = "block";

            //The API detects effectiveType as being 4g when offline. This check will detect and correct the output message.
            if (connection.effectiveType === "4g") {
                networkMsg.innerText = "Your currently have no internet connection.";
            } else {
                networkMsg.innerText = `Your connection is ${connection.effectiveType} - Results may be slower than expected.`;
            }
            break;
    }
}

let searchBtn = document.getElementById("searchButton");
searchBtn.addEventListener("click", searchAPI);

//Function to search SWAPI
function searchAPI() {
    let searchTerm = document.getElementById("searchInp").value;
    let searchType = document.getElementById("searchType").value;
    let outputHead = document.getElementById("resultHeaders");
    let outputBody = document.getElementById("resultBody");
    let offlineImg = document.getElementById("offline_img");

    //Build URL
    let url = `https://swapi.dev/api/${searchType}/?search=${searchTerm}`;

    offlineImg.hidden = true;

    fetch(url).then(response => response.json())
        .then(function(responseJson) {
            // If there is a response then tabulate else output no result message
            if (responseJson.count > 0) {
                tabulate(responseJson, searchType);
            } else {
                outputHead.innerHTML = "";
                outputBody.innerHTML = "Sorry, no results found!";
            }
        }).catch(() => {
        outputHead.innerHTML = "";
        outputBody.innerHTML = "Unable to search currently, please check your network and try again.";
        offlineImg.hidden = false;
        //console.log(`Error is ${error}`);
    });
}

//Function to tabulate results from SWAPI responses
function tabulate(responseJson, searchType) {
    let outputHead = document.getElementById("resultHeaders");
    let outputBody = document.getElementById("resultBody");
    let headHtml = "";
    let bodyHtml = "";

    //Each case will add the corresponding headers to the headHTML and then loop through results to populate bodyHTML
    switch (searchType) {
        case "films":
            headHtml += `<th>Title</th><th>Episode</th><th>Director</th><th>Released</th><th>Producer(s)</th>`;

            for (let i = 0; i < responseJson.results.length; i++) {
                let movie = responseJson.results[i];
                bodyHtml += `<tr><td>${movie.title}</td><td>${movie.episode_id}</td>`;
                bodyHtml += `<td>${movie.director}</td><td>${movie.release_date}</td>`;
                bodyHtml += `<td>${movie.producer}</td></tr>`;
            }

            outputHead.innerHTML = headHtml;
            outputBody.innerHTML = bodyHtml;
            break;

        case "people":
            headHtml += `<th>Name</th><th>Birth year</th><th>Gender</th><th>Height (Cm)</th><th>Weight (Kg)</th>`;

            for (let i = 0; i < responseJson.results.length; i++) {
                let character = responseJson.results[i];
                bodyHtml += `<tr><td>${character.name}</td><td>${character.birth_year}</td>`;
                bodyHtml += `<td>${character.gender}</td><td>${character.height}</td>`;
                bodyHtml += `<td>${character.mass}</td>`;
            }

            outputHead.innerHTML = headHtml;
            outputBody.innerHTML = bodyHtml;
            break;

        case "planets":
            headHtml += `<th>Name</th><th>Climate</th><th>Terrain</th>`;
            headHtml += `<th>Gravity</th><th>Rotational Period (Days)</th><th>Orbital Period (Days)</th>`;

            for (let i = 0; i < responseJson.results.length; i++) {
                let planet = responseJson.results[i];
                bodyHtml += `<tr><td>${planet.name}</td><td>${planet.climate}</td>`;
                bodyHtml += `<td>${planet.terrain}</td><td>${planet.gravity}</td>`;
                bodyHtml += `<td>${planet.rotation_period}</td><td>${planet.orbital_period}</td>`;
            }

            outputHead.innerHTML = headHtml;
            outputBody.innerHTML = bodyHtml;
            break;

        case "species":
            headHtml += `<th>Name</th><th>Language</th><th>Average Lifespan (years)</th>`;

            for (let i = 0; i < responseJson.results.length; i++) {
                let species = responseJson.results[i];
                bodyHtml += `<tr><td>${species.name}</td><td>${species.language}</td><td>${species.average_lifespan}</td>`;
            }

            outputHead.innerHTML = headHtml;
            outputBody.innerHTML = bodyHtml;
            break;

        case "starships":
            headHtml += `<th>Name</th><th>Model</th><th>Manufacturer</th>`;
            headHtml += `<th>Max speed (atmosphering)</th><th>Hyperdrive rating</th>`;

            for (let i = 0; i < responseJson.results.length; i++) {
                let starship = responseJson.results[i];
                bodyHtml += `<tr><td>${starship.name}</td><td>${starship.model}</td><td>${starship.manufacturer}</td>`;
                bodyHtml += `<td>${starship.max_atmosphering_speed}</td><td>${starship.hyperdrive_rating}</td>`;
            }

            outputHead.innerHTML = headHtml;
            outputBody.innerHTML = bodyHtml;
            break;

        case "vehicles":
            headHtml += `<th>Name</th><th>Model</th><th>Manufacturer</th>`;
            headHtml += `<th>Max speed (atmosphering)</th><th>Vehicle Class</th>`;

            for (let i = 0; i < responseJson.results.length; i++) {
                let vehicle = responseJson.results[i];
                bodyHtml += `<tr><td>${vehicle.name}</td><td>${vehicle.model}</td>`;
                bodyHtml += `<td>${vehicle.manufacturer}</td><td>${vehicle.max_atmosphering_speed}</td>`;
                bodyHtml += `<td>${vehicle.vehicle_class}</td>`;
            }

            outputHead.innerHTML = headHtml;
            outputBody.innerHTML = bodyHtml;
            break;
    }
}