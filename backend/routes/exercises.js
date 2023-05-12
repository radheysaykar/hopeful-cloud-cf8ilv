const router = require("express").Router();
let Exercise = require("../models/exercise.model");
let ExerciseTypes = require("../models/exercisetypes.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/add").post((req, res) => {
//   const username = req.body.username;
//   const exercisename = req.body.exercisename;
//   const duration = Number(req.body.duration);
//   let execisetype = Exercise.findOne({
//     exercisename: req.body.exercisename,
//   });
//   const calories = (execisetype.duration * duration) / 15;
//   const done = false;
//   const newExercise = new Exercise({
//     username,
//     exercisename,
//     duration,
//     calories,
//     done,
//   });
//   newExercise
//     .save()
//     .then(() => res.json("exercise added"))
//     .catch((err) => res.status(400).json("Eror: " + username));
// });
router.post("/add", async (req, res) => {
  try {
    const username = req.body.username;
    const exercisename = req.body.exercisename;
    const duration = Number(req.body.duration);
    let execisetype = await ExerciseTypes.findOne({
      exercisename: req.body.exercisename,
    });
    const calories = (execisetype.calper15 * duration) / 15;
    const done = false;
    const newExercise = new Exercise({
      username,
      exercisename,
      duration,
      calories,
      done,
    });
    const savedData = await newExercise.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json("Eror: " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:username", async (req, res) => {
  try {
    const exercises = await Exercise.find({ username: req.params.username });
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("exercise deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.post("/update/:id", async (req, res) => {
  try {
    exercise = await Exercise.findById(req.params.id);
    exercise.username = req.body.username;
    exercise.exercisename = req.body.exercisename;
    exercise.duration = Number(req.body.duration);
    let execisetype = await ExerciseTypes.findOne({
      exercisename: req.body.exercisename,
    });
    exercise.calories = (execisetype.calper15 * exercise.duration) / 15;
    exercise.done = false;
    const savedData = await exercise.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json("Eror: " + err);
  }
});

// router.route("/update/:id").post((req, res) => {
//   Exercise.findById(req.params.id)
//     .then((exercise) => {
//       exercise.username = req.body.username;
//       exercise.exercisename = req.body.exercisename;
//       exercise.duration = Number(req.body.duration);
//       const exercisetype = ExerciseTypes.findOne({
//         exercisename: exercise.exercisename,
//       });
//       exercise.calories = (exercise.duration / 15) * exercisetype.calper15;
//       exercise.done = false;

//       exercise
//         .save()
//         .then(() => res.json("exercise updated"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;
