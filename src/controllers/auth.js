const {
  validateSignup,
  validateLogin,
  validationResult,
} = require("../config/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const prisma = require("../config/prismaClient");
require("dotenv").config();

exports.signup = [
  validateSignup,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.author.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Signup successful" });
  },
];
exports.login = [
  // only allow the user to login if he doesn't have a valid token
  function (req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Authentication error", error: err.message });
      }
      if (!user) {
        return next();
      }
      res.status(200).json("Already logged in");
    })(req, res, next);
  },

  validateLogin,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    next();
  },

  passport.authenticate("local", { session: false }),
  (req, res) => {
    jwt.sign(
      { user: { id: req.user.id, name: req.user.name, email: req.user.email } },
      process.env.SECRET,
      { expiresIn: "1d" },

      function (err, token) {
        if (err) return res.status(500).json({ err: "unable to create token" });
        res.json({ token: token });
      },
    );
  },
];

exports.guestLogin = [
  (req, res, next) => {
    req.body = { email: "guest@email.com", password: "12345678" };
    next();
  },
  passport.authenticate("local", { session: false }),
  (req, res) => {
    jwt.sign(
      { user: { id: req.user.id, name: req.user.name, email: req.user.email } },
      process.env.SECRET,
      { expiresIn: "1d" },

      function (err, token) {
        if (err) return res.status(500).json({ err: "unable to create token" });
        res.json({ token: token });
      },
    );
  },
];
