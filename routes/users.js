const express = require("express");
const router = express.Router();

const usersHandler = require("./handler/users");
const verifyToken = require('../middlewares/verifyToken');

router.post("/register", usersHandler.register);
router.post("/login", usersHandler.login);
router.get("/me", verifyToken, usersHandler.getUser);

module.exports = router;
