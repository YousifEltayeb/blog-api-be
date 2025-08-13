const { Router } = require("express");

const auth = Router();
const authController = require("../controllers/auth");

auth.post("/login", authController.login);
auth.post("/login/guest", authController.guestLogin);
auth.post("/signup", authController.signup);

module.exports = auth;
