const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  exerciseName: {
    type: String,
    required: true,
  },
  exerciseType: {
    type: String,
    required: true,
  },
  improvement: [Number],
  time: [String],
});

const ExerciseModel = mongoose.model("exercises", ExerciseSchema);

module.exports = ExerciseModel;
