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
    //If the name value is not null, the user must have previously completed the survey
    //If the survey has been completed, hide the survey and show the survey completed message and the share buttton
    //If not, show the survey and hide the completed message and share button
    if (localStorage.getItem("name") != null) {
        document.getElementById("infoForm").style.display = "none"
        document.getElementById("surveyCompleteMsg").style.display = "block"
        if (navigator.share) {
            document.getElementById("shareMsg").style.display = "block";
            shareButton.style.display = "block";
        }
    }
}

//For some reason, having a listener on the form works but using event.preventDefault does not
//Without the preventDefault, the submission will work but will alter the URL
//Due to this, a listener is applied on the button instead of the form
//HTML5 validation is still carried out on the form
// let surveyForm = document.getElementById("infoForm");
// surveyForm.addEventListener("submit", surveySubmit);

const surveyBtn = document.getElementById("userSurveyButton");
surveyBtn.addEventListener("click", surveySubmit);

//Function for submitting the user survey
//This function contains JavaScript validation also, however, it has been commented out as HTML5 will do this
function surveySubmit() {
    const nameInp = document.getElementById("nameInp").value;
    const emailInp = document.getElementById("emailInp").value;
    const sideInp = document.getElementById("sideInp").value;
    let lightsaberInp;
    const radioList = document.getElementsByName("lightsaberColour");
    // let nameValid = false;
    // let emailValid = false;

    //Loop through array of radio buttons and find the one that is selected
    for (let i = 0; i < radioList.length; i++) {
        if (radioList[i].checked) {
            lightsaberInp = radioList[i].value
        }
    }

    // console.log(`Submitted ${nameInp} -  ${emailInp} - ${sideInp} - ${lightsaberInp}`);
    //
    // //RegEx for a valid name (this is a 2nd stage validation method)
    // //This will block many foreign characters - Look to alter in a second stage
    // const nameRegex = /^[A-Za-z ,.'-]+$/i;
    //
    // //Name should match regex format and be longer than 2 characters
    // if (nameRegex.test(nameInp) === true && nameInp.length > 2 && nameInp.length < 51) {
    //     nameValid = true;
    // }
    //
    // //RegEx for a valid email (this is a 2nd stage validation method)
    // const emailRegex = /\S+@\S+\.\S+/;
    //
    // //Email should match regex format
    // if (emailRegex.test(emailInp) === true) {
    //     emailValid = true;
    // }
    //
    // //If details are valid, store the form submission and hide the form
    // //Else, allow the form to be attempted again
    // if (nameValid && emailValid) {
    //     //console.log("Valid details");
    //     localStorage.setItem("name", nameInp);
    //     localStorage.setItem("email", emailInp);
    //     localStorage.setItem("side", sideInp);
    //     localStorage.setItem("lightsaber", lightsaberInp);
    //
    //     //This will not only hide the form but will also stop it from affecting the page layout
    //     //Visibility hidden would leave an empty space where the section was
    //     document.getElementById("infoForm").style.display = "none";
    //     document.getElementById("surveyCompleteMsg").style.display = "block";
    //
    //     //If share API is supported, display the share message and button where the survey was
    //     if(navigator.share) {
    //         document.getElementById("shareMsg").style.display = "block";
    //         shareButton.style.display = "block";
    //     }
    // } else {
    //     console.log("Invalid details");
    // }

    localStorage.setItem("name", nameInp);
    localStorage.setItem("email", emailInp);
    localStorage.setItem("side", sideInp);
    localStorage.setItem("lightsaber", lightsaberInp);
}

const shareButton = document.getElementById("shareButton");
shareButton.addEventListener("click", share)

//Function for sharing the web app
//Check if supported again (second check just in case)
//If supported, use the API, else, log an error
function share() {
    if (navigator.share) {
        navigator.share({
            title: "Starpedia",
            text: "Check out Starpedia!",
            url: "https://starpedia-pwa.web.app/index.html"
        }).catch((error) => console.log("Error sharing", error));
    }
}