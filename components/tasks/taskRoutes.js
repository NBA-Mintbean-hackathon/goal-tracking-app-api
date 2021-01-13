const express = require("express");

const router = express.Router();

const {
  addTask,
  updateTask,
  deleteTask,
  getTasks,
} = require("./taskControllers");

// Get tasks
router.get("/", getTasks);

// Add a task
router.post("/", addTask);

// Update a task
router.put("/", updateTask);

// Delete a task
router.delete("/", deleteTask);

module.exports = router;
