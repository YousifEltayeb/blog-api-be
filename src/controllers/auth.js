const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

exports.login = [
  function (req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      // only allow the user to login if he doesn't have a valid token
      if (user === false) {
        return next();
      } else {
        console.log("already signed in");
        res.redirect("/api/v1/posts");
      }
    })(req, res, next);
  },
  passport.authenticate("local", { session: false }),
  (req, res) => {
    jwt.sign(
      { user: { id: req.user.id, name: req.user.name, email: req.user.email } },
      process.env.SECRET,
      { expiresIn: "30m" },

      function (err, token) {
        if (err) return res.status(500).json({ err: "unable to create token" });
        res.json({ token: token });
      },
    );
  },
];
