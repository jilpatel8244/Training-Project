const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../../middleware/auth.middleware');
const {getResultHandler} = require('../../controller/task9.AttendanceReport.controller');

router.get("/getReport", authenticateUser, getResultHandler);

    
module.exports = router;