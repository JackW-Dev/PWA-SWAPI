window.addEventListener("load", initialiseTheme);

const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", themeChanger);

function themeChanger() {
    document.body.classList.toggle("dark-mode");
    if (localStorage.getItem("theme") === "dark") {
        localStorage.setItem("theme", "light");
        themeBtn.innerText = "Be a Sith lord, join the dark side.";
    } else {
        localStorage.setItem("theme", "dark");
        themeBtn.innerText = "Become a Jedi, join the light side.";
    }
}

function initialiseTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.toggle("dark-mode");
        themeBtn.innerText = "Become a Jedi, join the light side.";
    } else {
        document.body.classList.toggle("light-mode");
        themeBtn.innerText = "Be a Sith lord, join the dark side.";
    }
}