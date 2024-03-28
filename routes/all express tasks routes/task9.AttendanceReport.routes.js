const express = require('express');
const router = express.Router();
const {getResultHandler} = require('../../controller/task9.AttendanceReport.controller');

router.get("/getReport", getResultHandler);

    
module.exports = router;