const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
