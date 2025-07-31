const passport = require("passport");

exports.createPost = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json({ data: req.user });
  },
];
