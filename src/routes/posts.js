const { Router } = require("express");
const posts = Router();
const postsController = require("../controllers/posts");
posts.post("/", postsController.createPost);
module.exports = posts;
