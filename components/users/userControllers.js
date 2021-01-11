const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./userModel");
const { registrationValidation, loginValidation } = require("./userValidation");

const saltRounds = 10;

const register = async (req, res) => {
  try {
    // Data validation
    const { error } = registrationValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Check whether the email already exists
    const emailExists = await User.findOne({
      email: req.body.email,
    });
    if (emailExists) return res.status(400).json("Email already registered");

    // Generate a salt and hash
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) return res.status(500).end();

      // Save user to database
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      user.save((err, user) => {
        if (err) return res.status(500).end();

        // Generate a token
        const accessToken = jwt.sign(
          {
            sub: user._id,
            iat: Date.now(),
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );
        return res.status(201).json(accessToken);
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
};

const login = async (req, res) => {
  try {
    // Data validation
    const { error } = loginValidation(req.body);
    if (error) res.status(400).json(error.details[0].message);

    // Find user
    const user = await User.findOne({
      email: req.body.email,
    }).select("+password");
    if (!user) return res.status(400).json("User not found");

    // Check the password
    bcrypt.compare(req.body.password, user.password, (err, same) => {
      if (err) return res.status(500).end();

      if (!same) return res.status(400).json("Wrong password");

      // Generate a token
      const accessToken = jwt.sign(
        {
          sub: user._id,
          iat: Date.now(),
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );
      return res.status(200).json(accessToken);
    });
  } catch (err) {
    res.status(500).end();
  }
};

module.exports = { register, login };
