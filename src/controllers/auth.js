const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

exports.signup = [
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
