const jwt = require("jsonwebtoken");

const Task = require("./taskModel");
const { taskValidation } = require("./taskValidation");

const addTask = async (req, res) => {
  try {
    // Data validation
    const { error } = taskValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const payload = jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET);

    console.log(payload);
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
};

module.exports = {
  addTask,
};
