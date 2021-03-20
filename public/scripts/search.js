let promise = document.getElementById("getPeoplePage");
promise.addEventListener("click", getPeople);

function getPeople() {
    const url = "https://swapi.dev/api/people/?";
    fetch(url).then(response => response.json())
        .then(function(responseJson) {
            tabulateCharacters(responseJson);
        }).catch(error => console.log(`Error - ${error}`));
}

function tabulateCharacters(responseJson) {
    let outputTbody = document.getElementById("output");
    let tbodyHtml = "";
    for (let i = 0; i < responseJson.results.length; i++) {
        let character = responseJson.results[i];
        console.log(character.name);
        console.log(character.birth_year);
        tbodyHtml += `<tr><td>${character.name}</td><td>${character.birth_year}</td></tr>`;
    }
    outputTbody.innerHTML = tbodyHtml;
}