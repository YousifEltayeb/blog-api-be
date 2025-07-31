const { Router } = require("express");
const posts = Router();
const postsController = require("../controllers/posts");

posts.get("/", postsController.getPosts);
posts.post("/", postsController.createPost);
posts.put("/", postsController.updatePost);

module.exports = posts;
