const jwt = require("jsonwebtoken");

const Task = require("./taskModel");
const { taskValidation, deleteTaskValidation } = require("./taskValidation");

const getTasks = (req, res) => {
  const token = req.header("Authorization").slice(7);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ error: "Invalid token" });
    }

    Task.find({ owner: payload.sub }, (err, tasks) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal error" });
      }

      return res.status(200).json(tasks);
    });
  });
};

const addTask = async (req, res) => {
  try {
    // Data validation
    const { error } = taskValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const payload = jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET);

    // Save task to database
    const task = new Task({
      owner: payload.sub,
      title: req.body.title,
      category: req.body.category,
    });

    if (req.body.body) task.body = req.body.body;

    task.save((err, task) => {
      if (err) return res.status(500).json({ error: "Internal error" });

      return res.status(201).json(task);
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid token" });
  }
};

const deleteTask = (req, res) => {
  // Data validation
  const { error } = deleteTaskValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  jwt.verify(
    req.body.token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, payload) => {
      if (err) {
        console.error(err);
        return res.status(401).json({ error: "Invalid token" });
      }
      Task.findOneAndDelete(
        { $and: [{ owner: payload.sub }, { _id: req.body.id }] },
        (err, doc) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal error" });
          }

          if (!doc) {
            return res.status(404).json("Task not found");
          }
          return res.status(200).json("Task deleted");
        }
      );
    }
  );
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
};
