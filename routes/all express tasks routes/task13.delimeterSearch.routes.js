const express = require('express');
const gridHandler = require('../../controller/task13.delimeterSearch.controller');
const {authenticateUser} = require('../../middleware/auth.middleware');
const router = express.Router();

router.get("/getStudentInfoUsingDelimeter", authenticateUser, gridHandler);

router.post("/getStudentInfoUsingDelimeter", authenticateUser, gridHandler);

module.exports = router;