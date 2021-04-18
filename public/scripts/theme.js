window.addEventListener("load", initialiseTheme);

//Function to detect the current selected theme and toggle the correct CSS elements
//As .dark-mode is the specialist theme, it will be toggled on if wanted and off if not
function initialiseTheme() {
    //If the key is not null, set the theme using the key, else, set the theme using the OS preference and set the key to match
    if (localStorage.getItem("theme") != null) {
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.toggle("dark-mode");
        }
    } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            localStorage.setItem("theme", "dark");
            document.body.classList.toggle("dark-mode");
        } else {
            localStorage.setItem("theme", "light");
        }
    }
}