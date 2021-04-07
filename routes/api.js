const mongoose = require("mongoose");
const { Workout } = require("../models/index");
const router = require("express").Router();

//get workouts
//changed frsom router.get("/api/workouts", (req, res) => {
router.get("/api/workouts", (req, res) => {
    Workout.find({}).then(dbWorkout => {
        console.log(dbWorkout);
        dbWorkout.forEach(workout => {
            let total = 0;
            workout.excercise.forEAch(e => {
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout);
    }).catch(err);
});

//add an excercise
router.put("/api/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $inc: { totalDuration: req.body.duration },
        $push: { excercises: req.body }
        },
    { new: true }).then(dbWorkout => {
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
    
});

//create workout

router.post("/api/workouts", ({body}, res) => {

    // console.log("added workout");
    // console.log(body);

    Workout.create(body).then((dbWorkout => {
        res.json(dbWorkout);
    })).catch(err => {
        res.json(err);
});
});

//create api route for async getWorkoutsInRange() {
    // const res = await fetch(`/api/workouts/range`);
    // const json = await res.json();

    // return json;
//I need to change the function inthe innerds/aggrigate this to work
    router.get("/api/workouts/range", (req,res) => {
        Workout.find{()}.then(dbWorkout => {
            console.log(dbWorkout);
            dbWorkout.forEach(workout => {
                let total = 0;
                workout.excercise.forEAch(e => {
                    total += e.duration;
                });
                workout.totalDuration = total;
            });
            res.json(dbWorkout);
        }).catch(err);
    })

module.exports = router;