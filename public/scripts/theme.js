window.addEventListener("load", initialiseTheme);

//Function to detect the current selected theme and toggle the correct CSS elements
//As .dark-mode is the specialist theme, it will be toggled on if wanted and off if not
function initialiseTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.toggle("dark-mode");
    }
}

