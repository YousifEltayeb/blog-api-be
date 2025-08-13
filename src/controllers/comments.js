const passport = require("passport");
const prisma = require("../config/prismaClient");
const { validateComment, validationResult } = require("../config/validation");

// TODO: add pagination, sorting, filtering
exports.getComments = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const comments = await prisma.comment.findMany({
        where: {
          post: {
            is: {
              authorId: req.user.id,
            },
          },
        },
      });
      res.status(200).json({
        comments,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
];

exports.createComment = [
  validateComment,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }

    try {
      const { postId } = req.params;
      const { name, content } = req.body;
      await prisma.comment.create({
        data: { postId: Number(postId), name, content },
      });
      res.status(201).json({ Sucess: "Comment created" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
];

exports.deleteComment = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const commentId = parseInt(req.params.commentId);
    if (!commentId) return res.status(400).json({ message: "Invalid params" });
    const result = await prisma.comment.findUnique({
      where: { id: commentId },
      select: {
        post: { select: { authorId: true } },
      },
    });
    if (!result) return res.status(404).json({ message: "comment not found" });
    if (result.post.authorId === req.user.id) return next();
    res.status(401).json({ message: "Unauthorized to delete this comment" });
  },
  async (req, res) => {
    try {
      const commentId = parseInt(req.params.commentId);
      await prisma.comment.delete({
        where: {
          id: Number(commentId),
        },
      });
      res.status(200).json({
        message: "deleted comment successfuly",
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
];
