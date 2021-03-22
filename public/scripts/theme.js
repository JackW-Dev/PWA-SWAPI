window.addEventListener("load", initialiseTheme);

function initialiseTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.toggle("dark-mode");
    } else {
        document.body.classList.toggle("light-mode");
    }
}