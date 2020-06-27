const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector("resistance-form");
const cardioName = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const submitButton = document.querySelector("button.submit");
const addButton = document.querySelector("button.add-workout");
const added = document.querySelector("#added");

let workoutType = null;
let shouldNavigateAway = false;

async function initExercise() {
    let workout;
    if (location.search.split("=")[1] === undefined) {
        workout = await API.createWorkout()
        console.log(workout)
    }
    if (workout) {
        location.search = "?id=" + workout._id;
    }
}

initExercise();

function handleWorkoutTypeChange(event) {
    workoutType = event.target.value;
    if (workout === "cardio") {
        cardioForm.classList.remove("d-none");
        resistanceForm.classList.add("d-none");
    } else if (workoutType ==="resistance") {
        resistanceForm.classList.remove("d-none");
        cardioForm.classList.add("d-none");
    } else {
        cardioForm.classList.add("d-none");
        resistanceForm.classList.add("d-none");
    }
    validateInputs()
}
 
function validateInputs() {
    let isValid = true;

    if (workoutType === "resistance") {
        if (nameInput.value.trim() === "") {
            isValid = false;
        }
        if (weightInput.value.trim() === "") {
            isValid = false;
        }
        if (setsInput.value.trim() === "") {
            isValid = false;
        }
        if (repsInput.value.trim() === "") {
            isValid = false;
        }
        if (resistanceDurationInput.value.trim() === "") {
            isValid = false;
        }
    } else if (workoutType === "cardio") {
        if (cardioName.value.trim() === "") {
            isValid = false;
        }
        if (durationInput.value.trim() === "") {
            isValid = false;
        }
        if (distanceInput.value.trim() === "") {
            isValid = false;
        }
    }
    if (isValid) {
        submitButton.removeAttribute("disabled");
        addButton.removeAttribute("disabled");
    } else {
        submitButton.setAttribute("disabled", true);
        addButton.setAttribute("disabled", true);
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();
    let workoutData = {};
    if (workoutType === "cardio") {
        workoutData.type = "cardio";
        workoutData.name = cardioName.value.trim();
        workoutData.distance = Number(distanceInput.value.trim());
        workoutData.duration = Number(durationInput.value.trim());
    } else if (workoutType === "resistance") {
        workoutData.type = "resistance";
        workoutData.name = nameInput.value.trim();
        workoutData.weight = Number(weightInput.value.trim());
        workoutData.sets = Number(setsInput.value.trim());
        workoutData.reps = Number(repsInput.value.trim());
        workoutData.duration = Number(resistanceDurationInput.value.trim());
    }
    await API.addExercise(workoutData);
    clearInputs();
    added.classList.add("success");
}

function clearInputs() {
    cardioName.value = "";
    nameInput.value = "";
    setsInput.value = "";
    distanceInput.value = "";
    durationInput.value = "";
    repsInput.value = "";
    resistanceDurationInput.value = "";
    weightInput.value = "";
}

if (workoutTypeSelect) {
    workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}
if (submitButton) {
    submitButton.addEventListener("click", function (event) {
        shouldNavigateAway = true;
        handleFormSubmit(event);
    });
}
if (addButton) {
    addButton.addEventListener("click", handleFormSubmit);
}

document
    .querySelectorAll("input")
    .forEach(element => element.addEventListener("input", validateInputs));