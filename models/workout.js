const mongoose = require("mongoose");
const { all } = require("../routes/api")

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  excercise: [
      {
          type: {
              type: String
          },
          name: {
              type: String
          },
          duration: {
              type: Number
          },
          weight: {
              type: Number
          },
          reps: {
              type: Number
          },
          distance: {
              type: Number
          }
      }
  ]
  
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
