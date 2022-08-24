const express = require("express");
const router = express.Router();

const contestsHandler = require("./handler/contests");
const verifyToken = require('../middlewares/verifyToken');

router.get("/", verifyToken, contestsHandler.getContests);

module.exports = router;
