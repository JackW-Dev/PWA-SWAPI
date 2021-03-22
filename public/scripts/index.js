window.addEventListener("load", initialiseButton);

function initialiseButton() {
    if (localStorage.getItem("theme") === "dark") {
        themeBtn.innerText = "Become a Jedi, join the light side.";
    } else {
        document.body.classList.toggle("light-mode");
        themeBtn.innerText = "Be a Sith lord, join the dark side.";
    }
}

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



