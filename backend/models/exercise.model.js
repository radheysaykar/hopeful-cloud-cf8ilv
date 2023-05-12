const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    exercisename: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
