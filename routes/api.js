const mongoose = require("mongoose");
const { db } = require("../models/workout");
const router = require("express").Router();

//get workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
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
    db.Workout.findOneAndUpdate(
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

    console.log("added workout");
    console.log(body);

    db.Workout.create(body).then((dbWorkout => {
        res.json(dbWorkout);
    })).catch(err => {
        res.json(err);
});
});

module.exports = router;