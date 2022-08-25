const express = require("express");
const router = express.Router();

const contestsHandler = require("./handler/contests");
const verifyToken = require('../middlewares/verifyToken');

router.get("/", verifyToken, contestsHandler.getContests);
router.get("/detail/:id", verifyToken, contestsHandler.getContestDetail);
router.get("/me", verifyToken, contestsHandler.myContests);
router.get("/categories", verifyToken, contestsHandler.getCategories);

module.exports = router;
