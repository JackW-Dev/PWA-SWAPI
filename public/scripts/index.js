window.addEventListener("load", initialiseButton);

//Function to initialise theme button.
//Checks local storage for if a preference is set and if one is set, it is used
//If it is not set, the detected preference is chosen and the option is written to localStorage
function initialiseButton() {
    if (localStorage.getItem("theme") != null) {
        if (localStorage.getItem("theme") === "dark") {
            themeBtn.innerText = "Become a Jedi, join the light side.";
            document.body.classList.toggle("dark-mode");
        } else {
            themeBtn.innerText = "Be a Sith lord, join the dark side.";
        }
    } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            localStorage.setItem("theme", "dark");
            themeBtn.innerText = "Become a Jedi, join the light side.";
            document.body.classList.toggle("dark-mode");
        } else {
            localStorage.setItem("theme", "light");
            themeBtn.innerText = "Be a Sith lord, join the dark side.";
        }
    }
}

const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", themeChanger);

//Function for changing the theme
//Toggle the theme on or off and detect the current theme value to update it correctly
function themeChanger() {
    if (localStorage.getItem("theme") === "dark") {

        localStorage.setItem("theme", "light");
        themeBtn.innerText = "Be a Sith lord, join the dark side.";
    } else {
        localStorage.setItem("theme", "dark");
        themeBtn.innerText = "Become a Jedi, join the light side.";
    }
    document.body.classList.toggle("dark-mode");
}

