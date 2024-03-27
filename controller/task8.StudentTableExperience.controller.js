const connection = require("../config/database");
require('dotenv').config();


var NO_OF_RECORDS_PER_PAGE = Number(process.env.NO_OF_RECORDS_PER_PAGE);
var CURRENT_PAGE = Number(process.env.CURRENT_PAGE);
var field_value = "s_id";
var count;

connection.query("select count(*) as count from student_master", function (err, result) {
    if (err) throw err;
    count = result[0].count;
});


exports.getAllStudentsHandler = (req, res) => {

    CURRENT_PAGE = Number(req.query.page_no) || 1;


    var pageEnd = Math.ceil(count / NO_OF_RECORDS_PER_PAGE);

    if (Number(req.query.page_no) > pageEnd) {
        CURRENT_PAGE = pageEnd;
    }
    else if(Number(req.query.page_no) < 1){
        CURRENT_PAGE = 1;
    }

    console.log(field_value);
    let offset_value = (CURRENT_PAGE * NO_OF_RECORDS_PER_PAGE) - NO_OF_RECORDS_PER_PAGE;
    connection.query(`select * from student_master order by ${field_value} limit ? offset ?`, [NO_OF_RECORDS_PER_PAGE, offset_value], function (err, result) {
        if (err) throw err;
        res.render("pages/task8.StudentTableExperiment.ejs", {
            data: result,
            current_page: CURRENT_PAGE,
            pageEnd: pageEnd
        });
    });
}

exports.getAllStudentsBasedOnOrderHandler = (req, res) => {

    CURRENT_PAGE = 1;

    field_value = req.query.field_val || 's_id';
    console.log(field_value);

    res.redirect("/app/v1/getAllStudents");
}

exports.listAllStudentsHandler = (req, res) => {
    
    connection.query(`select * from student_master`, function (err, result) {
        if (err) throw err;
        res.render("pages/task8.StudentTableExperiment.ejs", {
            data: result
        });
    });
}

