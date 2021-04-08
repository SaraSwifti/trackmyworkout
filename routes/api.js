const mongoose = require("mongoose");
const { Workout } = require("../models/index");
const router = require("express").Router();

//get workouts

router.get("/api/workouts", (req, res) => {
    Workout.find({}).then(dbWorkout => {
        // console.log(dbWorkout);
        dbWorkout.forEach(workout => {
            let total = 0;
            workout.excercise.forEAch(e => {
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
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

router.post("/api/workouts", ({ body }, res) => {

    // console.log("added workout");
    // console.log(body);

    Workout.create(body).then((dbWorkout => {
        res.json(dbWorkout);
    // })).catch(err => {
    //     res.json(err);
    // });
}));
});
//create api route for async getWorkoutsInRange reference https://docs.mongodb.com/manual/reference/operator/aggregation/range/. 

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        },
    ])
        .sort({ _id: -1 })
        .limit(7)
        .then(function (allWorkouts) {
            res.json(allWorkouts);
        })
         .catch(err => {
            res.json(err);
        });
});


module.exports = router;