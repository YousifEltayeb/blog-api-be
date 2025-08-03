const passport = require("passport");
const prisma = require("../config/prismaClient");
const { validateComment, validationResult } = require("../config/validation");
exports.getComments = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const comments = await prisma.comment.findMany();
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
  async (req, res) => {
    try {
      const { commentId } = req.params;
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
