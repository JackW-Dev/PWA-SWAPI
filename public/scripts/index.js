window.addEventListener("load", initialiseButton);
window.addEventListener("load", initialiseSurvey);

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

//Function to check if survey is already completed and hide it if it has been filled in
function initialiseSurvey() {
    if (localStorage.getItem("name") != null) {
        document.getElementById("infoForm").style.display = "none"
        document.getElementById("surveyCompleteMsg").style.display = "block"
    }
}

const surveyBtn = document.getElementById("userSurveyButton");
surveyBtn.addEventListener("click", surveySubmit);

//Function for submitting the user survey
function surveySubmit() {
    const nameInp = document.getElementById("nameInp").value;
    const emailInp = document.getElementById("emailInp").value;
    const sideInp = document.getElementById("sideInp").value;
    let lightsaberInp;
    const radioList = document.getElementsByName("lightsaberColour");
    let nameValid = false;
    let emailValid = false;

    //Loop through array of radio buttons and find the one that is selected
    for (i = 0; i < radioList.length; i++) {
        if (radioList[i].checked) {
            lightsaberInp = radioList[i].value
        }
    }

    console.log(`Submitted ${nameInp} -  ${emailInp} - ${sideInp} - ${lightsaberInp}`);

    //RegEx for a valid name (this is a 2nd stage validation method)
    const nameRegex = /^[a-z ,.'-]+$/i;

    //Name should match regex format and be longer than 2 characters
    if (nameRegex.test(nameInp) === true && nameInp.length > 2 && nameInp.length < 51) {
        nameValid = true;
    }

    //RegEx for a valid email (this is a 2nd stage validation method)
    const emailRegex = /\S+@\S+\.\S+/;

    //Email should match regex format
    if (emailRegex.test(emailInp) === true) {
        emailValid = true;
    }

    //If details are valid, store the form submission and hide the form
    //Else, allow the form to be attempted again
    if (nameValid && emailValid) {
        //console.log("Valid details");
        localStorage.setItem("name", nameInp);
        localStorage.setItem("email", emailInp);
        localStorage.setItem("side", sideInp);
        localStorage.setItem("lightsaber", lightsaberInp);

        //This will not only hide the form but will also stop it from affecting the page layout
        //Visibility hidden would leave an empty space where the section was
        document.getElementById("infoForm").style.display = "none"
        document.getElementById("surveyCompleteMsg").style.display = "block"

    } else {
        console.log("Invalid details");
    }
}