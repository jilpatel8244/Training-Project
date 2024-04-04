const connection = require("../config/database");
const CustomError = require("../helper/CustomError");
const { getAllStudentsCount } = require("../helper/getAllStudentsCount");
const { studentList, getAllStudentsBasedOnOrderBy } = require("../services/task8.StudentTableExperiment.services");
require('dotenv').config();
let NO_OF_RECORDS_PER_PAGE = Number(process.env.NO_OF_RECORDS_PER_PAGE);
let CURRENT_PAGE = Number(process.env.CURRENT_PAGE);
let field_value = "s_id";
let count;

async function fillCount(){
    try {
      count = await getAllStudentsCount('student_master');
    } catch (error) {
      console.log(error.message);
    }
}
fillCount();


exports.getAllStudentsHandler = async (req, res, next) => {
    try {
        CURRENT_PAGE = Number(req.query.page_no) || 1;
        let pageEnd = Math.ceil(count / NO_OF_RECORDS_PER_PAGE);

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

