const connection = require('../config/database');
require('dotenv').config();

var NO_OF_RECORDS_PER_PAGE = Number(process.env.NO_OF_RECORDS_PER_PAGE);
var CURRENT_PAGE = Number(process.env.CURRENT_PAGE);

exports.getResultHandler = (req, res) => {

    CURRENT_PAGE = Number(req.query.page_no) || 1;
    var pageEnd = Math.ceil(200 / NO_OF_RECORDS_PER_PAGE);
    let offset_value = (CURRENT_PAGE * NO_OF_RECORDS_PER_PAGE) - NO_OF_RECORDS_PER_PAGE;


    var day = Number(req.query.day) || 31;
    var month = Number(req.query.month) || 12;
    var year = Number(req.query.year) || 2023;


    connection.query(`select s.s_id, s.first_name, s.last_name, count(e.s_id) as count, (count(e.s_id)*100)/${day} as percentage from student_master_for_task9_attendance_report as s , attendance as e where e.s_id = s.s_id && e.is_present = 1 && e.attendance_date between "${year}-${month}-1" and "${year}-${month}-${day}" group by e.s_id order by e.s_id limit ? offset ?`, [NO_OF_RECORDS_PER_PAGE, offset_value], function (err, result) {
        if (err) throw err;
        res.render("pages/task9.AttendanceReport.ejs", {
            data: result,
            day: day,
            month: month,
            year: year,
            current_page: CURRENT_PAGE,
            pageEnd: pageEnd
        });
    });
}