const connection = require("../config/database");
const CustomError = require("../helper/CustomError");
const { studentList, getAllStudentsBasedOnOrderBy } = require("../services/task8.StudentTableExperiment.services");

require('dotenv').config();

var NO_OF_RECORDS_PER_PAGE = Number(process.env.NO_OF_RECORDS_PER_PAGE);
var CURRENT_PAGE = Number(process.env.CURRENT_PAGE);
var field_value = "s_id";
var count;

connection.query("select count(*) as count from student_master", function (err, result) {
    if (err) throw err;
    count = result[0].count;
});


exports.getAllStudentsHandler = async (req, res, next) => {
    try {
        CURRENT_PAGE = Number(req.query.page_no) || 1;

        var pageEnd = Math.ceil(count / NO_OF_RECORDS_PER_PAGE);

        if (Number(req.query.page_no) > pageEnd) {
            CURRENT_PAGE = pageEnd;
        }
        else if(Number(req.query.page_no) < 1){
            CURRENT_PAGE = 1;
        }

        let offset_value = (CURRENT_PAGE * NO_OF_RECORDS_PER_PAGE) - NO_OF_RECORDS_PER_PAGE;
    
        await getAllStudentsBasedOnOrderBy(req, res, field_value, NO_OF_RECORDS_PER_PAGE, offset_value, CURRENT_PAGE, pageEnd);

    } catch (error) {
        const err = new CustomError(error.message, 500);
        next(err);
    }
}

exports.getAllStudentsBasedOnOrderHandler = (req, res, next) => {
    try {
        CURRENT_PAGE = 1;

        field_value = req.query.field_val || 's_id';
        
        res.redirect("/app/v1/getAllStudents");
    } catch (error) {
        const err = new CustomError(error.message, 500);
        next(err);
    }
}

exports.listAllStudentsHandler = async (req, res, next) => {
    try {
        await studentList(req, res);
    } catch (error) {
        const err = new CustomError(error.message, 500);
        next(err);
    }
}

