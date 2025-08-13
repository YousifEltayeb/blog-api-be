const { Router } = require("express");

const auth = Router();
const authController = require("../controllers/auth");

auth.post("/login", authController.login);
auth.post("/signup", authController.signup);

module.exports = auth;
