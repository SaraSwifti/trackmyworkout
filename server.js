//dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
//port
const PORT = process.env.PORT || 3000;

const Workout = require("./models/workout");


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//middleware morgan dependency
const app = express();
app.use(logger("dev"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
//routes
// app.use(require("./routes/api.js"));
// app.use(require("./routes/html.js"));
//adding routes to server.js example from actiity 11
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.post("/api/workouts", (req, res) => {
    Workout.create({}).then(function (allWorkouts) {
        res.json(allWorkouts);
    })
        .catch(err => {
            res.json(err);
        });
});

app.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        },
    ]).then(function (allWorkouts) {
        res.json(allWorkouts);
    })
     .catch(err => {
            res.json(err);
        });
});
app.get("/api/workouts/range", (req, res) => {
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

app.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true, runValidators: true }
    ).then(function (allWorkouts) {
        res.json(allWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});

//start server from activity 11
app.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m', `App running on http://localhost:${PORT}`);
});
