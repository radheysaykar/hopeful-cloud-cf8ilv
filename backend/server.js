const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected to database");
});

db.on("error", (err) => {
  console.error("Database connection error:", err);
});

const exercisesRouter = require("./routes/exercises");
const exercisetypesRouter = require("./routes/exercisetypes");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/exercisetypes", exercisetypesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
