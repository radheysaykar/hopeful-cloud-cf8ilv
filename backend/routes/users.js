const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:username").get((req, res) => {
  User.find({ username: req.params.username })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const calgoal = req.body.calgoal;
  const calgoal_completed = 0;
  const password = req.body.password;
  const newUser = new User({ username, calgoal_completed, calgoal, password});

  newUser
    .save()
    .then(() => res.json("user added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/:username", async (req, res) => {
  try {
    user = await User.findOne({username: req.params.username});
    user.calgoal = Number(req.body.calgoal);
    user.calgoal_completed = Number(req.body.calgoal_completed);
    user.password = String(req.body.password);
    const savedData = await user.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json("Eror: " + err);
  }
});
module.exports = router;
