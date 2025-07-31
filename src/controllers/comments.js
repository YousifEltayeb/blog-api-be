const prisma = require("../config/prismaClient");
const { validateComment, validationResult } = require("../config/validation");

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
