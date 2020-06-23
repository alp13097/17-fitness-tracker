let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

let workoutSeed = [
    {
        day: new Date().setDate(newDate().getDate()-3),
        exercises: [
            {
                type: "resistance",
                name: "Weighted Pull Ups",
                duration: 20,
                weight: 25,
                reps: 8,
                sets: 4
            },
            {
                type: "resistance",
                name: "Deadlift",
                duration: 20,
                weight: 225,
                reps: 6,
                sets: 4
            },
            {
                type: "resistance",
                name: "Bent Over Barbell Rows",
                duration: 20,
                weight: 135,
                reps: 8,
                sets: 4
            },
            {
                type: "resistance",
                name: "Shrugs",
                duration: 20,
                weight: 185,
                reps: 15,
                sets: 4
            },
            {
                type: "resistance",
                name: "Ez Bar Curls",
                duration: 20,
                weight: 60,
                reps: 8,
                sets: 4
            },
            {
                type: "resistance",
                name: "Hammer Curls",
                duration: 20,
                weight: 20,
                reps: 10,
                sets: 4
            }
        ]
    },
    {
        day: new Date().setDate(new Date().getDate()-2),
        exercises: [
            {
                type: "resistance",
                name: "Squats",
                duration: 20,
                weight: 225,
                reps: 8,
                sets: 4
            },
            {
                type: "resistance",
                name: "Romanian Deadlift",
                duration: 20,
                weight: 135,
                reps: 10,
                sets: 4
            },
            {
                type: "resistance",
                name: "Lunges",
                duration: 20,
                weight: 95,
                reps: 20,
                sets: 4
            },
            {
                type: "resistance",
                name: "Hip Thrusters",
                duration: 20,
                weight: 185,
                reps: 8,
                sets: 4
            },
            {
                type: "resistance",
                name: "Calf Raises",
                duration: 20,
                weight: 135,
                reps: 15,
                sets: 4
            }
        ]
    },
    {
        day: new Date().setDate(new Date().getDate()-1),
        exercises: [
            {
                type: "resistance",
                name: "Incline Bench Press",
                duration: 20,
                weight: 135,
                reps: 8,
                sets: 4
            },
            {
                type: "resistance",
                name: "Flat Bench Press",
                duration: 20,
                weight: 135,
                reps: 8,
                sets: 4
            },
            {
                type: "resistance",
                name: "Military Press",
                duration: 20,
                weight: 95,
                reps: 8,
                sets: 4
            },
            {
                type: "resistance",
                name: "Skull Crushers",
                duration: 20,
                weight: 50,
                reps: 10,
                sets: 4
            },
            {
                type: "resistance",
                name: "Tricep Kickbacks",
                duration: 20,
                weight: 20,
                reps: 10,
                sets: 4
            }
        ]
    }
];

db.Workout.deleteMany({})
    .then(() => db.Workout.collection.insertMany(workoutSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });