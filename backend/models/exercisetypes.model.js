const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exercisedetailsSchema = new Schema(
  {
    exercisename: {
      type: String,
      required: true,
    },
    calper15: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExerciseDetails = mongoose.model(
  "ExerciseDetails",
  exercisedetailsSchema
);

module.exports = ExerciseDetails;
