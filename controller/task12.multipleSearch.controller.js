const connection = require('../config/database');
require('dotenv').config();
var NO_OF_RECORDS_PER_PAGE = Number(process.env.NO_OF_RECORDS_PER_PAGE);
var CURRENT_PAGE = Number(process.env.CURRENT_PAGE);
let sql = `select * from student_master_for_task9_attendance_report`;
var count;

function gridHandler(req, res) {

    if (Object.keys(req.body).length != 0) {
        if (req.body.id) {
            sql = `select * from student_master_for_task9_attendance_report where s_id in (${req.body.id})`;
        }
        else {
            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let city = req.body.city;
            let country = req.body.country;
            let dob = req.body.dob;
            let gender = req.body.gender;
            let current_cgpa = req.body.current_cgpa;
            let operator = req.body.operator;
            sql = `select * from student_master_for_task9_attendance_report where first_name like '${first_name}%' ${operator} last_name like '${last_name}%' ${operator} city like '${city}%' ${operator} country like '${country}%' ${operator} dob like '${dob}%' ${operator} gender in (${gender}) ${operator} current_cgpa between 0 and '${current_cgpa}'`;
        }
    } else {
        sql = sql || `select * from student_master`;
    }

    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            sql = `select * from student_master_for_task9_attendance_report`;
            res.render("pages/task12.errorPage.ejs", { err: err, message: "database error", success: "false" });
        }
        else {
            count = result.length;

            CURRENT_PAGE = Number(req.query.page_no) || 1;
            var pageEnd = Math.ceil(Number(count) / NO_OF_RECORDS_PER_PAGE);
            let offset_value = (CURRENT_PAGE * NO_OF_RECORDS_PER_PAGE) - NO_OF_RECORDS_PER_PAGE;

            connection.query(`${sql} limit ? offset ?`, [NO_OF_RECORDS_PER_PAGE, offset_value], function (err, result) {
                if (err) {
                    console.log(err);
                    sql = `select * from student_master_for_task9_attendance_report`;
                    res.render("pages/task12.errorPage.ejs", { err: err, message: "database error", success: "false" });
                }
                else {
                    let found;
                    if (result.length == 0) {
                        found = 0;
                    } else {
                        found = 1;
                    }
                    res.render("pages/task12.multipleSearch.ejs", {
                        data: result,
                        current_page: CURRENT_PAGE,
                        pageEnd: pageEnd,
                        found: found,
                        body: req.body
                    });
                }
            });
        }

    })
}

module.exports = gridHandler;