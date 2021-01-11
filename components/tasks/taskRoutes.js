const express = require("express");

const router = express.Router();

const { addTask } = require("./taskControllers");

// Add task
router.post("/", addTask);

module.exports = router;
