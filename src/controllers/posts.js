const passport = require("passport");
const prisma = require("../config/prismaClient");
const {
  validationResult,
  validateCreatePost,
  validateUpdatePost,
} = require("../config/validation");

exports.getPosts = [
  function (req, res, next) {
    passport.authenticate(
      "jwt",
      { session: false },
      async (err, user, info) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Authentication error", error: err.message });
        }
        // if user logged in
        if (user) {
          const posts = await prisma.post.findMany();
          return res.json({ posts });
        }
        return next();
      },
    )(req, res, next);
  },
  async (req, res) => {
    // if not logged in should return only published posts
    const posts = await prisma.post.findMany({ where: { published: true } });
    res.json({ posts });
  },
];
exports.createPost = [
  passport.authenticate("jwt", { session: false }),
  validateCreatePost,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    try {
      const { title, content } = req.body;
      await prisma.post.create({ data: { title, content } });
      res.status(201).json({ Success: "post created" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
];

exports.updatePost = [
  passport.authenticate("jwt", { session: false }),
  validateUpdatePost,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }
    try {
      const { postId, title, content } = req.body;
      let { status } = req.body;

      // because prisma uses typescript
      status === "true" ? (status = true) : (status = false);

      if (!title && !content && !status) {
        return res
          .status(400)
          .json({ error: "you must provide at least one field to update" });
      }

      // if valuse is undefined prisma will ignore it
      await prisma.post.update({
        where: { id: Number(postId) },
        data: { title, content, published: status },
      });
      res.status(201).json({ Success: "post updated" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
];
