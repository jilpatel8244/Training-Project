const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../../middleware/auth.middleware');


const {getAllStudentsHandler, getAllStudentsBasedOnOrderHandler, listAllStudentsHandler} = require('../../controller/task8.StudentTableExperience.controller');

router.get("/getAllStudents", authenticateUser, getAllStudentsHandler);

router.get("/getAllStudentsBasedOnOrder", authenticateUser, getAllStudentsBasedOnOrderHandler);

router.get("/justList", authenticateUser, listAllStudentsHandler);


module.exports = router;