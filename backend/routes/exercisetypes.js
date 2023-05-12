const router = require("express").Router();
let Exercise = require("../models/exercisetypes.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:exercisename", async (req, res) => {
  try {
    const exercises = await Exercise.find({
      exercisename: req.params.exercisename,
    });
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
