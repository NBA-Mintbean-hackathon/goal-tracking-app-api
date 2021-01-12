const express = require("express");

const router = express.Router();

const { addTask, deleteTask, getTasks } = require("./taskControllers");

// Get tasks
router.get("/", getTasks);

// Add task
router.post("/", addTask);

// Delete a task
router.delete("/", deleteTask);

module.exports = router;
