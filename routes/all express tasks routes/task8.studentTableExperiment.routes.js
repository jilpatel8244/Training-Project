const express = require('express');
const router = express.Router();

const {getAllStudentsHandler, getAllStudentsBasedOnOrderHandler, listAllStudentsHandler} = require('../../controller/task8.StudentTableExperience.controller');

router.get("/getAllStudents", getAllStudentsHandler);

router.get("/getAllStudentsBasedOnOrder", getAllStudentsBasedOnOrderHandler);

router.get("/justList", listAllStudentsHandler);


module.exports = router;