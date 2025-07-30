const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const passport = require("passport");
const prisma = require("./config/prismaClient");
const API_VERSION = "/api/v1";
const routes = require("./routes/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(API_VERSION + "/auth", routes.auth);
app.use(API_VERSION + "/posts", routes.posts);
app.use(API_VERSION + "/comments", routes.comments);

app.all("/{*splat}", (req, res) => {
  res.status(404).render("404");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => console.log("Server running on port: " + PORT));
