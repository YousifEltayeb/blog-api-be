const { Router } = require("express");
const comments = Router();
const commentsController = require("../controllers/comments");

comments.get("/", commentsController.getComments);
comments.post("/:postId", commentsController.createComment);
comments.delete("/:commentId", commentsController.deleteComment);
module.exports = comments;
