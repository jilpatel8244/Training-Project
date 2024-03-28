const express = require('express');
const router = express.Router();
const {getResult, getMoreInfo} = require('../../controller/task10.ExamResult.controller');

router.get("/getExamResult", getResult);

router.get("/getMoreInfoOfResult", getMoreInfo);

module.exports = router;