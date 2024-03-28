const express = require('express');
const gridHandler = require('../../controller/task12.multipleSearch.controller');
const router = express.Router();
const {authenticateUser} = require('../../middleware/auth.middleware');

router.get("/getStudentInfo", authenticateUser, gridHandler);

router.post("/getStudentInfo", authenticateUser, gridHandler);

module.exports = router;