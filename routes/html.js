const router = require("express").Router();
const path = require("path");

//grabbing the data from indexhtml
router.get("/", (reg, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
//grabbing data from the exercise html
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

//grabbing data from the status html
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router