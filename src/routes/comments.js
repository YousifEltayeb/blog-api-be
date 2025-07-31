const { Router } = require("express");
const comments = Router();
const commentsController = require("../controllers/comments");

comments.post("/:postId", commentsController.createComment);
module.exports = comments;
