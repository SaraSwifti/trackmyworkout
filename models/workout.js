const mongoose = require("mongoose");
// const { all } = require("../routes/api")

const Schema = mongoose.Schema;
//schema with validators from mini project 17
const workoutSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  excercise: [
      {
          type: {
              type: String,
              trim: true,
              required: "please enter the type of excercise"

          },
          name: {
              type: String,
              trim: true, 
              required: "please enter the name of excercise"

          },
          duration: {
              type: Number,
              required: "please enter how long this took"
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
