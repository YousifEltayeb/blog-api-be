const { Router } = require("express");

const auth = Router();
const authController = require("../controllers/auth");

auth.post("/login", authController.login);

module.exports = auth;
