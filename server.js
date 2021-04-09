//dependencies
const express = require("express");
// const logger = require("morgan");
const mongoose = require("mongoose");
//port
const PORT = process.env.PORT || 3000;
const app = express();

const Workout = require("./models/workout");


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//middleware morgan dependency

// app.use(logger("dev"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
//routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));


//start server from activity 11
app.listen(PORT, () => {
    // console.log('\x1b[36m%s\x1b[0m', `App running on http://localhost:${PORT}`);
    console.log(`app running on port ${PORT}`);
});
