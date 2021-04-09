const mongoose = require("mongoose");
// const { all } = require("../routes/api")

const Schema = mongoose.Schema;
//schema with validators from mini project 17
const WorkoutSchema = new Schema({
  date: {
    type: Date,
    default: () => new Date()
  },
  excercises: [
      {
          type: {
              type: String,
              //removing these validators as it seems they are prepropogated in the dropdowns. 
              trim: true,
              // required: "please enter the type of excercise"

          },
          name: {
              type: String,
              trim: true, 
              // required: "please enter the name of excercise"

          },
          duration: {
              type: Number,
            //   required: "please enter how long this took"
          },
          weight: {
              type: Number,
            //   default: 0
          },
          reps: {
              type: Number,
            //   default: 0
          },
          distance: {
              type: Number,
            //   default: 0
          },
          sets: {
            type: Number,
            // trim: true
        },
      }
  ]
  // totalDuration: {
  //     type: Number,
  //   //   default: 0
  // }
  
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
