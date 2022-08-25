const express = require("express");
const router = express.Router();

const submissionHandler = require("./handler/submissions");
const verifyToken = require('../middlewares/verifyToken');

router.post("/", verifyToken, submissionHandler.postSubmission);

module.exports = router;
