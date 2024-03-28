const express = require('express');
const gridHandler = require('../../controller/task12.multipleSearch.controller');
const router = express.Router();

router.get("/getStudentInfo", gridHandler);

router.post("/getStudentInfo", gridHandler);

module.exports = router;