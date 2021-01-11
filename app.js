const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const usersRoute = require("./components/users/userRoutes");
const tasksRoute = require("./components/tasks/taskRoutes");

const app = express();

// Middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

app.use("/api/users", usersRoute);
app.use("/api/tasks", tasksRoute);
app.get("/", (_req, res) => {
  console.log("test successful");
  res.status(200).json({ test: "successful" });
});

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => (err ? console.log(err) : console.log("Connected to database"))
);

module.exports = app;
