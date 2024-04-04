const connection = require('../config/database');
const CustomError = require('../helper/CustomError');
const { getAllStudentsCount } = require('../helper/getAllStudentsCount');
require('dotenv').config();
let NO_OF_RECORDS_PER_PAGE = Number(process.env.NO_OF_RECORDS_PER_PAGE);
let CURRENT_PAGE = Number(process.env.CURRENT_PAGE);
let count;

async function fillCount() {
	try {
		count = await getAllStudentsCount('student_master_for_task9_attendance_report');
	} catch (error) {
		console.log(error.message);
	}
}
fillCount();


exports.getResultHandler = (req, res, next) => {
	try {

		CURRENT_PAGE = Number(req.query.page_no) || 1;
		let pageEnd = Math.ceil(count / NO_OF_RECORDS_PER_PAGE);
		
		// used when someone manipulate page number from query directly
		if (Number(req.query.page_no) > pageEnd) {
			CURRENT_PAGE = pageEnd;
		}
		else if (Number(req.query.page_no) < 1) {
			CURRENT_PAGE = 1;
		}
		
		let offset_value = (CURRENT_PAGE * NO_OF_RECORDS_PER_PAGE) - NO_OF_RECORDS_PER_PAGE;
		
		let day = Number(req.query.day) || 31;
		let month = Number(req.query.month) || 12;
		let year = Number(req.query.year) || 2023;


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
	} catch (error) {
		const err = new CustomError("error while getting attendance report : " + error.message, 500);
		next(err);
	}
}