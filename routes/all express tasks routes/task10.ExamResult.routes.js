const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../../middleware/auth.middleware');
const {getResult, getMoreInfo} = require('../../controller/task10.ExamResult.controller');

router.get("/getExamResult", authenticateUser, getResult);

router.get("/getMoreInfoOfResult", authenticateUser, getMoreInfo);

module.exports = router;