const connection = require('../config/database');
const CustomError = require('../helper/CustomError');
const { getAllStudentsCount } = require('../helper/getAllStudentsCount');
require('dotenv').config();
let NO_OF_RECORDS_PER_PAGE = Number(process.env.NO_OF_RECORDS_PER_PAGE);
let CURRENT_PAGE = Number(process.env.CURRENT_PAGE);
let count;

async function fillCount(){
  try {
    count = await getAllStudentsCount('student_master_for_task9_attendance_report');
  } catch (error) {
    console.log(error.message);
  }
}
fillCount();

exports.getResult = async (req, res, next) => {
  try {
    CURRENT_PAGE = Number(req.query.page_no) || 1;
    let pageEnd = Math.ceil(count / NO_OF_RECORDS_PER_PAGE);
    let offset_value = (CURRENT_PAGE * NO_OF_RECORDS_PER_PAGE) - NO_OF_RECORDS_PER_PAGE;

    let sql = `select s.s_id, s.first_name, s.last_name, 
                    sum(case when e.type_id = 1 then e.practical_obtain_marks else 0 end) as prelim_practical_marks, 
                    sum(case when e.type_id = 1 then e.theory_obtain_marks else 0 end) as prelim_theory_marks, 
                    sum(case when e.type_id = 2 then e.practical_obtain_marks else 0 end) as terminal_practical_marks, 
                    sum(case when e.type_id = 2 then  e.theory_obtain_marks else 0 end) as terminal_theory_marks,
                    sum(case when e.type_id = 3 then e.practical_obtain_marks else 0 end) as final_practical_marks, 
                    sum(case when e.type_id = 3 then  e.theory_obtain_marks else 0 end) as final_theory_marks
                    from exam_result as e, student_master_for_task9_attendance_report as s where s.s_id = e.s_id group by s_id limit ? offset ?;`

    connection.query(sql, [NO_OF_RECORDS_PER_PAGE, offset_value], function (err, result) {
      if (err) throw err;

      res.render("pages/task10.ExamResult.ejs", {
        data: result,
        current_page: CURRENT_PAGE,
        pageEnd: pageEnd
      })
    });
  } catch (error) {
    const err = new CustomError("error while getting all students exam result : " + error.message, 500);
    next(err);
  }
}

exports.getMoreInfo = (req, res, next) => {
  try {
    let s_id = req.query.s_id;

    let sql = `select subjects.sub_id, subjects.name, s.first_name, s.last_name, 
            max(case when e.type_id = 1 then e.practical_total_marks else 0 end) as prelim_practical_total_marks, 
            sum(case when e.type_id = 1 then e.practical_obtain_marks else 0 end) as prelim_practical_marks, 
            max(case when e.type_id = 1 then e.theory_total_marks else 0 end) as prelim_theory_total_marks, 
            sum(case when e.type_id = 1 then e.theory_obtain_marks else 0 end) as prelim_theory_marks, 
            
            max(case when e.type_id = 2 then e.practical_total_marks else 0 end) as terminal_practical_total_marks,  
            sum(case when e.type_id = 2 then e.practical_obtain_marks else 0 end) as terminal_practical_marks, 
            max(case when e.type_id = 2 then e.theory_total_marks else 0 end) as terminal_theory_total_marks, 
            sum(case when e.type_id = 2 then  e.theory_obtain_marks else 0 end) as terminal_theory_marks,
            
            max(case when e.type_id = 3 then e.practical_total_marks else 0 end) as final_practical_total_marks, 
            sum(case when e.type_id = 3 then e.practical_obtain_marks else 0 end) as final_practical_marks, 
            max(case when e.type_id = 3 then e.theory_total_marks else 0 end) as final_theory_total_marks, 
            sum(case when e.type_id = 3 then  e.theory_obtain_marks else 0 end) as final_theory_marks
            
            from exam_result as e, student_master_for_task9_attendance_report as s, subjects where s.s_id = e.s_id && e.sub_id = subjects.sub_id && s.s_id = ${s_id} group by subjects.sub_id;`;

    connection.query(sql, function (err, result) {
      if (err) throw err;

      res.render("pages/task10.MoreDetails.ejs", {
        data: result,
      })
    })
  } catch (error) {
    const err = new CustomError("error while getting more exam info of specific student  : " + error.message, 500);
    next(err);
  }
}