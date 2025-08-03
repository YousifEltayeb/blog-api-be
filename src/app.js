const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const API_VERSION = "/api/v1";
const routes = require("./routes/index");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// passport config
require("./config/passport");

app.use(API_VERSION + "/auth", routes.auth);
app.use(API_VERSION + "/posts", routes.posts);
app.use(API_VERSION + "/comments", routes.comments);

app.all("/{*splat}", (req, res) => {
  res.status(404).json({ error: "this route doesn't exist" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message });
});

app.listen(PORT, () => console.log("Server running on port: " + PORT));
