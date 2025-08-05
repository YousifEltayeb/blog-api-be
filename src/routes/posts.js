const { Router } = require("express");
const posts = Router();
const postsController = require("../controllers/posts");

posts.get("/", postsController.getPosts);
posts.post("/", postsController.createPost);
posts.get("/:postId", postsController.getSinglePost);
posts.put("/:postId", postsController.updatePost);
posts.delete("/:postId", postsController.deletePost);

module.exports = posts;
