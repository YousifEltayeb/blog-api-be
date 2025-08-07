const passport = require("passport");
const prisma = require("../config/prismaClient");
const {
  validationResult,
  validateCreatePost,
  validateUpdatePost,
} = require("../config/validation");

// TODO: add pagination, sorting, filtering
exports.getPosts = [
  // if user is logged in, fetch all posts, otherwise fetch only published posts
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
        if (user) {
          try {
            const posts = await prisma.post.findMany();
            return res.json(posts);
          } catch (error) {
            res.status(404).json({ error });
          }
        }
        return next();
      },
    )(req, res, next);
  },
  async (req, res) => {
    // if not logged in should return only published posts
    try {
      const posts = await prisma.post.findMany({ where: { published: true } });
      res.json(posts);
    } catch (error) {
      res.status(404).json({ error });
    }
  },
];

exports.getSinglePost = [
  // if logged in return post without checking if published or not
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
        if (user) {
          try {
            const { postId } = req.params;
            const post = await prisma.post.findUnique({
              where: { id: Number(postId) },
              include: { comments: true },
            });
            return res.json(post);
          } catch (error) {
            res.status(404).json(error);
          }
        }
        return next();
      },
    )(req, res, next);
  },
  async (req, res) => {
    // if not logged check first if post published or not
    try {
      const { postId } = req.params;
      const post = await prisma.post.findUnique({
        where: { id: Number(postId) },
        include: { comments: true },
      });
      if (post.published) {
        res.json(post);
      } else {
        res
          .status(401)
          .json({ error: "You're unauthorized to access this post" });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
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
      const { postId } = req.params;
      const { title, content } = req.body;
      let { status } = req.body;

      // because prisma uses doesn't accept strings (typescript)
      status === "true" ? (status = true) : (status = false);

      // all fields are optional, but at leaset one must be provided
      if (!title && !content && status === undefined) {
        return res
          .status(400)
          .json({ error: "you must provide at least one field to update" });
      }

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

exports.deletePost = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { postId } = req.params;
      await prisma.post.delete({
        where: { id: Number(postId) },
      });
      res.status(200).json({ sucess: "deleted successfuly" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
];
