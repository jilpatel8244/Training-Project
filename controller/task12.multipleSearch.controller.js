const connection = require('../config/database');
const CustomError = require('../helper/CustomError');
require('dotenv').config();
var NO_OF_RECORDS_PER_PAGE = Number(process.env.NO_OF_RECORDS_PER_PAGE);
var CURRENT_PAGE = Number(process.env.CURRENT_PAGE);
var count;
let sql;

function gridHandler(req, res, next) {
    try {
        
        // check sql query exist in req.query...if not means its a fresh request or first time request... 
        if (req.query.sql) {
            sql = req.query.sql;
            sql = sql.replace(/%20/g, ' ');
            sql = sql.replace(/%27/g, "'");
            sql = sql.replace(/%3E/g, '>');
            sql = sql.replace(/%3C/g, '<');
        } else if (req.body.id && req.body.id != '') {
            sql = `select * from student_master_for_task9_attendance_report where s_id in (${req.body.id})`;
        } else if (req.body.first_name, req.body.last_name, req.body.city, req.body.country, req.body.dob, req.body.gender, req.body.current_cgpa, req.body.operator) {
            let { first_name, last_name, city, country, dob, gender, current_cgpa, operator } = req.body;
            if (current_cgpa == '') {
                current_cgpa = '0,10'
            }
            sql = `select * from student_master_for_task9_attendance_report where first_name like '${first_name}%' ${operator} last_name like '${last_name}%' ${operator} city like '${city}%' ${operator} country like '${country}%' ${operator} dob like '${dob}%' ${operator} gender in (${gender}) ${operator} current_cgpa between '${current_cgpa.split(",")[0]}' and '${current_cgpa.split(",")[1]}'`;
        } else {
            sql = `select * from student_master_for_task9_attendance_report`;
        }
        
        connection.query(sql, function (err, result) {
            try {
                if (err) {
                    throw err;
                }
                else {
                    count = result.length;
        
                    CURRENT_PAGE = Number(req.query.page_no) || 1;
                    var pageEnd = Math.ceil(Number(count) / NO_OF_RECORDS_PER_PAGE);

                    // used when someone manipulate page number from query directly
                    if (Number(req.query.page_no) > pageEnd) {
                        CURRENT_PAGE = pageEnd;
                    }
                    else if(Number(req.query.page_no) < 1){
                        CURRENT_PAGE = 1;
                    }
                    
                    let offset_value = (CURRENT_PAGE * NO_OF_RECORDS_PER_PAGE) - NO_OF_RECORDS_PER_PAGE;
        
                    connection.query(`${sql} limit ? offset ?`, [NO_OF_RECORDS_PER_PAGE, offset_value], function (err, result) {
                        try {
                            if (err) {
                                console.log(err);
                                throw err;
                            }
                            else {
                                res.render("pages/task12.multipleSearch.ejs", {
                                    data: result,
                                    current_page: CURRENT_PAGE,
                                    pageEnd: pageEnd,
                                    body: req.body,
                                    sql: sql
                                });
                            }
                        } catch (error) {
                            const err = new CustomError(error.message, 500);
                            next(err);
                        }
                    });
                }
            } catch (error) {
                const err = new CustomError(error.message, 500);
                next(err);
            }
        })
    } catch (error) {
        const err = new CustomError("something went wrong in multiple-search : " + error.message, 500);
        next(err);
    }
}

module.exports = gridHandler;