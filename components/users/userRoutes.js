const express = require("express");

const router = express.Router();

const { register, login } = require("./userControllers");

// Registration
router.post("/", register);

// Login
router.post("/login", login);

module.exports = router;
