const express = require('express');
const gridHandler = require('../../controller/task13.delimeterSearch.controller');
const router = express.Router();

router.get("/getStudentInfoUsingDelimeter", gridHandler);

router.post("/getStudentInfoUsingDelimeter", gridHandler);

module.exports = router;