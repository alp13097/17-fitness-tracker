fetch("/api/workouts/range")
    .then(response => {
        return response.json();
    })
    .then(data => {
        populateChart(data);
    });

API.getWorkoutsInRange()

    function generatePallette() {
        const arr = [
            "#E27D60",
            "#85DCB",
            "#E8A87C",
            "#C38D9E",
            "#41B3A3",
            "#0B0C10",
            "#1F2833",
            "#C5C6C7",
            "#66FCF1",
            "#45A29E"
        ]
        return arr;
    }
function populateChart(data) {
    let durations = duration(data);
    let pounds = calculateTotalWeight(data);
    let workouts = workoutNames(data);
    const colors = generatePallette();
    let line = document.querySelector("#canvas").getContext("2d");
    let bar = document.querySelector("#canvas2").getContext("2d");
    let lineChart = new Chart(line, {
        type: "line",
        data: {
            labels: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            datasets: [
                {
                    label: "Workout Duration in Minutes",
                    backgroundColor: "black",
                    borderColor: "black",
                    data: durations,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true
            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true
                        }
                    }
                ]
            }
        }
    });
    
    let barChart = new Chart(bar, {
        type: "bar",
        data: {
            labels: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            datasets: [
                {
                    label: "Pounds",
                    data: pounds,
                    backgroundColor: "red",
                    borderColor: "red",
                    borderWidth: 1
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Total Pounds Lifted"
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    });
}

function duration(data) {
    let durations = [];

    data.forEach(workout => {
        workout.exercises.forEach(exercise => {
            durations.push(exercise.duration);
        });
    });
    return durations;
}

function calculateTotalWeight(data) {
    let total = [];

    data.forEach(workout => {
        workout.exercises.forEach(exercises => {
            total.push(exercise.weight);
        });
    });
    return total;
}