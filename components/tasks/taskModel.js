const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  body: String,
  category: {
    type: String,
    enum: ["career", "health", "personal", "social"],
  },
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    default: "todo",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
